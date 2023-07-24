<template>
  <div class=" card bg-white  justify-content-between elevation-3">
        <div class="row d-flex p-3">
          <div class="col-9 ">
            <div class="d-flex mb-3">
              <router-link :to="{name: 'Profile', params: {profileId: post.creatorId}}">
                <img class="avatar" :src="post.creator.picture" :alt="post.creator.name" title="Open Profile">
              </router-link>
              <div>
                <p class="fs-3">{{ post.creator.name }}</p>
                <p class="fs-3">{{ post.createdAt }}  <i v-if="post.creator.graduated" class="mdi mdi-school"></i></p>
              </div>
            </div>
            <div>
              
              {{ post.body }}
            </div>
            <div>
              <div class="justify-content-between d-flex fs-4 mt-2">
                <div>
                  <!-- //need to add @click to pencil for edit button, which needs to open form- form component? -->
                  <i v-if="account.id == post.creatorId" @click="setActivePost()" class="mdi mdi-pencil pe-4 selectable"  data-bs-toggle="#postForm"></i>
                  <!-- need to add function for delete post -->
                  <i v-if="account.id == post.creatorId" @click="removePost()" class="mdi mdi-delete selectable"></i>
                </div> 

                <div class="checkbox-custom "><i class="mdi mdi-heart-outline selectable" @click="likePost()"></i>
{{post.likes.length}}</div>
                </div>

            </div>
          </div>
          <div v-if="post.imgUrl" class="col-3 img-fluid">
            <img class="postPic pe-3 rounded"  :src="post.imgUrl" alt="post picture">
          </div>
        </div>
        </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    post: { type: Post, required: true}
  },
  setup(props){
    return {
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      activePost: computed(() => AppState.activePost),
      setActivePost(){
        // logger.log('you made this post active')
        postsService.setActivePost(props.post)
      },
      async likePost(){
        try {
          const postData = props.post
          // logger.log(postData.id, '[post to likes id]')
          // logger.log(props.post.likeIds, '[likeIds of posts]')
          // const thisPostsLikes = props.post.likes
          const myId = this.account.id
          // logger.log('[is this my id?]', myId) 
          //this sends through the id of the post itself//
          await postsService.likePost(postData, myId)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async removePost(){
        try {
          const removeConfirm = await Pop.confirm('Are you sure you want to delete you post?')
          if(!removeConfirm){
            return
          }
          const postToDelete = props.post.id
          // logger.log('do I have the right id to delete?', postToDelete)
          await postsService.removePost(postToDelete)
        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
  .avatar{
    width: 10vh;
    height: 10vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
  .postPic{
    height: 15vh;
    width: 18vh;
    object-fit: cover;
    object-position: center;
  }

  
</style>