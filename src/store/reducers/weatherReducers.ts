import { Reducer } from 'react'
import { weatherActions } from '../actions/weatherActions'
import { ICurrentWeather } from '../../interfaces/weather'
import WeatherTypeKeys from '../types/weatherTypes'
import { IWeaterState } from '../../interfaces/weather'


const initialWeatherState = {
	fetching: false,
	currentWeather: {} as ICurrentWeather,
}

const weatherReducer: Reducer<IWeaterState, weatherActions> = (
	state = initialWeatherState,
	action
) => {
	switch (action.type) {
		case WeatherTypeKeys.GET_WEATHER_SUCCESS:            
			return {
				...state,
				fetching: false,
				currentWeather: {
					weather: action.currentWeather.weather,
					forecast: action.currentWeather.forecast
				}
			} as IWeaterState
		case WeatherTypeKeys.GET_WEATHER_FAIL:
			return {
				...state,
				fetching: false,
				error: action.error
			} as IWeaterState
		default:
			return state
	}
}

export default weatherReducer
