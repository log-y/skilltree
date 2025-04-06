const container = document.getElementById("skill-tree");
const svg = document.querySelector(".lines");

skillTreeData.forEach(node => {
  const div = document.createElement("div");
  div.className = "skill-node";
  div.style.left = node.position.x + "px";
  div.style.top = node.position.y + "px";
  div.textContent = node.label;
  div.dataset.tooltip = node.description;
  div.id = node.id;

  div.addEventListener("mouseenter", e => {
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerText = div.dataset.tooltip;
    document.body.appendChild(tooltip);
    const rect = div.getBoundingClientRect();
    tooltip.style.left = rect.left + "px";
    tooltip.style.top = (rect.top - 30) + "px";
    tooltip.style.display = "block";
    div._tooltip = tooltip;
  });

  div.addEventListener("mouseleave", () => {
    if (div._tooltip) {
      document.body.removeChild(div._tooltip);
      div._tooltip = null;
    }
  });

  container.appendChild(div);
});

function drawLines() {
  skillTreeData.forEach(parent => {
    const parentEl = document.getElementById(parent.id);
    const parentRect = parentEl.getBoundingClientRect();
    const parentX = parentRect.left + parentRect.width / 2 + window.scrollX;
    const parentY = parentRect.top + parentRect.height / 2 + window.scrollY;

    parent.children.forEach(childId => {
      const childEl = document.getElementById(childId);
      const childRect = childEl.getBoundingClientRect();
      const childX = childRect.left + childRect.width / 2 + window.scrollX;
      const childY = childRect.top + childRect.height / 2 + window.scrollY;

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", parentX);
      line.setAttribute("y1", parentY);
      line.setAttribute("x2", childX);
      line.setAttribute("y2", childY);
      line.setAttribute("stroke", "#888");
      line.setAttribute("stroke-width", "2");
      svg.appendChild(line);
    });
  });
}

// Wait for DOM layout
window.addEventListener("load", () => {
  drawLines();
});
