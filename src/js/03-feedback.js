import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-form-stat';

const formData = {
    email: '',
    message: ''
};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea')
}

populateInput();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

function onFormSubmit(event) {
    event.preventDefault();

    console.log(formData);

    event.target.reset();

    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
}

function onInput(event) {
    
    formData[event.target.name] = event.target.value;
   
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
    const saveTextInput = JSON.parse(localStorage.getItem(STORAGE_KEY));
    
    if (saveTextInput) {
        refs.input.value = saveTextInput.email;
        refs.textarea.value = saveTextInput.message;
    }
}
