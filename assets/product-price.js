import { ThemeEvents, VariantUpdateEvent } from '@theme/events';

/**
 * Formats a price in cents using a Shopify money format string.
 * @param {number} cents - The price in cents.
 * @param {string} moneyFormat - The Shopify money format string (e.g. "${{amount}}").
 * @returns {string} The formatted price.
 */
function formatMoney(cents, moneyFormat) {
  const amount = (cents / 100).toFixed(2);
  const amountNoDecimals = Math.round(cents / 100).toString();
  const parts = amount.split('.');
  const dollars = parts[0] || '0';
  const centsPart = parts[1] || '00';

  // Add thousands separators
  const withCommas = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const withPeriods = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const withSpaces = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const withApostrophes = dollars.replace(/\B(?=(\d{3})+(?!\d))/g, "'");

  return moneyFormat
    .replace(/{{\s*amount_with_apostrophe_separator\s*}}/g, `${withApostrophes}.${centsPart}`)
    .replace(/{{\s*amount_with_period_and_space_separator\s*}}/g, `${withSpaces}.${centsPart}`)
    .replace(/{{\s*amount_with_space_separator\s*}}/g, `${withSpaces},${centsPart}`)
    .replace(/{{\s*amount_with_comma_separator\s*}}/g, `${withPeriods},${centsPart}`)
    .replace(/{{\s*amount_no_decimals_with_space_separator\s*}}/g, withSpaces)
    .replace(/{{\s*amount_no_decimals_with_comma_separator\s*}}/g, withPeriods)
    .replace(/{{\s*amount_no_decimals\s*}}/g, amountNoDecimals)
    .replace(/{{\s*amount\s*}}/g, `${withCommas}.${centsPart}`);
}

/**
 * A custom element that displays a product price.
 * This component listens for variant update events and updates the price display accordingly.
 * It handles price updates from two different sources:
 * 1. Variant picker (in quick add modal or product page)
 * 2. Swatches variant picker (in product cards)
 */
class ProductPrice extends HTMLElement {
  /** @type {{ moneyFormat: string, showSalePriceFirst: boolean, variants: Record<string, { price: number, compareAtPrice: number | null, available: boolean }> } | null} */
  #variantPrices = null;

  connectedCallback() {
    const closestSection = this.closest('.shopify-section, dialog');
    if (!closestSection) return;
    closestSection.addEventListener(ThemeEvents.variantUpdate, this.updatePrice);

    // Parse variant prices data for client-side updates
    const priceDataScript = this.querySelector('script[data-variant-prices]');
    if (priceDataScript?.textContent) {
      try {
        this.#variantPrices = JSON.parse(priceDataScript.textContent);
      } catch {
        // Ignore parse errors
      }
    }
  }

  disconnectedCallback() {
    const closestSection = this.closest('.shopify-section, dialog');
    if (!closestSection) return;
    closestSection.removeEventListener(ThemeEvents.variantUpdate, this.updatePrice);
  }

  /**
   * Updates the price and volume pricing note.
   * @param {VariantUpdateEvent} event - The variant update event.
   */
  updatePrice = (event) => {
    if (event.detail.data.newProduct) {
      this.dataset.productId = event.detail.data.newProduct.id;
    } else if (event.target instanceof HTMLElement && event.target.dataset.productId !== this.dataset.productId) {
      return;
    }

    // Try HTML-based update first (server-rendered, most accurate)
    const newProductPrice = event.detail.data.html.querySelector(`product-price[data-block-id="${this.dataset.blockId}"]`);
    if (newProductPrice) {
      // Update price container
      const newPrice = newProductPrice.querySelector('[ref="priceContainer"]');
      const currentPrice = this.querySelector('[ref="priceContainer"]');
      if (newPrice && currentPrice) currentPrice.replaceWith(newPrice);

      // Update volume pricing note
      const currentNote = this.querySelector('.volume-pricing-note');
      const newNote = newProductPrice.querySelector('.volume-pricing-note');

      if (!newNote) {
        currentNote?.remove();
      } else if (!currentNote) {
        this.querySelector('[ref="priceContainer"]')?.insertAdjacentElement('afterend', /** @type {Element} */ (newNote.cloneNode(true)));
      } else {
        currentNote.replaceWith(newNote);
      }

      // Update variant prices data from the new HTML
      const newPriceDataScript = newProductPrice.querySelector('script[data-variant-prices]');
      if (newPriceDataScript?.textContent) {
        try {
          this.#variantPrices = JSON.parse(newPriceDataScript.textContent);
        } catch {
          // Ignore parse errors
        }
      }
      return;
    }

    // Fallback: use variant data from event to update price client-side
    this.#updatePriceFromVariant(event.detail.resource);
  };

  /**
   * Updates the price display using variant data directly (client-side formatting).
   * @param {Object | null} variant - The variant object from the event.
   */
  #updatePriceFromVariant(variant) {
    if (!variant || !this.#variantPrices) return;

    const priceContainer = this.querySelector('[ref="priceContainer"]');
    if (!priceContainer) return;

    const { moneyFormat, showSalePriceFirst } = this.#variantPrices;
    const price = variant.price;
    const compareAtPrice = variant.compare_at_price;

    if (price == null) return;

    const formattedPrice = formatMoney(price, moneyFormat);
    const showComparePrice = compareAtPrice != null && compareAtPrice > price;
    const formattedCompareAt = showComparePrice ? formatMoney(compareAtPrice, moneyFormat) : '';

    let html = '';

    if (showComparePrice) {
      if (!showSalePriceFirst) {
        html += `<span role="group"><span class="compare-at-price">${formattedCompareAt}</span></span>`;
      }
      html += `<span role="group"><span class="price">${formattedPrice}</span></span>`;
      if (showSalePriceFirst) {
        html += `<span role="group"><span class="compare-at-price">${formattedCompareAt}</span></span>`;
      }
    } else {
      html = `<span class="price">${formattedPrice}</span>`;
    }

    // Create a new price container to replace the current one
    const newContainer = document.createElement('div');
    newContainer.setAttribute('ref', 'priceContainer');
    newContainer.innerHTML = html;
    priceContainer.replaceWith(newContainer);

    // Remove volume pricing note when using fallback
    const currentNote = this.querySelector('.volume-pricing-note');
    currentNote?.remove();
  }
}

if (!customElements.get('product-price')) {
  customElements.define('product-price', ProductPrice);
}
