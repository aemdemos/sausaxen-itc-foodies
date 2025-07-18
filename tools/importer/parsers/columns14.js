/* global WebImporter */
export default function parse(element, { document }) {
  // Header: exactly one cell per example
  const headerRow = ['Columns (columns14)'];

  // Get the two step containers (directions-detail-container)
  const detailContainers = element.querySelectorAll('.set-width > .directions-detail-container');
  if (!detailContainers.length) return;

  // Each row is two columns: left (text), right (video)
  const rows = [];
  detailContainers.forEach(container => {
    const textSection = container.querySelector('.directions-detail-text-container');
    const leftCol = document.createElement('div');
    // Heading
    const heading = textSection && textSection.querySelector('p.directions-heading-font');
    if (heading) leftCol.appendChild(heading);
    // Duration
    const duration = textSection && textSection.querySelector('.duration-container');
    if (duration) leftCol.appendChild(duration);
    // Paragraph
    const detailFont = textSection && textSection.querySelector('.directions-detail-font');
    if (detailFont) leftCol.appendChild(detailFont);
    // Video
    const video = container.querySelector('video');
    rows.push([leftCol, video]);
  });

  // Compose final cells array
  const cells = [
    headerRow,
    ...rows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
