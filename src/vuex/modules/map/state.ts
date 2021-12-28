import mapboxgl from 'mapbox-gl'

export interface MapStateInterface {
  map?: mapboxgl.Map
  marker: mapboxgl.Marker[]
  distance?: number
  duration?: number
}

function state (): MapStateInterface {
  return {
    map: undefined,
    marker: [],
    distance: undefined,
    duration: undefined
  }
}

export default state
