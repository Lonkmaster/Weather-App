import {dom, } from "./dom"

async function fetchWeather(url) {
    let response = await fetch(url, {mode: "cors"});
    let data = await response.json();
    let weatherInfo = new weatherData(data);
    console.log(data);
    console.log(weatherInfo);
    weeklyWeather(weatherInfo);
    return weatherInfo;
}

function weeklyWeather(data) {
    let dayCount = data.days;
    let todaysIcon = document.querySelector("todaysIcon");
    dom.weekForecast.innerHTML = "";
    console.log(data.icon);
    for (let i = 1; i < 8; i++) {
        let findDate = getDate(data.days[i].datetime);
        let infoDiv = document.createElement("div");
        let weekTemp = document.createElement("div");
        let weekBody = document.createElement("div");
        let weekDate = document.createElement("div");
        

        infoDiv.classList.add("weekCardContainer");
        weekTemp.classList.add("weekTemp");
        weekBody.classList.add("weekDescription");
        weekDate.classList.add("weekDate");

        dom.weekForecast.appendChild(infoDiv);
        infoDiv.appendChild(weekTemp);
        infoDiv.appendChild(weekBody);
        infoDiv.appendChild(weekDate);
        

        weekTemp.textContent = `${dayCount[i].feelslike}°F`;
        weekBody.textContent = `${dayCount[i].description}`;
        weekDate.textContent = `${findDate.day} ${findDate.month}, ${findDate.weekday}`;
        // console.log(dayCount[i]);
        // console.log(findDate);
    }
}

function displayIcon(iconInfo, img) {
    let imageContainer = document.querySelector(".todaysIcon");
    let imageIcon = document.createElement("img");
    let imageAddText = document.createElement("div");
    
    imageIcon.classList.add("weatherIcon");
    imageAddText.classList.add("imageText");

    for(let i = imageContainer.children.length-1; i >= 0; i--) {
        imageContainer.removeChild(imageContainer.children[i]);
    }

    imageContainer.appendChild(imageIcon);
    imageContainer.appendChild(imageAddText);
    
    import(`../Images/${iconInfo}.png`).then((photo) => {
        imageIcon.setAttribute("src", photo.default);
        imageAddText.textContent = iconInfo.split(`-`).map(word => word[0].toUpperCase() + word.slice(1)).join(` `)
    })
}

function weatherData(data) {
    this.resolvedAddress = data.resolvedAddress;
    this.address = data.address;
    this.description = data.description;
    this.conditions = data.currentConditions.conditions;
    this.days = data.days;
    this.humidity = data.currentConditions.humidity;
    this.address = data.address;
    this.temp = data.currentConditions.temp;
    this.today = getDate(data.days[0].datetime);
    this.windspeed = data.currentConditions.windspeed;
    this.precipprob = data.currentConditions.precipprob;
    this.feelslike = data.currentConditions.feelslike;
    this.windspeed = data.days[0].windspeed;
    this.icon = data.currentConditions.icon;
    
    displayIcon(this.icon);
    windSpeedInfo(this.windspeed);
    humidityInfo(this.humidity);
    feelsLikeTemp(this.feelslike);
    extraInfoRain(this.precipprob);
}


function windSpeedInfo(windSpeed) {
    dom.windSpeed.children[1].textContent = `${windSpeed} mph`;
    dom.windSpeed.lastElementChild.innerHTML = `Wind Speeds daily Values <br>are the maximum hourly value`;
}

function humidityInfo(humidity) {
    dom.humidity.children[1].textContent = `${humidity}%`
    dom.humidity.lastElementChild.textContent = "Relative humidity in %";
}

function extraInfoRain(rainChance) {
    if (rainChance >= 65) {
        dom.rainChance.lastElementChild.textContent = "Bring an umbrella";
        dom.rainChance.children[1].textContent = `${rainChance}%`;
    } else if (rainChance >= 40) {
        dom.rainChance.lastElementChild.textContent = "Maybe Bring an umbrella";
        dom.rainChance.children[1].textContent = `${rainChance}%`;
    } else if (rainChance <= 15) {
        dom.rainChance.lastElementChild.textContent = "No need for umbrella";
        dom.rainChance.children[1].textContent = `${rainChance}%`;
    } else {
        dom.rainChance.lastElementChild.textContent = "Consider an umbrella";
        dom.rainChance.children[1].textContent = `${rainChance}%`;
    }
}

function feelsLikeTemp(feelTemp) {
    if (feelTemp >= 80) {
        dom.feelsLike.lastElementChild.textContent = "Its hot out today";
        dom.feelsLike.children[1].textContent = `${feelTemp}°F`;
    } else if (feelTemp  >= 70) {
        dom.feelsLike.lastElementChild.textContent = "Its warm out today";
        dom.feelsLike.children[1].textContent = `${feelTemp}°F`;
    } else if (feelTemp >= 50) {
        dom.feelsLike.lastElementChild.textContent = "Its cool out today";
        dom.feelsLike.children[1].textContent = `${feelTemp}°F`;
    } else if (feelTemp >= 30) {
        dom.feelsLike.children[1].textContent = `${feelTemp}°F`;
        dom.feelsLike.lastElementChild.textContent = "Bring a jacket";
    } else if (feelTemp <= 10) {
        dom.feelsLike.children[1].textContent = `${feelTemp}°F`;
        dom.feelsLike.lastElementChild.textContent = "Get a coat";
    }

}

function getDate(datetime) {
    let date = datetime;
    let month = +date.slice(5, 7);
    let year = +date.slice(0, 4);
    let day = +date.slice(8, 12);
    
    let options = {weekday: "long", month:"long",};
    let today = new Date(year, month - 1, day);
    let formattedDate = today.toLocaleDateString("en-US", options);

    return {
        day,
        year,
        weekday: formattedDate.slice(4),
        month: formattedDate.slice(0, 3),
    }
}

export {fetchWeather, getDate,}
