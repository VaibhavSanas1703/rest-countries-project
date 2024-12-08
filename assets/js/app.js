
const countryContainer  = document.querySelector('.country-container');
const selectCountry = document.querySelector('#selectCountry');
const inputBox = document.querySelector('#input-box');
const searchList = document.querySelector('.search-list');

const renderAllCountries = () => {
     fetch('https://restcountries.com/v3.1/all')
     .then((res) => res.json())
     .then((data) => {
          setTimeout(() => {
               data.forEach((eachCountry) => {
                    const ancor = document.createElement('a');
                    ancor.href = `countryInfo.html?name=${eachCountry.name.common}`
                    ancor.innerHTML += `
                         <div class="flag-image">
                              <img src=${eachCountry.flags.svg} loading='lazy'>
                         </div>
                         <div class="content">
                              <h1>${eachCountry.name.common}</h1>
                              <div class="country-content flex">
                                   <p><b>Population : </b>${eachCountry.population.toLocaleString('en-IN')}</p>
                                   <p><b>Region : </b>${eachCountry.region}</p>
                                   <p><b>Capital : </b>${eachCountry.capital}</p>
                              </div>
                         </div>
                    `
                    countryContainer.append(ancor)
               })

               let allCountryNames = data.map((country) => {
                       return country.name.common;
               })
               displayAllCountries(allCountryNames.sort())
          }, 1000);
     })
}

const displayAllCountries = (allCountry) => {
     inputBox.addEventListener('keyup',(e) => {
          let inputValue = inputBox.value;
          let result = [];

          if(inputValue.length){
               result = allCountry.filter((keyword) => {
                    return keyword.toLowerCase().includes(inputValue.toLowerCase())
               })
          }

          displayAllSearchQuery(result)
     })

}

const displayAllSearchQuery = (result) => {
     const content = result.map((list) => {
          return "<li onclick='selectValue(this)'>" + list + "</li>"
     })

     if(inputBox.value.length){
          searchList.style.display = 'block'
          searchList.innerHTML = "<ul>" + content.join('') + "</ul>"
     }
     else{
          searchList.style.display = 'none'
     }    
}

const selectValue = (userSelectCountry) => {
     console.log(userSelectCountry.innerHTML);
     inputBox.value = userSelectCountry.innerHTML;
     searchList.style.display = 'none'
     setTimeout(() => {
     location.href = `countryInfo.html?name=${userSelectCountry.innerHTML}`
     inputBox.value = ''
     }, 500);
}


selectCountry.addEventListener('change',(e) => {
     fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
     .then((res) => res.json())
     .then((data) => {
          countryContainer.innerHTML = ''
          data.forEach((regionAll) => {
               const ancor = document.createElement('a');
               ancor.href = `countryInfo.html?name=${regionAll.name.common}`
               ancor.innerHTML += `
                    <div class="flag-image">
                         <img src=${regionAll.flags.svg} loading='lazy'>
                    </div>
                    <div class="content">
                         <h1>${regionAll.name.common}</h1>
                         <div class="country-content flex">
                              <p><b>Population : </b>${regionAll.population.toLocaleString('en-IN')}</p>
                              <p><b>Region : </b>${regionAll.region}</p>
                              <p><b>Capital : </b>${regionAll.capital}</p>
                         </div>
                    </div>
               `
               countryContainer.append(ancor)
          })
     })

     if(selectCountry.firstChild){
          renderAllCountries();
     }
})

renderAllCountries()