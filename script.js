// Simple accessible project filtering. No framework or external dependency needed.
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const projectCards = Array.from(document.querySelectorAll('[data-category]'));
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach((card) => {
      const visible = value === 'all' || card.dataset.category === value;
      card.classList.toggle('is-hidden', !visible);
      card.setAttribute('aria-hidden', String(!visible));
    });
  });
});

const copyButton = document.getElementById('copy-email');
copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('kartikeys43@gmail.com');
    copyButton.textContent = 'Copied!';
    window.setTimeout(() => { copyButton.textContent = 'Copy ↗'; }, 1800);
  } catch {
    window.location.href = 'mailto:kartikeys43@gmail.com';
  }
});
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
