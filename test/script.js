document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('skill-lines');
    const treeContainer = document.querySelector('.skill-tree-container');
    const allNodes = document.querySelectorAll('.skill-tree .node');

    // --- Helper Functions (getConnectionPoints, drawLine) ---
    // (Keep these exactly the same as the previous version)
    function getConnectionPoints(element) {
        const nodeElement = element.querySelector(':scope > .node');
        if (!nodeElement) return null;

        // Check if the element or its parents are hidden by collapse
        let current = element;
        while (current && current !== treeContainer) {
            if (current.tagName === 'UL' && current.style.display === 'none') {
                 // This check isn't strictly needed if we rely on the li.collapsed check in drawConnections
                 // but provides an extra layer. More robustly, check parent LI's class.
                 const parentLi = current.parentElement;
                 if(parentLi && parentLi.classList.contains('collapsed')) {
                    return null; // Element is inside a collapsed section
                 }
            }
             // Check computed style for display: none (more robust but potentially slower)
             /*
             if (window.getComputedStyle(current).display === 'none') {
                return null;
             }
             */
            current = current.parentElement;
        }


        const rect = nodeElement.getBoundingClientRect();
        // If rect has no size, it's likely hidden or not laid out yet
        if (rect.width === 0 && rect.height === 0) {
            return null;
        }

        const containerRect = treeContainer.getBoundingClientRect();
        const x = rect.left - containerRect.left + treeContainer.scrollLeft + rect.width / 2;
        const y = rect.top - containerRect.top + treeContainer.scrollTop;

        return {
            top: { x: x, y: y },
            bottom: { x: x, y: y + rect.height }
        };
    }

    function drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        svg.appendChild(line);
    }

    // --- Core Drawing Function (Modified) ---
    function drawConnections() {
        svg.innerHTML = ''; // Clear existing lines
        const listItems = document.querySelectorAll('.skill-tree > li, .skill-tree ul > li'); // Get all LIs

        listItems.forEach(li => {
            const parentPoints = getConnectionPoints(li);
            // Don't try to draw from a node that's inside a hidden parent
             if (!parentPoints) return;

            const childUl = li.querySelector(':scope > ul');

            // Only draw lines TO children if the parent LI is NOT collapsed
            if (childUl && !li.classList.contains('collapsed')) {
                const childLis = childUl.querySelectorAll(':scope > li');
                if (childLis.length === 0) return;

                let childrenPoints = [];
                childLis.forEach(childLi => {
                    const childPoints = getConnectionPoints(childLi);
                     // Only consider children that are actually visible/have coordinates
                    if (childPoints) {
                        childrenPoints.push(childPoints);
                    }
                });

                // Proceed only if we found visible children points
                if (childrenPoints.length > 0) {
                    const horizontalLineY = parentPoints.bottom.y + 20; // Adjust based on ul padding-top / 2

                    // 1. Draw vertical line down from parent
                    drawLine(parentPoints.bottom.x, parentPoints.bottom.y, parentPoints.bottom.x, horizontalLineY);

                    // 2. Draw horizontal line connecting children forks
                    const firstChildX = childrenPoints[0].top.x;
                    const lastChildX = childrenPoints[childrenPoints.length - 1].top.x;
                    // Only draw horizontal line if there's more than one child or if it's different X
                     if (childrenPoints.length > 1 || firstChildX !== parentPoints.bottom.x) {
                         drawLine(firstChildX, horizontalLineY, lastChildX, horizontalLineY);
                     } else {
                         // If only one child directly below, just extend the vertical line slightly
                          drawLine(parentPoints.bottom.x, horizontalLineY, firstChildX, horizontalLineY); // Tiny horizontal segment
                     }


                    // 3. Draw vertical lines from horizontal line to each child
                    childrenPoints.forEach(childPoint => {
                        // Connect from the horizontal line OR directly from parent vertical if X matches
                         const startX = (childrenPoints.length > 1 || childPoint.top.x !== parentPoints.bottom.x) ? childPoint.top.x : parentPoints.bottom.x;
                         drawLine(startX, horizontalLineY, childPoint.top.x, childPoint.top.y);
                    });
                }
            }
        });

        // Adjust SVG size
        requestAnimationFrame(() => { // Use rAF to wait for layout adjustments
            const treeBounds = document.querySelector('.skill-tree').getBoundingClientRect();
            const containerScrollWidth = treeContainer.scrollWidth;
            const containerScrollHeight = treeContainer.scrollHeight;

            // Ensure SVG covers the entire scrollable area
             svg.style.width = `${containerScrollWidth}px`;
             svg.style.height = `${containerScrollHeight}px`;
        });
    }

    // --- Event Handling for Collapse/Expand ---
    function setupEventListeners() {
        allNodes.forEach(node => {
            const parentLi = node.closest('li');
            const childUl = parentLi.querySelector(':scope > ul');

            if (childUl && childUl.children.length > 0) {
                // Add class to node for styling (e.g., cursor, icon)
                node.classList.add('has-children');

                // Add click listener
                node.addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent potential parent clicks if nodes are nested weirdly
                    parentLi.classList.toggle('collapsed');
                    // Redraw lines immediately after state change
                    drawConnections();
                });
            }
        });
    }

    // --- Initial Setup ---
    setupEventListeners(); // Add click handlers and 'has-children' class
    drawConnections(); // Initial draw

    // --- Resize/Scroll Handling (Keep from previous version) ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawConnections, 150); // Debounce
    });
    treeContainer.addEventListener('scroll', () => {
         // Could potentially debounce this too if scrolling causes performance issues
         drawConnections();
    });

}); // End DOMContentLoaded