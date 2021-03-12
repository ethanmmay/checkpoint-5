import Axios from 'axios'

export const baseURL = window.location.origin.includes('localhost') ? 'http://localhost:3000' : ''
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const blogApi = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/blogs',
  timeout: 10000
})

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function() {
  api.defaults.headers.authorization = ''
}
