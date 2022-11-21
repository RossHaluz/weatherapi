import './css/styles.css';
import Notiflix from 'notiflix';

const form = document.querySelector('.js-search');
const list = document.querySelector('.list')

form.addEventListener('submit', onSearchForm)

const DEBOUNCE_DELAY = 300;
const BASE_URL = "https://api.weatherapi.com/v1";
const KEY = "59dd275128be4309bea171611222011";

function onSearchForm(evt) {
    evt.preventDefault()
    const {
        days: {
            value: daysSearch
        },
        query: {
            value: inputSearch
        }
    } = evt.currentTarget.elements

    forecastApi(inputSearch, daysSearch).then(data => renderMarkup(data.forecast.forecastday))
}

function renderMarkup(arr) {
    const markup =  arr.map(country => 
        `
    <li>
      <img src="${country.day.condition.icon}" alt="${country.day.condition.text}" />
      <h3>Погода: ${country.day.condition.text}</h3>
      <p>Температура: ${country.day.avgtemp_c}&#8451;</p>
      <p>Схід сонця: ${country.astro.sunrise}</p>
      <p>Захід сонця: ${country.astro.sunset}&#8451;</p>
      <p>Дата: ${country.date}</p>
    </li>
    `).join('')
    list.innerHTML = markup;
}

function forecastApi(name = "Kiev", days = 7) {
    return fetch(`${BASE_URL}/forecast.json?key=${KEY}&q=${name}&days=${days}`).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    }).catch(err => console.error(err))
}
