(function () {
  const form = document.querySelector('[data-job-apply-form]');
  if (!form) return;

  const successEl = form.querySelector('[data-job-apply-success]');
  const errorEl = form.querySelector('[data-job-apply-error]');
  const submitButton = form.querySelector('button[type="submit"]');
  const inputs = form.querySelectorAll('input, textarea, button');
  const phoneInput = form.querySelector('input[name="phone"]');
  const defaultErrorText = errorEl?.textContent.trim() || 'Something went wrong.';

  if (phoneInput) {
    const formatPhone = () => {
      const digits = phoneInput.value.replace(/\D/g, '').slice(0, 8);
      phoneInput.value = digits.length > 4 ? `${digits.slice(0, 4)}-${digits.slice(4)}` : digits;
    };
    phoneInput.addEventListener('input', formatPhone);
    phoneInput.addEventListener('blur', formatPhone);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    successEl?.setAttribute('hidden', '');
    errorEl?.setAttribute('hidden', '');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    inputs.forEach((el) => (el.disabled = true));
    const originalLabel = submitButton.textContent;
    submitButton.textContent = '…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      const data = await response.json().catch(() => ({}));
      const succeeded = response.ok && data?.success !== false;

      if (succeeded) {
        form.reset();
        successEl?.removeAttribute('hidden');
        successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        if (errorEl) {
          if (data?.message) {
            errorEl.textContent = data.message;
          } else if (data?.errors?.length) {
            errorEl.textContent = data.errors.map((e) => e.message).join(' ');
          } else if (data?.error) {
            errorEl.textContent = data.error;
          } else {
            errorEl.textContent = defaultErrorText;
          }
          errorEl.removeAttribute('hidden');
        }
      }
    } catch (e) {
      if (errorEl) {
        errorEl.textContent = defaultErrorText;
        errorEl.removeAttribute('hidden');
      }
    } finally {
      inputs.forEach((el) => (el.disabled = false));
      submitButton.textContent = originalLabel;
    }
  });
})();
