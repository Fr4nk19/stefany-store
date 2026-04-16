(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var SECTION_CONFIG = {
    hero_banner:        { skip: true },
    intro_text:         { type: 'up' },
    our_mission:        { type: 'up', stagger: true },
    mission_image_grid: { type: 'up', stagger: true },
    our_vision:         { type: 'up', stagger: true },
    founder_story:      { type: 'up' },
    founder_images:     { type: 'up', stagger: true },
    pull_quote:         { type: 'zoom' },
    our_values:         { type: 'up', stagger: true }
  };

  function getInnerEl(wrapper) {
    return wrapper.firstElementChild;
  }

  function setup() {
    var entries = Object.keys(SECTION_CONFIG);

    entries.forEach(function (id) {
      var cfg = SECTION_CONFIG[id];
      if (cfg.skip) return;

      var wrapper = document.getElementById('shopify-section-' + id);
      if (!wrapper) return;

      var el = getInnerEl(wrapper);
      if (!el) return;

      el.classList.add('scroll-reveal');
      el.classList.add('scroll-reveal--' + cfg.type);

      if (cfg.stagger) {
        var content = el.querySelector('.section-content-wrapper, .layout-panel-flex, .media-with-content');
        if (content) {
          content.classList.add('scroll-stagger');
        } else {
          el.classList.add('scroll-stagger');
        }
      }
    });

    observe();
  }

  function observe() {
    var reveals = document.querySelectorAll('.scroll-reveal');
    var staggers = document.querySelectorAll('.scroll-stagger');

    var revealObserver = new IntersectionObserver(
      function (items) {
        items.forEach(function (item) {
          if (item.isIntersecting) {
            item.target.classList.add('is-visible');
          } else {
            item.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    var staggerObserver = new IntersectionObserver(
      function (items) {
        items.forEach(function (item) {
          if (item.isIntersecting) {
            item.target.classList.add('is-visible');
          } else {
            item.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) { revealObserver.observe(el); });
    staggers.forEach(function (el) { staggerObserver.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
