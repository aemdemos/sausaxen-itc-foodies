/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare rows: header row is SINGLE cell; each card row is TWO cells (image/icon, text)
  const rows = [
    ['Cards (cards6)'] // header row: exactly 1 cell
  ];

  // Extract the text content for the card from the .heading-text element
  const headingText = element.querySelector('.heading-text');

  // Each card: [image cell, content cell] (no image, so first cell is '')
  rows.push(['', headingText]);

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}