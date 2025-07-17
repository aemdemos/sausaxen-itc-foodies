/* global WebImporter */
export default function parse(element, { document }) {
  // Block header, as per specification
  const headerRow = ['Cards (cards18)'];

  // Find all card slides within the slick slider
  // Each .slick-slide is a card
  const slides = element.querySelectorAll('.slick-slide');
  const rows = [];

  slides.forEach(slide => {
    // Get image from .plate-serve-carousel-container img
    const img = slide.querySelector('.plate-serve-carousel-container img');

    // Title (from .carousel-heading-font-container .orange-shadow-box, as <strong>)
    let titleEl = slide.querySelector('.carousel-heading-font-container .orange-shadow-box');
    let title = null;
    if (titleEl && titleEl.textContent.trim()) {
      title = document.createElement('strong');
      title.textContent = titleEl.textContent.trim();
    }

    // Description (from .plate-serve-carousel-container .description-font p or .description-font)
    let desc = null;
    const descContainer = slide.querySelector('.plate-serve-carousel-container .description-font');
    if (descContainer) {
      // If there's a single <p>, use that, else grab the container
      const descP = descContainer.querySelector('p');
      desc = descP ? descP : descContainer;
    }

    // Compose the text cell, preserving structure
    const textCell = document.createElement('div');
    if (title) {
      textCell.appendChild(title);
    }
    if (title && desc) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(document.createElement('br'));
    }
    if (desc) {
      textCell.appendChild(desc);
    }
    // If no title and no desc, cell will be empty but must exist

    rows.push([
      img,
      textCell
    ]);
  });

  // Compose full table rows (header + cards)
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
