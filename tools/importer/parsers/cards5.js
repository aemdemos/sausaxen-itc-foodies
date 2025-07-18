/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards5)'];
  const cells = [headerRow];

  // Cards are .slick-track > .slick-slide
  const track = element.querySelector('.slick-track');
  if (!track) return;
  const slides = Array.from(track.children).filter(slide => slide.classList.contains('slick-slide'));

  slides.forEach(slide => {
    // Card root: slide > div > a > .bloggCardDiv
    const cardDiv = slide.querySelector('.bloggCardDiv');
    if (!cardDiv) return;

    // --- IMAGE CELL ---
    // Find main image (only the card main image, not icons)
    let image = cardDiv.querySelector('.blog-card-img-container img');
    let imageCell = image || document.createTextNode('');

    // --- TEXT CELL ---
    // Assemble content in order, using direct references where possible
    const textContent = [];

    // Category: .smallImageDiv .name (optional)
    const category = cardDiv.querySelector('.smallImageDiv .name');
    if (category && category.textContent.trim()) {
      const catText = document.createElement('div');
      catText.textContent = category.textContent.trim();
      textContent.push(catText);
    }
    // Date: .recipeTextDiv .bottomText .text (optional)
    const date = cardDiv.querySelector('.recipeTextDiv .bottomText .text');
    if (date && date.textContent.trim()) {
      const dateText = document.createElement('div');
      dateText.textContent = date.textContent.trim();
      textContent.push(dateText);
    }
    // Title: .bigTextDiv .bigText (required)
    const title = cardDiv.querySelector('.bigTextDiv .bigText');
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textContent.push(strong);
    }
    // Compose cell: if one, just use it, if more, array
    const textCell = textContent.length === 1 ? textContent[0] : textContent;

    cells.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
