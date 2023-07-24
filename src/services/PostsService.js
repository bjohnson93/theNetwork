import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    const res = await api.get('api/posts')
    logger.log('[got posts?]', res.data)
    AppState.pages = res.data
    const posts = res.data.posts.map(postPojo => new Post(postPojo))
    // const posts = res.data
    AppState.posts = posts
    AppState.newer = res.data.newer
    AppState.older = res.data.older
  }
  async getProfilePosts(profileId) {
    const res = await api.get('api/posts', {
      params: {
        creatorId: profileId
      }
    })
    logger.log('Did I get the right posts?', res.data)
    const posts = res.data.posts.map(pojo => new Post(pojo))

    AppState.posts = posts
  }
  async changeProfilePage(url, profileId) {
    logger.log(url, 'URL')
    // const res = await api.get('api/posts', {
    //   params: {
    //     creatorId: profileId
    //   }
    // })
    // logger.log('[CHANGING PAGE FROM SERVICE]', res.data)

    // const posts = res.data.posts.map(p => new Post(p))
    // AppState.older = res.data.older
    // AppState.newer = res.data.newer

    // AppState.activeProfile = posts

  }
  async changePage(url) {
    const res = await api.get(url)
    logger.log('[CHANGING PAGE FROM SERVICE]', res.data)

    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.older = res.data.older
    AppState.newer = res.data.newer


    // map was  not working, but map is needed? will come back later, map breaks button
    // const posts = res.data.posts
  }
  setActivePost(post) {
    AppState.activePost = post
  }
  async likePost(postData) {
    // logger.log('[POST DATA:]', postData, '[MY ID]:', myId)
    // logger.log(myId)
    // const res = await api.post(`api/posts/:${myId}/like`)
    const res = await api.post(`api/posts/${postData.id}/like`)
    AppState.posts.filter(p => p.id == p.id)
    logger.log(res.data)
    const postIndex = AppState.posts.findIndex(p => p.id == postData.id)
    const post = new Post(res.data)
    AppState.posts.splice(postIndex, 1, post)
    //this gets the post by id....
    // const postIndex = AppState.posts.findIndex(p => p.id == postData.id)
    // logger.log('res data...', res.data)
    // AppState.activePost = res.data

    // const likesIndex = res.data.likes.findIndex(like => like.id == myId)
    // if (!likesIndex) {
    //   AppState.activePost = postData.likes.push(myId)
    //   logger.log(postData, 'after pushing')
    // }

    // const unlike = postData.likes.splice(myId, 1)
    // AppState.activePost = unlike
    // logger.log(postData, 'after splicing')

  }
  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    // logger.log('[did I create a Post?]', res.data)
    const post = new Post(res.data)
    AppState.posts.unshift(post)
  }
  async editPost(postData) {
    const res = await api.put(`api/posts/${postData.id}`, postData)
    // logger.log('Did I edit my post?', res.data)
    const postIndex = AppState.posts.findIndex(p => p.id == postData.id)
    const updatedPost = new Post(res.data)
    AppState.posts.splice(postIndex, 1, updatedPost)
    //need to finish this function after I make button to edit!
  }
  async removePost(postToDelete) {
    const res = await api.delete(`api/posts/${postToDelete}`)
    // logger.log('[did the post delete?]', res.data)
    const postIndex = AppState.posts.findIndex(p => p.id == postToDelete)
    AppState.posts.splice(postToDelete, 1)
  }
}

export const postsService = new PostsService()