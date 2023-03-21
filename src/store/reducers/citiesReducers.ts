import { Reducer } from 'react'
import { citiesActions} from '../actions/citiesAction'
import CitiesTypeKeys from '../types/citiesTypes'
import { ICity, ICityState } from '../../interfaces/cities'

const initialCityState = {
	fetching: false,
	cities: {} as ICity
}

const citiesReducer: Reducer<ICityState, citiesActions> = (
	state = initialCityState,
	action
) => {
	switch (action.type) {
		case CitiesTypeKeys.GET_CITIES_SUCCESS:
			return {
				...state,
				fetching: false,
				cities: action.cities
			} as ICityState
		case CitiesTypeKeys.GET_CITIES_FAIL:
			return {
				...state,
				fetching: false,
				error: action.error
			} as ICityState
		default:
			return state
	}
}

export default citiesReducer
