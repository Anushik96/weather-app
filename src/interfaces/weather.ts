import { AxiosError } from "axios";
import WeatherTypeKeys from "../store/types/weatherTypes";
import { Action } from "@reduxjs/toolkit";

interface Coord {
    lon: number;
    lat: number;
}

interface WeatherType {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeather {
    coord: Coord;
    weather: WeatherType[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ICurrentWeather {
    weather: IWeather,
    forecast: IWeatherForecast[]
}

export interface IWeatherForecast {
    date: string
    maxTemp: number
    minTemp: number
    weatherDescription: string
    icon: string
}

export interface IFetchWeatherSucessAction
	extends Action<WeatherTypeKeys.GET_WEATHER_SUCCESS> {
	currentWeather: ICurrentWeather
}

export interface IFetchWeatherErrorAction
	extends Action<WeatherTypeKeys.GET_WEATHER_FAIL> {
	error: AxiosError,
    currentWeather: ICurrentWeather
}

export interface IWeaterState {
	fetching: boolean
	currentWeather: ICurrentWeather
	error?: AxiosError
}
