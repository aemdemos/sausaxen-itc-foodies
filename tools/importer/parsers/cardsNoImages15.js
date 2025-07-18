/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row
  const rows = [['Cards']];

  // Find the slick-track that contains slides
  const track = element.querySelector('.slick-track');
  let cardSlides = [];
  if (track) {
    cardSlides = Array.from(track.children).filter(slide => slide.classList.contains('slick-slide'));
  }

  // For each slide, extract the p from .blogTextDiv
  cardSlides.forEach((slide) => {
    const blogTextDiv = slide.querySelector('.blogTextDiv');
    let cellContent = '';
    if (blogTextDiv && blogTextDiv.textContent.trim().length > 0) {
      // Use the <p> element if present (to preserve formatting)
      const p = blogTextDiv.querySelector('p');
      if (p) {
        cellContent = p;
      } else {
        // fallback: use blogTextDiv itself
        cellContent = blogTextDiv;
      }
    } else {
      // No text content, preserve empty cell
      cellContent = '';
    }
    rows.push([cellContent]);
  });

  // Create the Cards table using the specified API
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
