import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input');
const messageTextArea = document.querySelector('textarea');

const FEEDBACK_FORM_STATE_KEY = 'feedback-form-state';

const savedFormData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE_KEY));

const formData = {
  email: '',
  message: '',
};

const updateFormData = () => {
  formData.email = emailInput.value;
  formData.message = messageTextArea.value;

  try {
    localStorage.setItem(FEEDBACK_FORM_STATE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error while updating feedback form state:', error);
  }
};

const handleFormSubmit = event => {
  event.preventDefault();
  console.log(formData);
  try {
    localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
  } catch (error) {
    console.error('Error while removing feedback form state:', error);
  }
  event.currentTarget.reset();
};

const updateInputValues = () => {
  if (savedFormData) {
    emailInput.value = savedFormData?.email;
    messageTextArea.value = savedFormData?.message;
  }
};

const initForm = () => {
  updateInputValues();
  form.addEventListener('input', throttle(updateFormData, 500));
  form.addEventListener('submit', handleFormSubmit);
};

initForm();
