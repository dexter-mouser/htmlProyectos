(function () {
  'use strict';

  const Mode = Object.freeze({ SIGN_IN: 'sign-in', SIGN_UP: 'sign-up' });
  const MIN_PASSWORD_LENGTH = 6;

  const panel = document.getElementById('authPanel');
  const slots = panel.querySelectorAll('[data-form]');
  const switchButtons = panel.querySelectorAll('[data-switch-to]');

  function setMode(mode) {
    panel.dataset.mode = mode;
    slots.forEach((slot) => {
      const isActive = slot.dataset.form === mode;
      slot.dataset.active = String(isActive);
      if (isActive) {
        const firstField = slot.querySelector('input');
        if (firstField) firstField.focus({ preventScroll: true });
      }
    });
  }

  switchButtons.forEach((button) => {
    button.addEventListener('click', () => setMode(button.dataset.switchTo));
  });

  function validateField(fieldEl) {
    const input = fieldEl.querySelector('input');
    const isValid = input.checkValidity()
      && (input.type !== 'password' || input.value.length >= MIN_PASSWORD_LENGTH);
    fieldEl.dataset.invalid = String(!isValid);
    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.querySelectorAll('.field');
    const statusEl = form.querySelector('[data-status]');

    let allValid = true;
    fields.forEach((field) => {
      const fieldIsValid = validateField(field);
      allValid = allValid && fieldIsValid;
    });

    statusEl.textContent = allValid
      ? 'Listo — datos válidos (demo sin backend).'
      : 'Revisa los campos marcados.';
  }

  document.getElementById('signInForm').addEventListener('submit', handleSubmit);
  document.getElementById('signUpForm').addEventListener('submit', handleSubmit);

  setMode(Mode.SIGN_IN);
})();
