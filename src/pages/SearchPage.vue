<template>
  <div class="container-fluid text-center ">
<section class="row ">
    <div class="col-12 p-4 ">
      <h1>Search for Profiles</h1>
      <form @submit.prevent="searchForProfiles()">
      <label  for="search">Search <i class="mdi mdi-magnify"></i>
      </label>
      <input v-model="editable.query" id="search" required minlength="2" maxlength="50" class="w-50 rounded" type="text">
      <button class="btn btn-secondary ms-3 selectable" type="submit">Go Searchin!</button>
    </form>
    </div>
  </section>
    <section class="row">

      <div class="col-12">
        
      </div>
    </section>
  </div>

  <section class="row p-3 justify-content-evenly">
    <div v-for="profile in profiles" :key="profile.id" class="col-md-2 col-6 bg-white elevation-4 ">
  <section class="row">
      <div class="my-2 d-flex justify-content-center "> 
        <img :src="profile.coverImg" :alt="profile.name" class="img-fluid coverImage">
      </div>
    </section>
<section class="row bg-white">
<div class="my-3 col-12 d-flex justify-content-evenly align-items-center ">

  <div class="d-flex ">
    <div class=" d-flex align-items-center justify-content-center">
      <img class="avatar me-2" :src="profile.picture" :alt="profile.name">
      <div class="flex-column">
        <p class="fs-3">{{profile.name}} <i v-if="profile.graduated" class="mdi mdi-school"></i></p>
        <p class="fs-5">Class: {{ profile.class }}</p>
      </div>
    </div>
  </div>
</div>
<div class="fs-1 d-flex justify-content-evenly">
 <p v-if="profile.github" title="Github Link"><a :href="profile.github"><i class="mdi mdi-github"></i></a></p>  
   <p v-if="profile.linkedin" title="LinkedIn Link"><a :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a></p>
   <p v-if="profile.resume" title="Resume Link"><a :href="profile.resume"><i class="mdi mdi-note"></i></a></p>
</div>
<div class="text-center my-3">
  <p class="fs-4">{{ profile.bio }}</p>
</div>
</section>
</div>
  </section>



</template>


<script>
import { computed, ref } from "vue";
import { profilesService } from "../services/ProfilesService.js";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { Post } from "../models/Post.js";

export default {
  setup(){
    const editable = ref({});

    return {
      editable,
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      profiles: computed(() => AppState.profiles),
      async searchForProfiles(){
        try {
          const profileQuery = editable.value
          // logger.log(profileQuery)
          await profilesService.searchForProfiles(profileQuery)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.avatar{
  width: 10vh;
  height: 10vh;
  border: 1px 1px 1px black;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
.coverImage{
  width: 20vh;
  height: 10vh;
  object-fit: cover;
  object-position: center;
}
</style>