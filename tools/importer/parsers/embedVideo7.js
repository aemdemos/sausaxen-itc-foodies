/* global WebImporter */
export default function parse(element, { document }) {
  // Find all step containers (each .directions-detail-container is a step)
  // Robustly get all .directions-detail-container that are descendants (handles both flat and nested)
  const steps = element.querySelectorAll('.directions-detail-container');
  if (!steps.length) {
    element.remove();
    return;
  }
  const blocks = [];
  steps.forEach((step) => {
    const cellContent = [];
    // Collect all child nodes except <video> (includes headings, durations, description, etc)
    Array.from(step.children).forEach(child => {
      if (child.tagName && child.tagName.toLowerCase() !== 'video') {
        cellContent.push(child);
      }
    });
    // Find video (if any) and add its URL as a link
    const video = step.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      if (source && source.src) {
        // Add a <br> before the link if there is other content above
        if (cellContent.length) cellContent.push(document.createElement('br'));
        const link = document.createElement('a');
        link.href = source.src;
        link.textContent = source.src;
        cellContent.push(link);
      }
    }
    // Only add the block if there is some content
    if (cellContent.length) {
      const cells = [
        ['Embed (embedVideo7)'],
        [cellContent]
      ];
      const block = WebImporter.DOMUtils.createTable(cells, document);
      blocks.push(block);
    }
  });
  if (blocks.length) {
    const fragment = document.createDocumentFragment();
    blocks.forEach(block => fragment.appendChild(block));
    element.replaceWith(fragment);
  } else {
    element.remove();
  }
}
