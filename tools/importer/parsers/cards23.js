/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all card containers (immediate children)
  const cardContainers = Array.from(element.querySelectorAll(':scope > div'));

  // Build the table structure
  const cells = [];
  // Header row: one cell (will set colspan=2 after table creation)
  cells.push(['Cards (cards23)']);

  // Card rows: two columns per row
  cardContainers.forEach((cardContainer) => {
    let icon = cardContainer.querySelector('[class$="-box"]');
    let triangle = cardContainer.querySelector('[class$="-triangle"], [class$="-triangle-wrap"]');
    let iconCell = null;
    if (icon && triangle) {
      iconCell = [icon, triangle];
    } else if (icon) {
      iconCell = icon;
    } else {
      iconCell = cardContainer;
    }
    let labelText = '';
    if (icon && icon.textContent.trim()) {
      labelText = icon.textContent.trim();
    } else {
      labelText = cardContainer.textContent.trim();
    }
    const textDiv = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = labelText;
    textDiv.appendChild(strong);
    cells.push([iconCell, textDiv]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row: ensure it has a single cell with colspan=2
  const firstRow = table.querySelector('tr');
  if (firstRow) {
    // Remove any extra header cells
    while (firstRow.children.length > 1) {
      firstRow.removeChild(firstRow.lastChild);
    }
    // Set colspan to 2 so the header spans both columns
    if (firstRow.children[0]) {
      firstRow.children[0].setAttribute('colspan', '2');
    }
  }

  element.replaceWith(table);
}
