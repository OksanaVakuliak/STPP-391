import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const VISIBLE_DOTS = 3;
const mobile = window.matchMedia('(max-width: 1439px)');
let features = null;
let howToPlay = null;

const shiftDots = swiper => {
  const lastStep = Math.max(swiper.slides.length - VISIBLE_DOTS, 0);
  const step = Math.min(Math.max(swiper.activeIndex - 1, 0), lastStep);
  swiper.pagination.el.dataset.step = step;
};

const createSlider = (selector, paginationSelector) =>
  new Swiper(selector, {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
      el: paginationSelector,
      clickable: true,
    },
    on: {
      afterInit: shiftDots,
      slideChange: shiftDots,
    },
  });

const syncSliders = () => {
  if (mobile.matches) {
    if (!features) {
      features = createSlider('.features__slider', '.features__pagination');
    }
    if (!howToPlay) {
      howToPlay = createSlider(
        '.how-to-play__slider',
        '.how-to-play__pagination'
      );
    }
    return;
  }

  if (features) {
    features.destroy(true, true);
    features = null;
  }
  if (howToPlay) {
    howToPlay.destroy(true, true);
    howToPlay = null;
  }
};

syncSliders();
mobile.addEventListener('change', syncSliders);
