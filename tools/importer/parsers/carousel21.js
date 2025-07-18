/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row exactly as required
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Each .timeStampContainer is a single slide
  const slides = element.querySelectorAll('.timeStampContainer');
  slides.forEach((slide) => {
    // Find the image inside this slide
    const img = slide.querySelector('img');
    // Text cell content
    const textParts = [];
    // Time (from .timeBox span)
    const timeBox = slide.querySelector('.timeBox span');
    if (timeBox && timeBox.textContent.trim()) {
      const pTime = document.createElement('p');
      pTime.textContent = timeBox.textContent.trim();
      pTime.style.fontWeight = 'bold';
      textParts.push(pTime);
    }
    // Title (from .timestampTitle)
    const title = slide.querySelector('.timestampTitle');
    if (title && title.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent.trim();
      textParts.push(h2);
    }
    // Subtitle (from .timestampSubtitle)
    const subtitle = slide.querySelector('.timestampSubtitle');
    if (subtitle && subtitle.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subtitle.textContent.trim();
      textParts.push(p);
    }
    // Always 2 columns: image, then array of text content (may be empty)
    rows.push([
      img,
      textParts.length > 0 ? textParts : ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
