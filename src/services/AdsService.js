import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { api } from "./AxiosService.js"

class AdsService {

  async getAds() {
    const res = await api.get('api/ads')
    AppState.ads = res.data
    const ads = res.data.map(ad => new Ad(ad))
    AppState.ads = ads
  }
}

export const adsService = new AdsService()