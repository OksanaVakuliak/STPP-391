import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const VISIBLE_DOTS = 3;
const mobile = window.matchMedia('(max-width: 1439px)');
let features = null;

const shiftDots = swiper => {
  const lastStep = Math.max(swiper.slides.length - VISIBLE_DOTS, 0);
  const step = Math.min(Math.max(swiper.activeIndex - 1, 0), lastStep);
  swiper.pagination.el.dataset.step = step;
};

const syncFeatures = () => {
  if (mobile.matches && !features) {
    features = new Swiper('.features__slider', {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 16,
      pagination: {
        el: '.features__pagination',
        clickable: true,
      },
      on: {
        afterInit: shiftDots,
        slideChange: shiftDots,
      },
    });
    return;
  }

  if (!mobile.matches && features) {
    features.destroy(true, true);
    features = null;
  }
};

syncFeatures();
mobile.addEventListener('change', syncFeatures);

const playSwiper = new Swiper('.how-to-play__swiper', {
  modules: [Pagination],
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    el: '.how-to-play__pagination',
    clickable: true,
  },
  on: {
    afterInit: shiftDots,
    slideChange: shiftDots,
  },
});
