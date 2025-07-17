/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion container
  const accordionDiv = element.querySelector('.accordionDiv');
  if (!accordionDiv) return;

  // Find all accordion items (the root nodes for each FAQ row)
  const accordionItems = accordionDiv.querySelectorAll('.MuiAccordion-root');

  // Prepare the rows for the table
  const rows = [];
  // Always start with the header row as specified
  rows.push(['Accordion (accordion26)']);

  accordionItems.forEach((item) => {
    // Find the summary (label/title) content
    let title = '';
    const summary = item.querySelector('.MuiAccordionSummary-content');
    if (summary) {
      // Grab all direct children as elements (usually a <p>)
      if (summary.children.length > 0) {
        // Use the element directly. No cloning.
        title = summary.firstElementChild;
      } else {
        // Fallback: get the text content
        title = document.createTextNode(summary.textContent.trim());
      }
    }

    // Find the details/content (expanded body)
    let content = '';
    // Find .MuiAccordionDetails-root with actual content (may be empty divs present)
    const detailsList = item.querySelectorAll('.MuiAccordionDetails-root');
    for (const detailDiv of detailsList) {
      // Only grab the detail if it contains content (skip empty)
      if (detailDiv && detailDiv.textContent.trim()) {
        // Use the expandContent span if present, else the detailDiv itself
        const expandContent = detailDiv.querySelector('.expandContent');
        if (expandContent) {
          // If the expandContent has only a <p> inside, use the <p> directly
          if (
            expandContent.children.length === 1 &&
            expandContent.firstElementChild.tagName === 'P'
          ) {
            content = expandContent.firstElementChild;
          } else {
            content = expandContent;
          }
        } else {
          content = detailDiv;
        }
        break;
      }
    }
    // Defensive: fallback if still no content
    if (!content) {
      content = document.createTextNode('');
    }

    // Push each row as [title, content]
    rows.push([title, content]);
  });

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the entire original element with the table
  element.replaceWith(table);
}
