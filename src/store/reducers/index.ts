import { combineReducers } from 'redux'
import citiesReducer from './citiesReducers'
import weatherReducer from './weatherReducers'

const rootReducer = combineReducers({
	cities: citiesReducer,
	currentWeather: weatherReducer
})

// Note that we do not have to explicitly declare a new interface for AppState.
// We can use ReturnType to infer state shape from the rootReducer.
export type IAppState = ReturnType<typeof rootReducer>
export default rootReducer
