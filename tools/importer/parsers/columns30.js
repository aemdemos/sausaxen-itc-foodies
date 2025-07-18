/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child .box-container elements (each representing a column)
  const boxContainers = Array.from(element.querySelectorAll(':scope > .box-container'));

  // For each, extract the .blank-box (text) as is
  const columns = boxContainers.map(box => {
    const blankBox = box.querySelector('.blank-box');
    return blankBox ? blankBox : '';
  });

  // Only build the table if there is at least one column
  if (columns.length === 0) return;

  // Build the table: header row (single cell), then row with each column as a cell
  const cells = [
    ['Columns (columns30)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
