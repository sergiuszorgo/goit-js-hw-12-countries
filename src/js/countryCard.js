import refs from './refs.js';
import country from '../templates/country.hbs';
import listOfCountry from '../templates/listOfCountry.hbs';
import { debounce } from 'debounce';
import countryRef from './countryRef.js';
import errorKit from './notifications.js';

refs.input.addEventListener('input', debounce(inputSearch, 500));

function inputSearch() {
  refs.countryList.innerHTML = '';
  refs.countryBlock.innerHTML = '';
  getCountries()
}

function getCountries() {
    const inputValue = refs.input.value;
    // console.log(inputValue);
    if (inputValue === '') {
        errorKit.errorSintaxis();
        return;
    }
    countryRef(inputValue).then(countryCard).catch(errorKit.errorNFound);
}

function countryCard(traceCountry) {
    if (traceCountry.length > 1 && traceCountry.length <= 10) {
        traceCountry.map(countryMap =>
        refs.countryList.insertAdjacentHTML('afterbegin', listOfCountry(countryMap)));
        return;
    }
    if (traceCountry.length > 10) {
        errorKit.errorMsg();
        return;
    }
    if (traceCountry.length < 2 && traceCountry.length !== 0) {
        const nameOfCountry = country(traceCountry[0]);
        refs.countryBlock.insertAdjacentHTML('afterbegin', nameOfCountry);
    }
}