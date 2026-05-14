(function () {
  const form = document.querySelector('[data-job-apply-form]');
  if (!form) return;

  const successEl = form.querySelector('[data-job-apply-success]');
  const errorEl = form.querySelector('[data-job-apply-error]');
  const submitButton = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('input, textarea, button');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    successEl?.setAttribute('hidden', '');
    errorEl?.setAttribute('hidden', '');
    inputs.forEach((el) => (el.disabled = true));
    const originalLabel = submitButton.textContent;
    submitButton.textContent = '…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        successEl?.removeAttribute('hidden');
        successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const data = await response.json().catch(() => ({}));
        if (errorEl && data?.errors?.length) {
          errorEl.textContent = data.errors.map((e) => e.message).join(' ');
        }
        errorEl?.removeAttribute('hidden');
      }
    } catch (e) {
      errorEl?.removeAttribute('hidden');
    } finally {
      inputs.forEach((el) => (el.disabled = false));
      submitButton.textContent = originalLabel;
    }
  });
})();
