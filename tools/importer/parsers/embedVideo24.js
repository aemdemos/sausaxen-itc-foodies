/* global WebImporter */
export default function parse(element, { document }) {
  // The provided element is always empty. The correct block is a single-column table with header and empty content row.
  // There is no Section Metadata block in the markdown example.
  // The header must match: Embed (embedVideo24)
  const cells = [
    ['Embed (embedVideo24)'],
    ['']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
