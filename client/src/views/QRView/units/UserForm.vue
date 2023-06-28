<template>
  <v-form ref="form">
    <p class="text-center text-h5 mb-2">Fill in the form below</p>
    <v-text-field
      class="mb-3"
      :value="formData.customerName"
      @input="update('customerName', $event.target.value)"
      label="Name"
      placeholder="John Doe"
      variant="outlined"
      density="compact"
    />
    <v-text-field
      class="mb-3"
      :value="formData.customerEmail"
      @input="update('customerEmail', $event.target.value)"
      label="Email"
      placeholder="johndoe@mail.com"
      variant="outlined"
      density="compact"
    />
    <v-text-field
      class="mb-3"
      :value="formData.phoneNumber"
      @input="update('phoneNumber', $event.target.value)"
      label="Phone Number"
      prefix="+62"
      placeholder=""
      variant="outlined"
      type="number"
      density="compact"
    />
    <v-text-field
      class="mb-3"
      :value="formData.age"
      @input="update('age', $event.target.value)"
      label="Age"
      placeholder=""
      variant="outlined"
      type="number"
      density="compact"
    />
    <v-textarea
      class="mb-1"
      :value="formData.address"
      @input="update('address', $event.target.value)"
      rows="3"
      label="Address"
      placeholder="Jl. Raya Kb. Jeruk No.27"
      variant="outlined"
    />
    <v-radio-group label="Gender">
      <v-radio label="Male" color="secondary" value="male" @input="update('gender', $event.target.value)"></v-radio>
      <v-radio label="Female" color="secondary" value="female" @input="update('gender', $event.target.value)"></v-radio>
    </v-radio-group>
    <v-btn class="w-100" @click="submit" variant="tonal">
      Submit
    </v-btn>
  </v-form>
</template>

<script>
export default {
  mounted(){
    this.$swal({
      icon: 'info',
      title: 'User Info',
      text: 'Kindly fill out the form before the voucher is generated!'
    })
  },
  data(){
    return {
      formData: {
        customerName: null,
        address: null,
        gender: null,
        age: null,
        phoneNumber: null,
        customerEmail: null
      }
    }
  },
  methods: {
    update(stateName, val){
      this.formData[stateName] = val
    },
    submit(){
      let body = {}
      for(const field in this.formData){
        if(this.formData[field]){
          body[field] = this.formData[field]
        }
      }
      this.$emit('submit', body)
    }
  }
}
</script>

<style>

</style>