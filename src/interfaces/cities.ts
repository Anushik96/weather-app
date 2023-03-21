import { Action } from "redux";
import { AxiosError } from 'axios'
import CitiesTypeKeys from "../store/types/citiesTypes";

export interface ICity {
    name: string
    local_names: Object
    lat: number
    lon: number
    country: string
    state: string
}

export interface IFetchCitiesSucessAction
	extends Action<CitiesTypeKeys.GET_CITIES_SUCCESS> {
    cities: ICity
}

export interface IFetchCitiesErrorAction
	extends Action<CitiesTypeKeys.GET_CITIES_FAIL> {
	error: AxiosError,
    cities: ICity
}

export interface ICityState {
	fetching: boolean
	cities: ICity
	error?: AxiosError
}