/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child .box-container elements
  const boxContainers = element.querySelectorAll(':scope > .box-container');
  // Collect the .blank-box elements to reference directly in the table
  const blankBoxes = Array.from(boxContainers)
    .map(box => box.querySelector('.blank-box'))
    .filter(Boolean); // Only include if exists

  // If there are no blank-boxes, do nothing
  if (blankBoxes.length === 0) return;

  // Table: first row is ['Table'], second row is the blank-boxes (as elements)
  const cells = [
    ['Table'],
    blankBoxes
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
