document.addEventListener('DOMContentLoaded', () => {
    const skillTree = document.querySelector('.skill-tree');
    const tooltip = document.getElementById('skill-tooltip');

    // --- Initial Setup: Collapse all nodes except the first level ---
    const allNodes = skillTree.querySelectorAll('.skill-node');
    allNodes.forEach(node => {
        // Check if it's nested (i.e., has a parentNode which is a UL, which itself has a parent LI)
        if (node.parentNode.classList.contains('children')) {
            // Only add 'collapsed' if it's expandable
            if (node.classList.contains('expandable')) {
                 node.classList.add('collapsed');
            }
        }
         // Ensure non-expandable nodes don't get the class
        if (!node.querySelector('.children')) {
            node.classList.remove('expandable'); // Clean up just in case
        }
    });

    // --- Event Listener for Clicks (Toggle Collapse/Expand) ---
    skillTree.addEventListener('click', (event) => {
        // Find the closest toggle icon or node content that was clicked
        const toggle = event.target.closest('.toggle-icon');
        const nodeContent = event.target.closest('.node-content');

        if (toggle) {
            const skillNode = toggle.closest('.skill-node');
            if (skillNode && skillNode.classList.contains('expandable')) {
                skillNode.classList.toggle('collapsed');
            }
        }
        // Optional: Allow clicking anywhere on the node content to toggle
        /* else if (nodeContent) {
             const skillNode = nodeContent.closest('.skill-node');
             if (skillNode && skillNode.classList.contains('expandable')) {
                 skillNode.classList.toggle('collapsed');
             }
         }*/
    });

    // --- Event Listeners for Hover (Show Tooltip) ---
    skillTree.addEventListener('mouseover', (event) => {
        const skillNameSpan = event.target.closest('.skill-name');
        if (skillNameSpan && skillNameSpan.dataset.details) {
            tooltip.textContent = skillNameSpan.dataset.details;
            tooltip.style.display = 'block';
        }
    });

    skillTree.addEventListener('mousemove', (event) => {
        // Move tooltip with mouse, slightly offset
        if (tooltip.style.display === 'block') {
            tooltip.style.left = `${event.pageX + 15}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        }
    });

    skillTree.addEventListener('mouseout', (event) => {
        const skillNameSpan = event.target.closest('.skill-name');
        if (skillNameSpan && skillNameSpan.dataset.details) {
            tooltip.style.display = 'none';
        }
    });

}); // End DOMContentLoaded