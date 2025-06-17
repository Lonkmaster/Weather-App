import { fetchWeather } from "./weatherGrab";
import { grabLocation } from "./api"

let dom = (() => {
    let dom = {};
    dom.searchValue = null;
    dom.searchBar = document.querySelector("#searchBar");
    dom.locationBar = document.querySelector("#locationBar");
    dom.mainWeatherDiv = document.querySelector(".mainWeatherDiv");
    dom.header = document.querySelector(".header");
    dom.dateText = document.querySelector(".dateText");
    dom.todayInfoGroup = document.querySelector(".todayInfoGroup");
    dom.dayTemp = document.querySelector(".dayTemp");
    dom.dayText = document.querySelector(".dayText");
    dom.todaysDescripton = document.querySelector(".todaysDescripton");
    dom.feelsLike = document.querySelector("#feelsLike");
    dom.rainChance = document.querySelector("#rainChance");
    dom.humidity = document.querySelector("#humidity");
    dom.windSpeed = document.querySelector("#windSpeed");
    dom.weekForecast = document.querySelector("#weekForecast");
    dom.dailyInfoDiv = document.querySelector(".dailyInfoDiv");
    return dom;
})();

let displayData = (weatherData) => {
    // Main Container
    dom.header.textContent = weatherData.resolvedAddress;
    dom.dateText.textContent = `${weatherData.today.day} ${weatherData.today.month}, ${weatherData.today.year}`;
    dom.dayTemp.textContent = `${weatherData.temp}°F`;
    dom.dayText.textContent = weatherData.today.weekday;
    dom.todaysDescripton.textContent = weatherData.description;
    
};

export {dom, displayData,}