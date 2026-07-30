const header = document.querySelector('.header');

if (header) {
  const SCROLL_DELTA = 8;
  const TOP_OFFSET = 16;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const setHiddenState = isHidden => {
    header.setAttribute('data-hidden', isHidden ? 'true' : 'false');
  };

  const updateHeaderOnScroll = () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;

    if (Math.abs(diff) < SCROLL_DELTA) {
      ticking = false;
      return;
    }

    if (currentScrollY <= TOP_OFFSET) {
      setHiddenState(false);
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    setHiddenState(diff > 0);
    lastScrollY = currentScrollY;
    ticking = false;
  };

  setHiddenState(false);

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeaderOnScroll);
    },
    { passive: true }
  );
}
