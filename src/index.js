import "./css/style.css"
import {dom} from "./modules/dom"
import {fetchWeather} from "./modules/weatherGrab"
import {buttonSetup, firstTimeLoad} from "./modules/api"

buttonSetup();
firstTimeLoad();
