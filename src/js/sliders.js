import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const mobile = window.matchMedia('(max-width: 1439px)');
let features = null;

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
