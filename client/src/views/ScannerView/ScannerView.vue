<template>
  <div class="camera__container pa-4 d-flex w-100 flex-column ">
    <page-header/>
    <div class="camera__content d-flex flex-column w-100 align-center justify-center" v-if="decoded">
      <success-redeem :code="code" @reset="resetCamera" :type="errorQr"/>
    </div>
    <div class="camera__content d-flex flex-column w-100 align-center justify-center" v-else-if="!decoded">
      <div class="camera__header">
        <p class="text-h4 mb-3">SCAN QR CODE</p>
      </div>
      <div class="camera__cam" v-if="!decoded">
        <qr-stream @decode="onDecode" />
      </div>
      <div class="camera__manual w-100 d-flex flex-column justify-center">
        <v-text-field
          class="mt-3"
          :value="code"
          @input="update($event.target.value)"
          label="Enter code manually"
          placeholder="1pQIjj0"
          variant="outlined"
        />
        <v-btn class="" @click="submit" variant="tonal">
          Submit
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { QrStream } from 'vue3-qr-reader';
import {redeem} from '@/api';
import SuccessRedeem from './units/SuccessRedeem.vue'
import PageHeader from '../../components/PageHeader/PageHeader.vue';
export default {
  components:{
    QrStream,
    SuccessRedeem,
    PageHeader
  },
  data(){
    return {
      decoded: false,
      code: '',
      errorQr: false
    }
  },
  methods: {
    onDecode(string){
      this.code = string
      redeem({uniqueCode: this.code})
      .then(()=>{
        this.decoded = true
      })
      .catch((err)=>{
        this.decoded = true
        console.log(err)
        this.errorQr = true
      })
    },
    update(val){
      this.code = val
    },
    resetCamera(){
      this.decoded = false
      this.errorQr = false
    }
  }
}
</script>

<style lang="scss" scoped>
.camera{
  &__container {
    height: 100vh;
  }
  &__content {
    min-height: 80vh;
  }
  &__cam{
    max-width: 360px;
    padding: 4px;
    border: 1px solid black;
    border-radius: 8px;
  }
  &__manual{
    max-width: 360px;
  }
}
</style>