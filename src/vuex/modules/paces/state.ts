import { Feature } from '../../../interfaces'

export interface PlacesInterface {
  isLoading: boolean
  useLocation?: [number, number]
  isLoadingPlaces: boolean
  places: Feature[]
}

function state (): PlacesInterface {
  return {
    isLoading: true,
    useLocation: undefined,
    isLoadingPlaces: false,
    places: []
  }
}

export default state
