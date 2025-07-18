/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards (cards19)']];
  const cardDivs = element.querySelectorAll(':scope > .filterMainDiv');
  cardDivs.forEach(cardDiv => {
    const cardLink = cardDiv.querySelector('a');
    if (!cardLink) return;

    // --- IMAGE CELL ---
    let imgEl = cardLink.querySelector('.recipe-image-container img');
    if (!imgEl) {
      const imgs = cardLink.querySelectorAll('img');
      let maxImg = null, maxW = 0;
      imgs.forEach(img => { if (+img.width > maxW) { maxImg = img; maxW = +img.width; } });
      if (maxImg) imgEl = maxImg;
    }

    // --- TEXT CELL ---
    const textDiv = document.createElement('div');

    // Title
    let titleText = '';
    const titleEl = cardLink.querySelector('.bigTextDiv .bigText');
    if (titleEl && titleEl.textContent.trim()) {
      titleText = titleEl.textContent.trim();
      const strong = document.createElement('strong');
      strong.textContent = titleText;
      textDiv.appendChild(strong);
    }

    // --- DESCRIPTION ---
    // In this UI, the description is the alt text of the main image for each card!
    // In every card, the card description below the title in the screenshot matches the main image alt text (not the title!)
    let descText = '';
    if (imgEl && imgEl.alt && imgEl.alt.trim() && imgEl.alt.trim() !== titleText) {
      descText = imgEl.alt.trim();
    }
    // Only add if not a duplicate of the title
    if (descText && descText !== titleText) {
      const descP = document.createElement('p');
      descP.textContent = descText;
      textDiv.appendChild(descP);
    }

    // Tag/Label (Veg, Veg + Dairy, etc)
    const label = cardLink.querySelector('.bottomText .text');
    if (label && label.textContent.trim()) {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = label.textContent.trim();
      textDiv.appendChild(tagDiv);
    }
    // Likes (heart icon + number)
    const likesDiv = cardLink.querySelector('.like-image');
    if (likesDiv) {
      textDiv.appendChild(likesDiv);
    }
    // Time and Difficulty
    const leftText = cardLink.querySelector('.leftText .leftSpan');
    if (leftText && leftText.textContent.trim()) {
      const leftDiv = document.createElement('div');
      leftDiv.textContent = leftText.textContent.trim();
      textDiv.appendChild(leftDiv);
    }
    const rightText = cardLink.querySelector('.rightText .rightSpan');
    if (rightText && rightText.textContent.trim()) {
      const rightDiv = document.createElement('div');
      rightDiv.textContent = rightText.textContent.trim();
      textDiv.appendChild(rightDiv);
    }
    // CTA link
    const href = cardLink.getAttribute('href');
    if (href) {
      const cta = document.createElement('div');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = 'View Recipe';
      cta.appendChild(a);
      textDiv.appendChild(cta);
    }
    rows.push([
      imgEl,
      textDiv
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
