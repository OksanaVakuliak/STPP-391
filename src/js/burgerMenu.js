const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
const menuWrapper = document.querySelector('[data-mobile-menu-list-wrapper]');

if (mobileMenuBtn && menuWrapper) {
  const menuLinks = menuWrapper.querySelectorAll('[data-mobile-menu-link]');

  const setMenuState = isOpen => {
    const value = isOpen ? 'true' : 'false';

    mobileMenuBtn.setAttribute('data-open', value);
    menuWrapper.setAttribute('data-open', value);

    mobileMenuBtn.setAttribute('aria-expanded', value);
    mobileMenuBtn.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu'
    );
    menuWrapper.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

    if (isOpen) {
      document.body.setAttribute('data-menu-open', 'true');
    } else {
      document.body.removeAttribute('data-menu-open');
    }
  };

  const isMenuOpen = () => mobileMenuBtn.getAttribute('data-open') === 'true';

  const desktop = window.matchMedia('(min-width: 1440px)');

  const closeMenu = () => setMenuState(false);
  const toggleMenu = () => setMenuState(!isMenuOpen());
  const closeMenuOnDesktop = () => {
    if (desktop.matches && isMenuOpen()) {
      closeMenu();
    }
  };

  setMenuState(false);

  mobileMenuBtn.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', event => {
    const clickInsideButton = mobileMenuBtn.contains(event.target);
    const clickInsidePanel = menuWrapper.contains(event.target);

    if (!clickInsideButton && !clickInsidePanel) {
      closeMenu();
    }
  });

  desktop.addEventListener('change', closeMenuOnDesktop);
}
