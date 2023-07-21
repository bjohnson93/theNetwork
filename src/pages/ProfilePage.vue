<template>
  <div class="container-fluid" v-if="profile">
    <section class="row">
      <div class="my-2 d-flex justify-content-center col-12"> 
        <img :src="profile.coverImg" :alt="profile.name" class="img-fluid coverPhoto">
      </div>
    </section>
<section class="row bg-white">
<div class="my-3 col-12 d-flex justify-content-evenly align-items-center ">

  <div class="d-flex ">
    <div class=" d-flex align-items-center justify-content-center">
      <img class="avatar" :src="profile.picture" :alt="profile.name">
      <h1>{{profile.name}} <i v-if="profile.graduated" class="mdi mdi-school"></i></h1>
    </div>
  </div>
  <div class="fs-1">
   <p v-if="profile.github" title="Github Link"><a :href="profile.github"><i class="mdi mdi-github"></i></a></p>  
     <p v-if="profile.linkedin" title="LinkedIn Link"><a :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a></p>
     <p v-if="profile.resume" title="Resume Link"><a :href="profile.resume"><i class="mdi mdi-note"></i></a></p>
  </div>
</div>
<div class="text-center my-3">
  <p class="fs-4">{{ profile.bio }}</p>
</div>
</section>

</div>
<section class="row justify-content-center my-4">
  <div v-for="post in posts" :key="post.id" class="col-md-10 col-12 mb-2">
    <PostCard :post="post"/>
  </div>
</section>
</template>


<script>
import Pop from "../utils/Pop.js";
import { profilesService} from "../services/ProfilesService.js"
import { useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { postsService } from "../services/PostsService.js";
import  PostCard  from "../components/PostCard.vue"
import { AppState } from "../AppState.js";

export default {
  setup(){
    const route = useRoute();

    async function getProfile(){
      try {
        const profileId = route.params.profileId
        await profilesService.getProfile(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getProfilePosts(){
      try {
        const profileId = route.params.profileId
        await postsService.getProfilePosts(profileId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getProfile()
      getProfilePosts()
    })

    return {
      profile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts),
    }

  },
  components: { PostCard }
}
</script>


<style lang="scss" scoped>
  .coverPhoto{
    width: 60vh;
  }
  .avatar{
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
</style>