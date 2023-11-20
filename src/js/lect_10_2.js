const elements = {
    form: document.querySelector('.js-search'),
    formContainer: document.querySelector('.js-form-container'),
    list: document.querySelector('.js-list'),
    addField: document.querySelector('.js-add'),
    removeField: document.querySelector('.js-remove'),
}

const f = document.querySelector('.js-add');



console.log(f);
console.log(elements.form);
console.log(elements.addField);
elements.addField.addEventListener('click', handlerAddField);
elements.removeField.addEventListener('click', handlerRemoveField)

function handlerAddField() {
    elements.formContainer.insertAdjacentHTML('beforeend',
        '<input type="text" name="country" />')
}

function handlerRemoveField() {
    const CountriesQty = elements.formContainer.children.length;
    if (CountriesQty === 1) {
        return
    }
    CountriesQty -= 1;
}

