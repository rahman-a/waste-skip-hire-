import axios from 'axios'
import { skipsApi } from './skips'

export const remWasteApi = axios.create({
  baseURL: ' https://app.wewantwaste.co.uk/api/',
})

export const api = {
  skips: skipsApi,
}
