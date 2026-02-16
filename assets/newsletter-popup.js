/**
 * Newsletter Popup
 * Handles showing/hiding the popup with configurable delay and session persistence.
 */
(function () {
  const STORAGE_KEY = 'newsletter_popup_dismissed';

  function init() {
    const overlay = document.getElementById('NewsletterPopup');
    if (!overlay) return;

    const delay = parseInt(overlay.dataset.delay, 10) || 3;
    const showOnce = overlay.dataset.showOnce === 'true';

    // Check if already dismissed in this session
    if (showOnce && sessionStorage.getItem(STORAGE_KEY)) return;

    // Show popup after delay
    setTimeout(function () {
      openPopup(overlay);
    }, delay * 1000);

    // Close handlers
    const closeBtn = overlay.querySelector('.newsletter-popup__close');
    const dismissBtn = overlay.querySelector('[data-close-popup]');

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closePopup(overlay);
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        closePopup(overlay);
      });
    }

    // Close on overlay click (outside the popup)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closePopup(overlay);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        closePopup(overlay);
      }
    });
  }

  function openPopup(overlay) {
    overlay.style.display = 'flex';
    // Force reflow before adding animation class
    overlay.offsetHeight;
    overlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup(overlay) {
    overlay.classList.remove('is-active');
    document.body.style.overflow = '';
    sessionStorage.setItem(STORAGE_KEY, '1');

    // Wait for animation to complete before hiding
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 350);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
