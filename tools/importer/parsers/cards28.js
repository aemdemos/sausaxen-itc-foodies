/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block/component name exactly
  const headerRow = ['Cards (cards28)'];

  // Find the cards wrapper
  const optionsWrapper = element.querySelector('.must-try-options');
  if (!optionsWrapper) return;

  // Each direct <a> child is a card
  const cardAnchors = Array.from(optionsWrapper.querySelectorAll(':scope > a'));

  const rows = [headerRow];

  cardAnchors.forEach((anchor) => {
    // Find the card container (for semantic grouping, if needed)
    const container = anchor.querySelector('.must-try-container');

    // Get the image (first img)
    const img = container ? container.querySelector('img') : null;

    // Get the text container
    const textContainer = container ? container.querySelector('.option1-text') : null;

    // Compose the title (as <strong>) if present
    let headingEl = null;
    if (textContainer) {
      const headingDiv = textContainer.querySelector('.option1-heading');
      if (headingDiv && headingDiv.textContent.trim()) {
        headingEl = document.createElement('strong');
        headingEl.textContent = headingDiv.textContent.trim();
      }
    }

    // Compose the description if present
    let descEl = null;
    if (textContainer) {
      const descDiv = textContainer.querySelector('.option1-content');
      if (descDiv && descDiv.textContent.trim()) {
        descEl = document.createElement('div');
        descEl.textContent = descDiv.textContent.trim();
      }
    }

    // Compose the text cell
    const textCell = [];
    if (headingEl) textCell.push(headingEl);
    if (descEl) {
      if (headingEl) textCell.push(document.createElement('br'));
      textCell.push(descEl);
    }
    if (!headingEl && !descEl) {
      // fallback, empty cell
      textCell.push('');
    }

    // Use existing image element directly; if not present, fallback to empty
    rows.push([
      img || '',
      textCell.length === 1 ? textCell[0] : textCell // array or single element
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
