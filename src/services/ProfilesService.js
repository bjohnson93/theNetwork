import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class ProfilesService {

  async getProfile(profileId) {
    const res = await api.get(`api/profiles/${profileId}`)
    // logger.log('[logged res?]', res.data)
    const profile = new Profile(res.data)
    AppState.activeProfile = profile
  }
  async searchForProfiles(profileQuery) {
    const res = await api.get(`api/profiles?query=${profileQuery.query}`)
    logger.log('[queried for profiles]', res.data)
    const profiles = res.data.map(pPojo => new Profile(pPojo))

    AppState.profiles = profiles
    AppState.page = res.data.page
    AppState.query = profileQuery
  }
  async changePage(url) {
    const res = await api.get(`api/profiles`)
    logger.log('[CHANGING PAGE FROM SERVICE]', res.data)
    logger.log('[url]', url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.older = res.data.older
    AppState.newer = res.data.newer
  }
  clearProfiles() {
    AppState.profiles = []
    AppState.pages = 0
    AppState.posts = []
    AppState.query = null
  }

}
export const profilesService = new ProfilesService()