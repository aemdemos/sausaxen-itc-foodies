/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one column (block name)
  const headerRow = ['Accordion (accordion20)'];
  const rows = [headerRow];

  // Find the input with a placeholder for the accordion title
  const input = element.querySelector('input[placeholder]');
  let title = '';
  if (input) {
    title = input.getAttribute('placeholder') || '';
  }

  // The accordion data row must have TWO cells: [title, content]
  if (title) {
    rows.push([title, '']);
  }

  // Only create and replace the table if an accordion row exists
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
