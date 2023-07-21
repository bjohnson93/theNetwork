<template>
 <div class="container-fluid ">
  <section class="row justify-content-center mt-3">
    <FormComponent/>
    <!-- <div class="col-md-9 col-12 bg-dark text-light card">
      <h2>Make a Post</h2>
      <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
          <label for="postBody">Share what's happening...</label>
          <textarea type="text" id="postBody" minlength="2" maxlength="1000" rows="3" cols="15" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label for="photo">Photo or Video <i class="mdi mdi-camera"></i></label>
          <input type="url" id="photo" maxlength="1000" class="form-control">
        </div>
        <button class="btn btn-success mb-3" type="submit">Post <i class="mdi mdi-send"></i></button>
      </form>
    </div> -->
  </section>

  <section class="row justify-content-center">
    <div v-for="post in posts" :key="post.id" class="col-md-10 col-12 p-3">
      <PostCard :post="post"/>
      
    </div>
  </section>
</div>
</template>

<script>

import PostCard from "../components/PostCard.vue";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js"
import { computed, onMounted } from "vue";
import { logger } from "../utils/Logger.js";
import { AppState } from "../AppState.js";
import FormComponent from "../components/FormComponent.vue"

export default {
    setup() {
        async function getPosts() {
            try {
                await postsService.getPosts();
            }
            catch (error) {
                Pop.error(error.message);
            }
        }
        onMounted(() => {
            // logger.log('[Posts Page Mounted]')
            getPosts();
        });
        return {
            posts: computed(() => AppState.posts)
        };
    },
    components: { PostCard, FormComponent }
}
</script>

<style scoped lang="scss">
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
