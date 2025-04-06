// Tree rendering constants
const NODE_WIDTH = 160;
const NODE_HEIGHT = 60;
const LEVEL_HEIGHT = 140;
const HORIZONTAL_SPACING = 40;

// Global variables
let expandedState = {};

let nodeElements = {};
let tooltip = null;

// Initialize the tree
document.addEventListener("DOMContentLoaded", function () {
  initializeTree();
  createTooltip();
  setupEventListeners();
});

function initializeTree() {
  const treeContainer = document.getElementById("skills-tree");
  treeContainer.innerHTML = "";

  // Render the tree starting from the root
  renderNode(skillsData, 0, 0, treeContainer);

  // Calculate node positions and render connectors
  positionNodes();
  renderConnectors();
}

function createNode(node) {
  const nodeElement = document.createElement("div");
  nodeElement.id = node.id;
  nodeElement.className = "node";

  const nodeContent = document.createElement("div");
  nodeContent.className = "node-content";
  nodeContent.textContent = node.label;

  // Attach click handler here
  nodeContent.addEventListener("click", (e) => {
    e.stopPropagation();
    node._expanded = !node._expanded;
    initializeTree();
  });

  nodeElement.appendChild(nodeContent);
  nodeElement.dataset.description = node.description;
  nodeElement.dataset.nodeId = node.id;

  nodeElements[node.id] = nodeElement;

  return nodeElement;
}

function renderNode(node, level, index, container) {
    const nodeElement = createNode(node);
    container.appendChild(nodeElement);

    // Initialize expanded state if not set
    if (expandedState[node.id] === undefined) {
        expandedState[node.id] = true; // Default to expanded
    }
    node._expanded = expandedState[node.id];

    const nodeContent = nodeElement.querySelector('.node-content');
    nodeContent.addEventListener('click', (e) => {
        e.stopPropagation();
        expandedState[node.id] = !expandedState[node.id];
        updateVisibility(); // Update visibility without full re-render
    });

    if (node.children) {
        node.children.forEach((child, childIndex) => {
            renderNode(child, level + 1, childIndex, container);
        });
    }
}

function positionNodes() {
  // Calculate positions for all visible nodes
  calculateNodePositions(skillsData, 0, 0);
}

function updateVisibility() {
    // First pass to set visibility based on parent's expanded state
    const updateNodeVisibility = (node, parentVisible, parentExpanded) => {
        const nodeElement = nodeElements[node.id];
        const isVisible = parentVisible && (node === skillsData || parentExpanded);
        
        nodeElement.style.display = isVisible ? 'block' : 'none';
        
        if (node.children) {
            const isExpanded = expandedState[node.id] !== false;
            node.children.forEach(child => {
                updateNodeVisibility(child, isVisible, isExpanded);
            });
        }
    };

    updateNodeVisibility(skillsData, true, true);
    
    // Recalculate positions after visibility changes
    positionNodes();
    renderConnectors();
}

function calculateNodePositions(node, level, startX) {
    const nodeElement = nodeElements[node.id];
    if (nodeElement.style.display === 'none') {
        return { width: 0, node: nodeElement };
    }

    if (!node.children || expandedState[node.id] === false) {
        nodeElement.style.top = `${level * LEVEL_HEIGHT}px`;
        nodeElement.style.left = `${startX}px`;
        return { width: NODE_WIDTH, node: nodeElement };
    }

    let totalChildrenWidth = 0;
    const childPositions = [];

    node.children.forEach(child => {
        const childResult = calculateNodePositions(child, level + 1, startX + totalChildrenWidth);
        if (childResult.width > 0) { // Only account for visible children
            totalChildrenWidth += childResult.width + HORIZONTAL_SPACING;
            childPositions.push(childResult);
        }
    });

    if (totalChildrenWidth > 0) totalChildrenWidth -= HORIZONTAL_SPACING;

    const nodeX = startX + (totalChildrenWidth - NODE_WIDTH) / 2;
    nodeElement.style.top = `${level * LEVEL_HEIGHT}px`;
    nodeElement.style.left = `${Math.max(0, nodeX)}px`;

    return {
        width: Math.max(NODE_WIDTH, totalChildrenWidth),
        node: nodeElement,
        childPositions: childPositions
    };
}
function renderConnectors() {
  // Clear existing connectors
  const existingConnectors = document.querySelectorAll(".connector");
  existingConnectors.forEach((connector) => connector.remove());

  // Create new connectors by traversing the tree
  createConnectors(skillsData);
}
function createConnectors(node) {
    const nodeElement = nodeElements[node.id];
    if (nodeElement.style.display === 'none') return;
    if (!node.children || expandedState[node.id] === false) return;

    const parentLeft = nodeElement.offsetLeft;
    const parentTop = nodeElement.offsetTop;
    const parentWidth = NODE_WIDTH;
    const parentHeight = NODE_HEIGHT;

    // Vertical connector from parent to children level
    const parentConnector = document.createElement('div');
    parentConnector.className = 'connector vertical-connector';
    parentConnector.style.left = `${parentLeft + parentWidth / 2}px`;
    parentConnector.style.top = `${parentTop + parentHeight}px`;
    parentConnector.style.height = `${LEVEL_HEIGHT - parentHeight}px`;
    document.querySelector('.skills-tree').appendChild(parentConnector);

    // Only connect visible children
    const visibleChildren = node.children.filter(child => {
        return nodeElements[child.id].style.display !== 'none';
    });

    if (visibleChildren.length > 1) {
        const firstChild = nodeElements[visibleChildren[0].id];
        const lastChild = nodeElements[visibleChildren[visibleChildren.length - 1].id];

        const horizontalConnector = document.createElement('div');
        horizontalConnector.className = 'connector horizontal-connector';
        horizontalConnector.style.left = `${firstChild.offsetLeft + parentWidth / 2}px`;
        horizontalConnector.style.width = `${lastChild.offsetLeft - firstChild.offsetLeft}px`;
        horizontalConnector.style.top = `${parentTop + parentHeight + (LEVEL_HEIGHT - parentHeight) / 2}px`;
        document.querySelector('.skills-tree').appendChild(horizontalConnector);
    }

    // Vertical connectors to each visible child
    visibleChildren.forEach(child => {
        const childElement = nodeElements[child.id];
        const verticalConnector = document.createElement('div');
        verticalConnector.className = 'connector vertical-connector';
        verticalConnector.style.left = `${childElement.offsetLeft + parentWidth / 2}px`;
        verticalConnector.style.top = `${parentTop + parentHeight + (LEVEL_HEIGHT - parentHeight) / 2}px`;
        verticalConnector.style.height = `${(LEVEL_HEIGHT - parentHeight) / 2}px`;
        document.querySelector('.skills-tree').appendChild(verticalConnector);

        // Recursively create connectors for expanded children
        if (expandedState[child.id] !== false) {
            createConnectors(child);
        }
    });
}

function createTooltip() {
  tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  document.body.appendChild(tooltip);
}

function setupEventListeners() {
  // Mouse over/out events for tooltips
  document.addEventListener("mouseover", function (e) {
    const node = e.target.closest(".node");
    if (node) {
      showTooltip(node, e);
    }
  });

  document.addEventListener("mouseout", function (e) {
    const node = e.target.closest(".node");
    if (node) {
      hideTooltip();
    }
  });

  document.addEventListener("mousemove", function (e) {
    const node = e.target.closest(".node");
    if (node) {
      positionTooltip(e);
    }
  });
}

function showTooltip(node, event) {
  tooltip.textContent = node.dataset.description;
  tooltip.classList.add("tooltip-visible");
  positionTooltip(event);
}

function hideTooltip() {
  tooltip.classList.remove("tooltip-visible");
}

function positionTooltip(event) {
  const x = event.clientX + 15;
  const y = event.clientY + 15;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}
