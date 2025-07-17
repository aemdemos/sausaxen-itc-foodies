/* global WebImporter */
export default function parse(element, { document }) {
  // The block structure requires: header row (one cell), second row (two cells: left image, right content)
  // Get direct children
  const children = Array.from(element.children);
  let img = null;
  let contentDiv = null;
  for (const child of children) {
    if (!img && child.tagName === 'IMG') {
      img = child;
    } else if (!contentDiv && child.classList.contains('content-font-container')) {
      contentDiv = child;
    }
  }
  // Defensive: fallback to empty cell if a side is missing
  const dataRow = [img || '', contentDiv || ''];
  // The header row must be a single cell array
  const headerRow = ['Columns (columns27)'];
  const cells = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
