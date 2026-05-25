class GrowmodoFeaturedCollection extends HTMLElement {
  constructor() {
    super();
    this.swiper = null;
    this.mediaQuery = window.matchMedia('(max-width: 749px)');
    this.onMediaChange = this.onMediaChange.bind(this);
  }

  connectedCallback() {
    this.swiperElement = this.querySelector('.growmodo-featured-collection__swiper');
    if (!this.swiperElement) return;

    this.mediaQuery.addEventListener('change', this.onMediaChange);
    this.initSwiper();
  }

  disconnectedCallback() {
    this.mediaQuery.removeEventListener('change', this.onMediaChange);
    this.destroySwiper();
  }

  onMediaChange() {
    this.initSwiper();
  }

  initSwiper() {
    if (!this.mediaQuery.matches) {
      this.destroySwiper();
      return;
    }

    if (this.swiper) return;

    if (typeof Swiper === 'undefined') {
      window.setTimeout(() => this.initSwiper(), 50);
      return;
    }

    const slidesPerView = parseFloat(this.dataset.slidesPerView || '115') / 100;
    const spaceBetween = parseInt(this.dataset.spaceBetween || '16', 10);

    this.swiper = new Swiper(this.swiperElement, {
      slidesPerView,
      spaceBetween,
      watchOverflow: true,
    });
  }

  destroySwiper() {
    if (!this.swiper) return;
    this.swiper.destroy(true, true);
    this.swiper = null;
  }
}

if (!customElements.get('growmodo-featured-collection')) {
  customElements.define('growmodo-featured-collection', GrowmodoFeaturedCollection);
}
