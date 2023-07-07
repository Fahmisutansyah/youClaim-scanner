<template>
  <v-form ref="form" class="form">
    <v-text-field
      class="mb-3"
      :value="formData.email"
      @input="update('email', $event.target.value)"
      label="Email"
      placeholder="johndoe@mail.com"
      variant="outlined"
      :rules="[rules.required]"
    />
    <v-text-field
      :value="formData.password"
      @input="update('password', $event.target.value)"
      label="Password"
      variant="outlined"
      type="password"
      :rules="[rules.required]"
    />
    <div class="form__action d-flex justify-center w-100 mt-3">
      <v-progress-circular v-if="isLoading" indeterminate/>
      <v-btn v-else class="w-100" @click="submit" variant="tonal">
        Login
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { login, getMerchantOwned, getPayload } from '@/api'
export default {
  data(){
    return {
      formData: {
        email: '',
        password: ''
      },
      isLoading: false,
      rules: {
        required: value => !!value || 'Field is required',
      }
    }
  },
  methods: {
    update(target, val){
      this.formData[target] = val
    },
    submit(){
      this.$refs.form.validate()
      .then(({valid})=>{
        if(valid){
          this.isLoading = true
          const {email, password} = this.formData
          login(email, password).then(({data})=>{
            getMerchantOwned(data.token)
            .then((owned)=>{
              getPayload(data.token)
              .then((user)=>{
                if(owned.data.requestId.includes(user.data._id.toString())){
                  this.$swal({
                    icon: 'error',
                    title: 'Not registered to Merchant',
                    text: 'Please register to a merchant!'
                  })
                  setTimeout(()=>{
                    this.isLoading = false 
                  }, 1500)
                }else{
                  localStorage.setItem('claimToken', data.token)
                  setTimeout(()=>{
                    this.isLoading = false 
                    this.$router.push('/scan')
                  }, 1500)
                }
              })
              .catch(()=>{
                this.$swal({
                  icon: 'error',
                  title: 'Oops..',
                  text: 'Something went wrong..'
                })
              })
            })
            .catch(()=>{
              this.$swal({
                icon: 'error',
                title: 'Not registered to Merchant',
                text: 'Please register to a merchant!'
              })
              setTimeout(()=>{
                this.isLoading = false 
              }, 1500)
            })

          })
          .catch(err=>{
            this.isLoading = false
            if(err.response.status === 400){
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Check your email and password'
              })
            }else{
              this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>