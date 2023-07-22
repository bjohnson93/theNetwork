<template>
  <div class="about text-center container-fluid">
    <img class="coverPhoto" :src="account.coverImg" alt="">
    <h1>Welcome {{ account.name }}</h1>
    <img class=" imgSmall" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">
    <section class="row justify-content-center">
      <div class="col-md-10 mb-3 bg-white elevation-3 rounded col-12">
        <form class="" action="" @submit.prevent="editAccount()">
          <div class="my-2">
            <label for="name">Name</label>
            <input class="form-control" type="text" id="name" minlength="3" maxlength="50" v-model="editable.name" >
          </div>
          <div class="mb-2">
            <label for="picture">Picture</label>
            <input class="form-control" type="url" id="picture" minlength="3" maxlength="1000" v-model="editable.picture">
          </div>
          <div class="mb-2">
            <label for="bio">Bio</label>
            <textarea class="form-control" type="text" id="bio" rows="10" cols="5" v-model="editable.bio"></textarea>
          </div>
          <div class="mb-2">
            <label for="coverImg">Cover Photo</label>
            <input class="form-control" type="url" id="coverImg" minlength="3" maxlength="1000" v-model="editable.coverImg">
          </div>
          <div class="mb-2">
            <label for="github">Github</label>
            <input class="form-control" type="url" id="github" minlength="3" maxlength="1000" v-model="editable.github">
          </div>
          <div class="mb-2">
            <label for="linkedin">LinkedIn</label>
            <input class="form-control" type="url" id="linkedin" minlength="3" maxlength="1000" v-model="editable.linkedin">
          </div>
          <div class="mb-2">
            <label for="coverImg">Resume Link</label>
            <input class="form-control" type="url" id="coverImg" minlength="3" maxlength="1000" v-model="editable.resume" >
          </div>
          <div class="mb-2">
            <label for="class">Class</label>
            <input class="form-control" type="text" id="class" minlength="3" maxlength="50" v-model="editable.class">
          </div>
          <div class="form-check my-2">
            <input class="form-check-input" type="checkbox" value="true" id="graduated" v-model="editable.graduated">
            <label class="form-check-label" for="graduated" >
              Graduated Codeworks?
            </label>
          </div>
          <div class="text-end">
            <button type="submit" class="px-4 btn btn-info mb-3">Submit</button>
          </div>
        </form>

      </div>
    </section>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      logger.log('[WATCH EFFECT ON ACCT PAGE?]')
      editable.value = {...AppState.account}
    })

    return {
      editable,
      account: computed(() => AppState.account),

      async editAccount(){
        try {
        const formData = editable.value
          await accountService.editAccount(formData)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.imgSmall {
  width: 23vh;
  height: 23vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
.coverPhoto{
  width: 120vh;
  height: 45vh;
  object-fit: cover;
  object-position: center;
}
</style>
