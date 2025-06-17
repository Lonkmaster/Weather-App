import { dom, displayData } from "./dom";
import { fetchWeather, weeklyWeather } from "./weatherGrab";


function grabLocation() {
    let location = dom.searchValue;
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=HCZW4FSMB29DJKFYETJTNW5NX&iconSet=icons1`;
    return url;
}

async function firstTimeLoad() {
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Canada/?key=HCZW4FSMB29DJKFYETJTNW5NX`;
    let weather = await fetchWeather(url);
    displayData(weather);
    let loadScreen = document.querySelector("#loadScreen");
    loadScreen.dataset.active = "nofade";
    setTimeout(() => {
        loadScreen.dataset.active = "fade";
        setTimeout(() => {
            loadScreen.remove();
        },1100);
    },600);
}

const buttonSetup = () => {
    dom.locationBar.addEventListener("submit", async (event) => {
        dom.searchValue = dom.searchBar.value;
        dom.searchBar.value = "";
        event.preventDefault();
        let weather = await fetchWeather(grabLocation());
        displayData(weather);
    });
}


export {buttonSetup, grabLocation, firstTimeLoad,}
