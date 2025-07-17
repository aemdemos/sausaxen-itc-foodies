/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate card containers
  const cardContainers = element.querySelectorAll(':scope > .set-width > .directions-detail-container');
  const rows = [['Cards (cards3)']];

  cardContainers.forEach(container => {
    // Get text and video from each card
    const textContainer = container.querySelector('.directions-detail-text-container');
    const video = container.querySelector('video');

    // Prepare left cell: the video element (reference directly)
    let leftCell = video || '';

    // Prepare right cell content
    const cellContent = [];
    // Title from .directions-heading-font
    const titleEl = textContainer && textContainer.querySelector('.directions-heading-font');
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      cellContent.push(strong);
    }
    // Duration (text only) from .duration-container
    const durationEl = textContainer && textContainer.querySelector('.duration-container');
    if (durationEl && durationEl.childNodes.length > 0) {
      // Exclude the clock icon and use only the text node(s)
      durationEl.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          const dur = document.createElement('div');
          dur.textContent = node.textContent.trim();
          cellContent.push(dur);
        }
      });
    }
    // Description from .directions-detail-font (can have <ul>, <p>, etc.)
    const descEl = textContainer && textContainer.querySelector('.directions-detail-font');
    if (descEl) {
      cellContent.push(descEl);
    }
    rows.push([leftCell, cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
