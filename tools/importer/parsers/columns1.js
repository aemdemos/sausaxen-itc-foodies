/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: find direct children by class
  function findChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList && child.classList.contains(className));
  }

  // Block header row
  const headerRow = ['Columns (columns1)'];

  // Column 1: Logo link (first direct <a>)
  const logoLink = Array.from(element.children).find(child => child.tagName === 'A');

  // Column 2: Subscribe form (first child with subscribe class)
  const subscribeDiv = findChildByClass(element, 'footer_subscribeMainDiv__Bg4Bv');

  // Column 3: Footer link columns (find flex row, then extract both columns only)
  let linksRowDiv = Array.from(element.children).find(child => {
    const style = child.getAttribute && child.getAttribute('style');
    return style && /display\s*:\s*flex/i.test(style);
  });
  let leftLinks = null;
  let rightLinks = null;
  if (linksRowDiv) {
    // Find only the two link columns
    const linkCols = Array.from(linksRowDiv.children).filter(c => c.classList && c.classList.contains('footer_pagesList__SpW_J'));
    if (linkCols.length === 2) {
      [leftLinks, rightLinks] = linkCols;
    }
  }
  const linksCell = [];
  if (leftLinks) linksCell.push(leftLinks);
  if (rightLinks) linksCell.push(rightLinks);

  // Compose the block table: header row, then row with three columns (logo, subscribe, [linksLeft, linksRight])
  const cells = [
    headerRow,
    [logoLink || '', subscribeDiv || '', linksCell.length ? linksCell : '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
