<template>
  <div class="login__container d-flex w-100 flex-column justify-center align-center pa-4">
    <page-header/>
    <div class="w-100">
      <div class="login__content d-flex flex-column align-center mb-10">
        <img class="login__logo" src="@/assets/images/youclaim-logo-final.png"/>
        <p class="font-weight-bold text-h5 mt-4">YOUCLAIM</p>
      </div>
      <div class="login__form">
        <login-form/>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from './units/LoginForm.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'

export default {
  components: {
    LoginForm,
    PageHeader
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  &__container{
    height: 100vh;
  }
  &__logo{
    width: 60px;
  }
}
</style>