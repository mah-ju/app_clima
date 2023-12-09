const apiKey = "your_openweathermap_api_key"; 


const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search"); 

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherData = document.querySelector("#weather-data");

const getWeatherData = async(city) => {

const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
const res = await fetch(apiWeatherURL);
const data = await res.json();
return data;


}


const showWeatherData = async (city) => {

const data = await getWeatherData(city);
cityElement.textContent = data.name;
tempElement.textContent = parseInt(data.main.temp);
descElement.textContent = data.weather[0].description;
weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

const apiCountryURL = `https://flagsapi.com/${data.sys.country}/flat/64.png`;
countryElement.setAttribute("src", apiCountryURL);
humidityElement.textContent = `${data.main.humidity}%`;
windElement.textContent = `${data.wind.speed}km/h`;

weatherData.classList.remove("hide");

};



searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    const city = cityInput.value;
    showWeatherData(city);


});

cityInput.addEventListener("keyup", (e) =>{
    
if(e.code === "Enter"){
    const city = e.target.value;
    showWeatherData(city);
}

});

document.addEventListener("DOMContentLoaded", ()=>{

    cityInput.value = "";

});


