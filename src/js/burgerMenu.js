const mobileMenuBtn = document.querySelector('[data-mobile-menu]');

const burgerMenuIcon = mobileMenuBtn.querySelector('[data-mobile-menu-icon]');

burgerMenuIcon.addEventListener('click', () => {
  const mobileMenuList = mobileMenuBtn.querySelector(
    '[data-mobile-menu-list-wrapper]'
  );

  mobileMenuBtn.classList.toggle('active');
  mobileMenuList.classList.toggle('active');
});
