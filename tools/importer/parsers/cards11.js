/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one column, matching the example
  const headerRow = ['Cards (cards11)'];

  // Card row: two columns (image cell, text cell), as required by the block
  // Extract the heading content for the card text
  let cardText = '';
  const h2 = element.querySelector('h2');
  if (h2) {
    const headingTextParent = h2.querySelector('.heading-text-parent');
    if (headingTextParent) {
      cardText = headingTextParent;
    } else {
      cardText = h2;
    }
  } else {
    cardText = element;
  }

  // Card row: two columns (first: image/icon - none, second: text)
  const cardRow = ['', cardText];

  // Compose cells: header row is single column, card row is two columns
  const cells = [
    headerRow, // single column for header
    cardRow    // two columns for card
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
