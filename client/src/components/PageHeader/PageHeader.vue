<template>
  <div class="header mb-3 d-flex flex-row justify-space-between">
    <img class="header__logo" src="../../assets/images/youclaim-header.png"/>
    <v-btn icon="mdi-logout" size="small" variant="tonal" @click="logout" v-if="isLoggedIn"></v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn(){
      return localStorage.getItem('claimToken') ? true : false
    }
  },
  methods: {
    logout(){
      this.$swal({
        icon: 'warning',
        title: 'Log Out',
        text: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: `Yes, I'm sure!`
      })
      .then((respond)=>{
        if(respond.isConfirmed){
          localStorage.removeItem('claimToken')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  height: 30px;
  // max-width: 360px;
  &__logo{
    width: 150px;
  }
}
</style>