/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first hero image
  function getHeroImage() {
    const img = element.querySelector('img');
    return img || '';
  }

  // Helper to gather heading, subheading, and CTA, including empty paragraphs if present
  function getHeroContent() {
    const absContent = element.querySelector('.absolute-content-carousel');
    if (!absContent) return '';
    const frag = document.createDocumentFragment();
    // Collect all children in order (including empty ones for consistent structure)
    absContent.childNodes.forEach(node => {
      // Only include element nodes
      if (node.nodeType === Node.ELEMENT_NODE) {
        // For .home-page-carousel-text and .home-page-carousel-sub-heading, always include as <p>
        if (node.classList.contains('home-page-carousel-text') || node.classList.contains('home-page-carousel-sub-heading')) {
          const text = node.textContent || '';
          const p = document.createElement('p');
          p.textContent = text.trim();
          frag.appendChild(p);
        } else if (node.classList.contains('home-start-button')) {
          // For button, include as a <p> with button text (no link present)
          const btn = node.querySelector('button');
          if (btn && btn.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = btn.textContent.trim();
            frag.appendChild(p);
          }
        }
      }
    });
    // Always return fragment (may contain empty <p>) to preserve structure
    return frag;
  }

  const headerRow = ['Hero'];
  const imgRow = [getHeroImage()];
  const contentRow = [getHeroContent()];

  const rows = [headerRow, imgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
