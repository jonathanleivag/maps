import mapboxgl from 'mapbox-gl'
import { MutationTree } from 'vuex'
import { Feature } from '../../../interfaces'
import { MapStateInterface } from './state'

export interface DurationDistanceInterface {
  duration: number
  distance: number
}

const mutation: MutationTree<MapStateInterface> = {
  setMap (state, map: mapboxgl.Map) {
    state.map = map
  },
  setPlacesMarker (state, places: Feature[]) {
    state.marker.forEach(marker => marker.remove())
    state.marker = []
    if (!state.map) return
    for (const place of places) {
      const popup = new mapboxgl.Popup().setLngLat(
        place.center as mapboxgl.LngLatLike
      ).setHTML(/* html */ `
        <h4> ${place.text_es} </h4>
        <p> ${place.place_name_es} </p>
      `)

      const marker = new mapboxgl.Marker()
        .setLngLat(place.center as mapboxgl.LngLatLike)
        .setPopup(popup)
        .addTo(state.map)

      state.marker = [...state.marker, marker]
    }

    if (state.map?.getLayer('RouterString')) {
      state.map.removeLayer('RouterString')
      state.map.removeSource('RouterString')
      state.distance = undefined
      state.duration = undefined
    }
  },
  setRouterPolyline (state, coords: number[][]) {
    const start = coords[0]
    const end = coords[coords.length - 1]
    const bounds = new mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    )
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }
    state.map?.fitBounds(bounds, { padding: 200 })
    const sourceData: mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: coords }
          }
        ]
      }
    }

    if (state.map?.getLayer('RouterString')) {
      state.map.removeLayer('RouterString')
      state.map.removeSource('RouterString')
    }

    state.map?.addSource('RouterString', sourceData)

    state.map?.addLayer({
      id: 'RouterString',
      type: 'line',
      source: 'RouterString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  },
  setDistanceDuration (state, { duration, distance }: DurationDistanceInterface) {
    let kms = distance / 100
    kms = Math.round(kms * 100)
    kms /= 100

    state.distance = kms
    state.duration = Math.floor(duration / 60)
  }
}

export default mutation
