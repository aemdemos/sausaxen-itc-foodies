/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as in the example
  const headerRow = ['Search'];

  // Collect all text content and structure from the HTML block
  // Using the immediate children, as this block contains a heading, search bar, and button
  // This will include heading and all UI elements (search input, button, etc.)
  const contentCells = [];
  const children = Array.from(element.children);
  if (children.length === 1) {
    // If all content is wrapped in a single child, just use that element
    contentCells.push(children[0]);
  } else {
    // Otherwise, create a wrapper and append all children to preserve order and structure
    const wrapper = document.createElement('div');
    children.forEach(child => wrapper.appendChild(child));
    contentCells.push(wrapper);
  }

  const cells = [
    headerRow,
    contentCells,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
