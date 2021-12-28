import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    geometries: 'geojson',
    language: 'es',
    overview: 'full',
    steps: false,
    access_token: import.meta.env.VITE_TOKEN_MAPBOX
  }
})
