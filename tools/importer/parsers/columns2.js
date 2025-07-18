/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: create an anchor link for a video src
  function makeLinkFromSrc(src) {
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    return a;
  }

  // Find all .directions-detail-container blocks
  let stepContainers = [];
  const setWidth = element.querySelector(':scope > .set-width');
  if (setWidth) {
    stepContainers = Array.from(setWidth.querySelectorAll(':scope > .directions-detail-container'));
  } else {
    stepContainers = Array.from(element.querySelectorAll(':scope > .directions-detail-container'));
  }

  // Extract left (text) and right (video link) for each step
  const contentRows = stepContainers.map(step => {
    const leftDetail = step.querySelector('.directions-detail');
    let leftContent = '';
    if (leftDetail) leftContent = leftDetail;
    let rightContent = '';
    const video = step.querySelector('video');
    if (video) {
      const source = video.querySelector('source');
      if (source && source.src) {
        rightContent = makeLinkFromSrc(source.src);
      }
    }
    return [leftContent, rightContent];
  });

  // The header row must be a single cell, matching the example
  // The following rows are two columns each
  const tableCells = [
    ['Columns (columns2)'],
    ...contentRows
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
