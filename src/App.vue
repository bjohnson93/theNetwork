<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <!-- <section class="row ">
    <div class="col-12 d-flex justify-content-around my-4">
      <div>
        <button @click="changePage(older)" :disabled="!older" class="btn btn-dark">Older</button>

      </div>
      <div>
        <button @click="changePage(newer)" :disabled="!newer"  class="btn btn-dark">Newer</button>

      </div>
    </div>
  </section> -->

    <section class="row">

      <div class="text-center" v-for="ad in ads" :key="ad.id">
        <img class="p-3" :src="ad.banner" alt="picture">
      </div>
    </section>
  </main>

</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Pop from "./utils/Pop.js"
import { adsService } from "./services/AdsService.js"
import { postsService } from "./services/PostsService.js"

export default {
  setup() {
    async function getAds(){
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getAds();
    })
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
      posts: computed(() => AppState.posts),
            // newer: computed(() => AppState.newer),
            // older: computed(() => AppState.older),

            //       async changePage(url){
            //   try {
            //     // logger.log('change page', url)
            //     await postsService.changePage(url)
            //   } catch (error) {
            //     Pop.error(error.message)
            //   }
            // },
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}
body{
  background-color: #a2d5de;
}
.navbarColor{
  background-color: rgb(49, 71, 71);
}
.formColor{
  background-color: rgb(43, 87, 109);
}
</style>
