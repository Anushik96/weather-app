import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AxiosError } from 'axios'
import axios from 'axios'
import CitiesTypeKeys from '../types/citiesTypes'
import { GEO_API_URL, API_KEY } from '../../api'
import { 
	ICity, 
	IFetchCitiesErrorAction,
	IFetchCitiesSucessAction,
 } from '../../interfaces/cities'

// Action types
export type citiesActions =
	| IFetchCitiesSucessAction
	| IFetchCitiesErrorAction

// Action Creator
export const getCitiesActionCreator: ActionCreator<
	ThunkAction<
		Promise<IFetchCitiesSucessAction | IFetchCitiesErrorAction>,
		ICity[],
		null,
		IFetchCitiesSucessAction
	>
> = (cityName: string) => async (dispatch: Dispatch) => {
	try {
		// Try to fetch a cities, and set in state
		const { data } = await axios.get(`${GEO_API_URL}/direct?q=${cityName}&limit=1&appid=${API_KEY}`)

        const cities = data;

		const fetchCitiesSuccessAction: IFetchCitiesSucessAction = {
			type: CitiesTypeKeys.GET_CITIES_SUCCESS,
			cities: cities[0]
		}

		return dispatch(fetchCitiesSuccessAction)
	} catch (error) {
		// Catch error fetching cities and set in redux
		const axiosError = error as AxiosError
		const fetchCitiesErrorAction: IFetchCitiesErrorAction = {
			type: CitiesTypeKeys.GET_CITIES_FAIL,
			error: axiosError,
            cities: {} as ICity
		}
		return dispatch(fetchCitiesErrorAction)
	}
}