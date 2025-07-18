/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell
  const headerRow = ['Columns (columns22)'];

  // Gather the column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Each column cell should contain all children (not cloned) of the column
  const columns = columnDivs.map((colDiv) => Array.from(colDiv.children));

  // Build the table structure: 1 header cell, then 1 row with n columns
  const cells = [
    headerRow, // Header: single cell, as required
    columns    // Content row: as many columns as needed
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
