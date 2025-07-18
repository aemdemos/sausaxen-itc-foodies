/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by the block
  const headerRow = ['Embed (embedVideo25)'];

  // For this block, the example expects all the relevant source content in a single table cell (second row)
  // We reference the immediate children of the provided element, to preserve all text and structure
  const children = Array.from(element.childNodes);
  let cellContent;
  if (children.length > 0) {
    // Remove any empty text nodes
    cellContent = children.filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return true;
    });
    // If only one node left, just use it directly
    if (cellContent.length === 1) {
      cellContent = cellContent[0];
    }
  } else {
    // If no children, just leave cell empty
    cellContent = '';
  }

  const cells = [
    headerRow,
    [cellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
