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
  }
  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    logger.log('[did I create a Post?]', res.data)
    const post = new Post(res.data)
    AppState.posts.unshift(post)
  }
  async editPost(postData) {
    const res = await api.put('api/posts', postData)
    logger.log('Did I edit my post?', res.data)
    //need to finish this function after I make button to edit!
  }
}

export const postsService = new PostsService()