const faqList = document.querySelector('[data-faq]');

if (faqList) {
  faqList.addEventListener('click', event => {
    const toggle = event.target.closest('[data-faq-toggle]');

    if (!toggle) {
      return;
    }

    const item = toggle.closest('[data-faq-item]');
    const wasOpen = item.hasAttribute('data-open');

    faqList
      .querySelectorAll('[data-faq-item][data-open]')
      .forEach(openItem => openItem.removeAttribute('data-open'));

    if (!wasOpen) {
      item.setAttribute('data-open', '');
    }
  });
}
