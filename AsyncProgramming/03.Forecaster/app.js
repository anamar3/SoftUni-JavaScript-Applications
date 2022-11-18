function attachEvents() {
    let inputEl = document.getElementById('location');
    let buttonSub = document.getElementById('submit');
    let currentEl = document.getElementById('current');
    let forecastEl = document.getElementById('forecast');
    let upcomingEl = document.getElementById('upcoming');
    let divElInfo = document.createElement('div');
divElInfo.classList.add('forecast-info');
upcomingEl.appendChild(divElInfo);
let symbols = {
    "Sunny": `&#x2600`,

 "Partly sunny": `&#x26C5`,

"Overcast": `&#x2601`,

 "Rain": `&#x2614`,

"Degrees": `&#176`, 
}
const urlLoc = ` http://localhost:3030/jsonstore/forecaster/locations`;

buttonSub.addEventListener('click',async (e)=>{

        const res = await fetch(urlLoc);
        const data = await res.json();
 

    let pickedCityName;
    let pickedCityCode;
    console.log(data);
    for (const city of data) {
        console.log(city.name)
        if(city.name == inputEl.value){
pickedCityName = city.name;
pickedCityCode = city.code;
        }
    }
    const urlCurrConditions = `http://localhost:3030/jsonstore/forecaster/today/${pickedCityCode}`;
   const url3daysForecast = `http://localhost:3030/jsonstore/forecaster/upcoming/${pickedCityCode}`;
    const res2 = await fetch(urlCurrConditions);
    const data2 = await res2.json();
    
    const res3 = await fetch(url3daysForecast);
    const data3 = await res3.json();
    console.log(data3);
    let theNameAndCountry = data2.name;
    let weather = data2.forecast.condition;
    let high = data2.forecast.high;
    let low = data2.forecast.low;


currentEl.innerHTML = `<div class="label">Current conditions</div>
                            <div class="forecasts">
                            <span class="symbol">${symbols[weather]}</span>
                            <span class="condition">
                            <span class="forecast-data">${theNameAndCountry}</span>
                            <span class="forecast-data">${low}${symbols["Degrees"]}/${high}${symbols["Degrees"]}</span>
                            <span class="forecast-data">${weather}</span>
                            </span>
                            </div>`
forecastEl.style.display = 'block';

divElInfo.innerHTML = '';
for (const day of data3.forecast) {
    divElInfo.innerHTML+=`<span class="upcoming">
                            <span class="symbol">${symbols[day.condition]}</span>
                             <span class="forecast-data">${day.low}${symbols["Degrees"]}/${day.high}${symbols["Degrees"]}</span>
                             <span class="forecast-data">${day.condition}</span>
                             </span>`
}
})
}

attachEvents();