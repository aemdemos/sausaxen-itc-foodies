/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const rows = [['Cards (cards10)']];

  // For each card container (exploreAllBlogsMainDiv > .loadMoreBlogCards > a > .bloggCardDiv)
  const cardHolders = element.querySelectorAll('.exploreAllBlogsMainDiv .bloggCardDiv');

  cardHolders.forEach((cardDiv) => {
    // Get the main card image for this card
    const mainImage = cardDiv.querySelector('.blog-card-img-container img');
    // We'll reference this <img> element directly

    // Now get text content for the card
    // 1. Title (always present)
    const bigTextDiv = cardDiv.querySelector('.bigTextDiv .bigText');
    // 2. Action label (Explore/Create)
    const actionLabel = cardDiv.querySelector('.smallImageDiv .name');
    // 3. Date string
    const dateDiv = cardDiv.querySelector('.bottomText .text');
    // 4. Likes count
    const likesSpan = cardDiv.querySelector('.bottomText span');
    // 5. (Optional) If any link is present for the card
    const cardLink = cardDiv.closest('a');

    // Build the text cell content
    // We'll wrap each line in a <div> for clarity
    const textCell = document.createElement('div');
    // Action label (Explore/Create), in bold
    if (actionLabel && actionLabel.textContent.trim()) {
      const actionDiv = document.createElement('div');
      actionDiv.style.fontWeight = 'bold';
      actionDiv.textContent = actionLabel.textContent.trim();
      textCell.appendChild(actionDiv);
    }
    // Date
    if (dateDiv && dateDiv.textContent.trim()) {
      const dateEl = document.createElement('div');
      dateEl.textContent = dateDiv.textContent.trim();
      textCell.appendChild(dateEl);
    }
    // Likes
    if (likesSpan && likesSpan.textContent.trim()) {
      const likesDiv = document.createElement('div');
      likesDiv.textContent = `❤ ${likesSpan.textContent.trim()}`;
      textCell.appendChild(likesDiv);
    }
    // Title/heading
    if (bigTextDiv && bigTextDiv.textContent.trim()) {
      const heading = document.createElement('strong');
      heading.textContent = bigTextDiv.textContent.trim();
      // Add a line break before the heading if previous content exists
      if (textCell.childNodes.length > 0) {
        textCell.appendChild(document.createElement('br'));
      }
      textCell.appendChild(heading);
    }
    // If the card is wrapped in a link, add the heading as a link as well
    if (cardLink && cardLink.getAttribute('href') && bigTextDiv && bigTextDiv.textContent.trim()) {
      // Remove unlinked <strong> if present
      if (textCell.lastChild && textCell.lastChild.tagName === 'STRONG') {
        textCell.removeChild(textCell.lastChild);
      }
      const link = document.createElement('a');
      link.href = cardLink.getAttribute('href');
      link.appendChild(document.createElement('strong')).textContent = bigTextDiv.textContent.trim();
      textCell.appendChild(link);
    }
    // Assemble the row for this card
    rows.push([
      mainImage,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
