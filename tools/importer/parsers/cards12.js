/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards12)'];

  // Each .slick-slide is a card
  const cards = Array.from(element.querySelectorAll('.slick-slide'));

  const rows = cards.map(card => {
    // The anchor contains the card content
    const anchor = card.querySelector('a');
    if (!anchor) return ['', ''];

    // Get the main recipe image (not icons or overlay)
    let imgElem = anchor.querySelector('.recipe-image-container img');
    if (!imgElem) {
      // fallback: any img in the recipe card
      imgElem = anchor.querySelector('img');
    }
    // Use the actual element reference, not a clone
    // But since the img is deeply nested, and may be reused, we can safely move it

    // Compose the text cell:
    // 1. Diet tag ("Veg + Egg")
    const diet = anchor.querySelector('.bottomText .text');
    // 2. Card title
    const bigText = anchor.querySelector('.bigText');
    // 3. Yellow bar info (time, difficulty)
    const yellowDiv = anchor.querySelector('.yellowDiv');
    // Compose the text as single cell, referencing existing elements
    const cellContent = [];
    if (diet) cellContent.push(diet);
    if (bigText) cellContent.push(bigText);
    if (yellowDiv) cellContent.push(yellowDiv);
    // If no content, put empty
    const textCell = cellContent.length > 0 ? cellContent : '';
    return [imgElem || '', textCell];
  });

  // Assemble the table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
