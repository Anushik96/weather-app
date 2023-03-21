import { ICityState } from "./cities"
import { IWeaterState } from "./weather"

export interface searchData {
    value: string,
    label: string
  }
  
export interface IRootState {
  cities: ICityState,
  currentWeather: IWeaterState
}  