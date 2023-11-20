const elements = {
    form: document.querySelector('.js-search'),
    formContainer: document.querySelector('.js-form-container'),
    list: document.querySelector('.js-list'),
    addField: document.querySelector('.js-add'),
    removeField: document.querySelector('.js-remove'),
}

const f = document.querySelector('.js-add');

elements.addField.addEventListener('click', handlerAddField);
elements.removeField.addEventListener('click', handlerRemoveField)

function handlerAddField() {
    elements.formContainer.insertAdjacentHTML('beforeend',
        '<input type="text" name="country" />')
}

function handlerRemoveField() {
    let { children, lastElementChild } = elements.formContainer;
    if (children.length === 1) {
        return
    }
    lastElementChild.remove();
}

elements.form.addEventListener('submit', handlerSearch);

async function handlerSearch(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const countries = formData.getAll('country')
    const capitals = await serviceGetCountries(countries);
    const weather = await serviceGetWeather(capitals)

    elements.list.innerHTML = createMarkup(weather);

}

async function serviceGetCountries(arr) {
    const promisses = arr.map(async country => {
        const resp = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        if (!resp.ok) {
            throw new Error(resp.statusText)
        }

        return resp.json();
    });

    const data = await Promise.allSettled(promisses)
    return data
        .filter(({ status }) => status === "fulfilled")
        .map(({ value }) => value[0].capital[0]);
}

async function serviceGetWeather(arr) {
    const API_KEY = '61069fb8abf74210b7d232148231510'
    const BASE_URL = 'http://api.weatherapi.com/v1'
    const END_POINT = "/current.json";

    const promisses = arr.map(async (capital) => {
        const params = new URLSearchParams({
            key: API_KEY,
            q: capital,
            lang: 'uk'
        })
 
        const resp = await fetch(`${BASE_URL}${END_POINT}?${params}`)
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
        return resp.json();
    });
    const data = await Promise.allSettled(promisses);
    return data.filter(({ status }) => status === 'fulfilled')
        .map(
            ({
                value: {
                    location: { country, name },
                    current: {
                        temp_c,
                        condition: { icon, text },
                    }
                }
            }) => {
            return { country, name, temp_c, icon, text };
        }
        );
}

function createMarkup(arr) {
    return arr
        .map(({ country, name, temp_c, icon, text }) => `
            <li>
                <img src='${icon}' alt='${text}' />
                <h2>${country}</h2>
                <h2>${name}</h2>
                <p>${text}</p>
                <p class="temp">${temp_c} ˚C</p>
            </li>
        `)
        .join(''); 
}
 