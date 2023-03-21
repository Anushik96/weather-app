import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ICurrentWeather, IWeather, IWeatherForecast } from '../../interfaces/weather'
import axios, { AxiosError } from 'axios'
import WeatherTypeKeys from '../types/weatherTypes'
import { WEATHER_API_URL, API_KEY } from '../../api'
import { IFetchWeatherErrorAction, IFetchWeatherSucessAction } from '../../interfaces/weather'
import { useDailyForecastReducer } from '../../hooks/weatherHook'
// Action types
export type weatherActions =
	| IFetchWeatherSucessAction
	| IFetchWeatherErrorAction

// Action Creator
export const getCurrentWeatherActionCreator : ActionCreator<
	ThunkAction<
		Promise<IFetchWeatherSucessAction | IFetchWeatherErrorAction>,
		ICurrentWeather,
		null,
		IFetchWeatherSucessAction
	>
> = (payload) => async (dispatch: Dispatch) => {
	try {
		// Try to fetch a Weather, and set in state
		
        const { data: weatherData } = await axios.post(`${WEATHER_API_URL}/weather?lat=${payload.lat}&lon=${payload.lon}&appid=${API_KEY}&units=${payload.units}`);
        const { data: forecastData } = await axios.post(`${WEATHER_API_URL}/forecast?lat=${payload.lat}&lon=${payload.lon}&appid=${API_KEY}&units=${payload.units}`)

		const dayliForecast: IWeatherForecast[] = useDailyForecastReducer(forecastData);

		const fetchWeatherSuccessAction: IFetchWeatherSucessAction = {
			type: WeatherTypeKeys.GET_WEATHER_SUCCESS,
			currentWeather: { 
				weather: weatherData,
				forecast: dayliForecast
			}
		}			
		return dispatch(fetchWeatherSuccessAction)
	} catch (error) {
		// Catch error fetching weather and set in redux
		const axiosError = error as AxiosError
		const fetchWeatherErrorAction: IFetchWeatherErrorAction = {
			type: WeatherTypeKeys.GET_WEATHER_FAIL,
			error: axiosError,
            currentWeather: {
				weather: {} as IWeather,
				forecast: {} as IWeatherForecast[]
			}
		}
		return dispatch(fetchWeatherErrorAction)
	}
}