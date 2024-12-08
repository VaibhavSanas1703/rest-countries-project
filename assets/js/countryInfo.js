
const countryName = new URLSearchParams(location.search).get('name');
const backBtn = document.querySelector('.back-button span');
const countryText = document.querySelector('#textofCountry');
const countryInfoContainer = document.querySelector('.country-info-container');
document.title = `Details of ${countryName}` 

const countryFlag = document.querySelector('#country-flag')
const countryInfoName = document.querySelector('#countryName');
const nativeNameInfo = document.querySelector('#nativeName');
const populationInfo = document.querySelector('#population');
const regionInfo = document.querySelector('#region');
const subregionInfo = document.querySelector('#subregion');
const capitalInfo = document.querySelector('#capital');
const tldInfo = document.querySelector("#tld");
const currInfo = document.querySelector('#curr');
const languagesInfo = document.querySelector('#lang')

countryText.innerHTML = `Country / ${countryName}`
backBtn.addEventListener('click',() => {
     history.back()
})

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => {
     return res.json()
})
.then(([country]) => { 
     console.log(country);
     countryInfoName.innerHTML = country.name.common;
     countryFlag.src = country.flags.svg
     populationInfo.innerHTML = country.population.toLocaleString('en-IN')
     regionInfo.innerHTML = country.region;
     subregionInfo.innerHTML = country.subregion;
     capitalInfo.innerHTML = country.capital?.[0];
     tldInfo.innerHTML = country.tld.join(', ');

     if(country.name.nativeName){
          nativeNameInfo.innerHTML = Object.values(country.name.nativeName)[0].common;
     }
     else{
          nativeNameInfo.innerHTML = country.name.common;
     }

     if(country.currencies){
          currInfo.innerHTML = Object.values(country.currencies).map((currency) => currency.name).join(', ')
     }

     if(country.languages){
          languagesInfo.innerHTML = Object.values(country.languages).join(', ')
     }
})