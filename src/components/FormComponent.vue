<template>
  <div class="col-md-9 col-12 bg-dark text-light card">
      <h2>Make a Post</h2>
      <form @submit.prevent="handleSubmit()">
        <div class="mb-3">
          <label for="postBody">Share what's happening...</label>
          <textarea type="text" id="postBody" minlength="2" maxlength="1000" rows="3" cols="15" class="form-control" v-model="editable.body"></textarea>
        </div>
        <div class="mb-3">
          <label for="photo">Photo or Video <i class="mdi mdi-camera"></i></label>
          <input type="url" id="photo" maxlength="1000" class="form-control" v-model="editable.imgUrl">
        </div>
        <button class="btn btn-success mb-3" type="submit">Post <i class="mdi mdi-send"></i></button>
      </form>
    </div>
</template>


<script>
import { ref } from "vue";
import { postsService } from "../services/PostsService.js";
import Pop from "../utils/Pop.js";
import { Modal } from "bootstrap";

export default {
  setup(){
    const editable = ref({})
    return {
      editable,
      handleSubmit(){
        if(editable.value.id) {
          this.editPost()
        }
        else {
          this.createPost()
        }
      },
      async createPost(){
        try {
          const newPost = editable.value
          await postsService.createPost(newPost)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async editPost(){
        try {
          const postData = editable.value
          await postsService.editPost(postData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>

</style>