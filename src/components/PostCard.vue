<template>
  <div class=" card bg-white  justify-content-between elevation-3">
        <div class="row d-flex p-3">
          <div class="col-9 ">
            <div class="d-flex mb-3">
              <img class="avatar" :src="post.creator.picture" :alt="post.creator.name">
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
                  <i class="mdi mdi-pencil pe-4 selectable"></i>
                  <i class="mdi mdi-delete selectable"></i>
                </div> 
                <div><i  class="mdi mdi-heart-outline">{{post.likes.length}}</i></div>
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
import { Post } from "../models/Post.js";

export default {
  props: {
    post: { type: Post, required: true}
  },
  setup(){
    return {}
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