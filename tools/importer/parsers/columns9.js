/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single column/cell as per the example
  const headerRow = ['Columns (columns9)'];

  // Find the left and right column content
  let leftColContent = '';
  let rightColContent = '';

  // The main detail is the text and left content
  const mainDetail = element.querySelector(':scope > .directions-detail');
  if (mainDetail) {
    const textContainer = mainDetail.querySelector('.directions-detail-text-container');
    if (textContainer) {
      // Compose a div to contain all the left content (heading, duration, and details)
      const leftDiv = document.createElement('div');
      // Heading
      const heading = textContainer.querySelector('.directions-heading-font');
      if (heading) leftDiv.appendChild(heading);
      // Duration
      const duration = textContainer.querySelector('.duration-container');
      if (duration) leftDiv.appendChild(duration);
      // Instruction paragraph(s)
      const descSpan = textContainer.querySelector('span.directions-detail-font');
      if (descSpan) {
        Array.from(descSpan.childNodes).forEach(child => {
          leftDiv.appendChild(child);
        });
      }
      leftColContent = leftDiv.childNodes.length > 0 ? leftDiv : '';
    }
  }

  // The right column is the video (if present)
  const video = element.querySelector(':scope > video');
  if (video) {
    rightColContent = video;
  }

  // Compose the data row as an array of columns (cells), to match the two-column layout of the example
  const row = [leftColContent, rightColContent];

  // Table consists of a single header row with one column, and a single content row with two columns
  const rows = [
    headerRow,
    row
  ];
  
  // Create and replace with the block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
