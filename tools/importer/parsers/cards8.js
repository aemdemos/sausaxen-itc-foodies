/* global WebImporter */
export default function parse(element, { document }) {
  // Find slick-track (holds all slick-slide cards)
  const track = element.querySelector('.slick-track');
  if (!track) return;
  // Get all direct slick-slide children (skip clones, if any, by checking for class)
  const slides = Array.from(track.children).filter(slide => slide.classList.contains('slick-slide'));

  // Table header row must match example
  const rows = [['Cards (cards8)']];

  slides.forEach((slide) => {
    // Each slick-slide contains a structure with a main link
    const cardAnchor = slide.querySelector('a');
    if (!cardAnchor) return;
    const cardDiv = cardAnchor.querySelector('.bloggCardDiv');
    if (!cardDiv) return;

    // COLUMN 1: main card image (not the top icon)
    const mainImgContainer = cardDiv.querySelector('.blog-card-img-container');
    const mainImg = mainImgContainer ? mainImgContainer.querySelector('img') : null;

    // COLUMN 2: text content
    // Title
    let title = '';
    const titleDiv = cardDiv.querySelector('.bigTextDiv .bigText');
    if (titleDiv) title = titleDiv.textContent.trim();
    // Category (e.g. Create, Learn)
    let category = '';
    const catEl = cardDiv.querySelector('.smallImageDiv .name');
    if (catEl) category = catEl.textContent.trim();
    // Date
    let date = '';
    const dateEl = cardDiv.querySelector('.recipeTextDiv .bottomText .text');
    if (dateEl) date = dateEl.textContent.trim();

    // Compose the text cell
    const textCell = document.createElement('div');
    // Category (if present)
    if (category) {
      const catSpan = document.createElement('span');
      catSpan.textContent = category;
      catSpan.style.fontSize = '0.95em';
      catSpan.style.fontWeight = 'bold';
      textCell.appendChild(catSpan);
      textCell.appendChild(document.createElement('br'));
    }
    // Title (always bold)
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      textCell.appendChild(strong);
      textCell.appendChild(document.createElement('br'));
    }
    // Date (if present)
    if (date) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = date;
      dateSpan.style.fontSize = '0.9em';
      textCell.appendChild(dateSpan);
    }
    // If nothing, fallback to anchor text
    if (!textCell.textContent.trim()) {
      textCell.textContent = cardAnchor.textContent.trim();
    }

    rows.push([
      mainImg,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
