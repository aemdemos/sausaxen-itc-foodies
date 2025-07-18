/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the Carousel block
  const cells = [
    ['Carousel (carousel29)'],
  ];

  // Get all direct children of the carousel container (should be just the video, but generalized)
  const slideChildren = Array.from(element.childNodes).filter(node => {
    // Only element nodes or text nodes with text
    return (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim()))
  });

  // We'll aggregate content for the "slide"
  let slideCellContent = [];

  // If there is a <video> element, convert it to a link per rules
  const video = element.querySelector('video');
  if (video && video.src) {
    const link = document.createElement('a');
    link.href = video.src;
    link.textContent = video.src;
    slideCellContent.push(link);
  }

  // Add any text content that is a direct child of the carousel
  slideChildren.forEach(node => {
    // If this is a text node and not whitespace, include the text
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim();
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        slideCellContent.push(p);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'video') {
      // If there is a direct child element that is not the <video>, include it as-is
      slideCellContent.push(node);
    }
  });

  // Decide what goes in the cell: combine if needed, or just single item
  let slideCell;
  if (slideCellContent.length === 0) {
    slideCell = '';
  } else if (slideCellContent.length === 1) {
    slideCell = slideCellContent[0];
  } else {
    slideCell = slideCellContent;
  }

  cells.push([slideCell]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
