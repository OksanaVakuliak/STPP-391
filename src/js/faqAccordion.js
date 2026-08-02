const faqList = document.querySelector('[data-faq]');

if (faqList) {
  const items = faqList.querySelectorAll('[data-faq-item]');

  items.forEach(item => {
    const toggle = item.querySelector('[data-faq-toggle]');
    const panel = item.querySelector('[data-faq-panel]');

    if (!toggle || !panel) {
      return;
    }

    toggle.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', toggle.id);
  });

  faqList.addEventListener('click', event => {
    const toggle = event.target.closest('[data-faq-toggle]');

    if (!toggle) {
      return;
    }

    const item = toggle.closest('[data-faq-item]');
    const panel = item.querySelector('[data-faq-panel]');
    const wasOpen = item.hasAttribute('data-open');

    faqList.querySelectorAll('[data-faq-item][data-open]').forEach(openItem => {
      openItem.removeAttribute('data-open');

      const openToggle = openItem.querySelector('[data-faq-toggle]');
      const openPanel = openItem.querySelector('[data-faq-panel]');

      if (openToggle) {
        openToggle.setAttribute('aria-expanded', 'false');
      }

      if (openPanel) {
        openPanel.hidden = true;
      }
    });

    if (!wasOpen) {
      item.setAttribute('data-open', '');
      toggle.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
    }
  });
}
