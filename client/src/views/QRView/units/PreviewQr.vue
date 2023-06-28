<template>
  <div class="preview__container d-flex flex-column">
    <div class="preview__qr d-flex flex-column align-center mb-4">
      <qrcode-vue :value="uniqueCode" :size="'200'"/>
    </div>
    <div class="preview__content d-flex flex-column align-center">
      <p class="text-h5">{{uniqueCode}}</p>
      <span class="text-subtitle-2 mb-4">Valid until <b>{{validity}}</b></span>
      <p class="text-h5">{{campaignDetail.campaignName}}</p>
      <span class="text-body-2 text-center mb-4">{{campaignDetail.description}}</span>
      <p>Terms and Condition</p>
      <div class="preview__tnc mb-2">
        <div v-html="campaignDetail.tnc" class="px-4"></div>
      </div>
      <span class="text-caption">You may close this page</span>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import moment from 'moment'
export default {
  components: {
    QrcodeVue
  },
  // data(){
  //   return{
  //     campaignDetail:{
  //       "_id": "649970f6e1a86a6a8f1d24de",
  //       "campaignName": "BiFest Celebration!",
  //       "logo": "",
  //       "endDate": "2023-06-29T17:00:00.000Z",
  //       "slug": "binusian-coffee-binusian-coffee-bifest-celebration",
  //       "description": "Take off 10% of every purchase of any food and beverages!",
  //       "tnc": "<ul><li>Only valid in offline purchases</li><li>Valid until 30 June 2023</li><li>At any time in the future, Binusian Coffee has the right to change any points of terms and condition without notice</li><li>Valid until 30 June 2023</li><li>At any time in the future, Binusian Coffee has the right to change any points of terms and condition without notice</li><li>Valid until 30 June 2023</li><li>At any time in the future, Binusian Coffee has the right to change any points of terms and condition without notice</li></ul>",
  //       "isActive": true,
  //       "createdBy": "64996de6e1a86a6a8f1d24a3",
  //       "merchantId": "64996f29e1a86a6a8f1d24b9",
  //       "createdAt": "2023-06-26T11:05:26.726Z",
  //       "updatedAt": "2023-06-26T11:16:53.426Z",
  //       "__v": 0
  //     },
  //     uniqueCode: '1pQIjj0',
  //     validDate: '2023-06-30T11:05:26.726Z'
  //   }
  // },
  computed: {
    validity(){
      return moment(this.campaignDetail.endDate).format('l')
    }
  },
  mounted(){
    this.$swal({
      icon: 'success',
      title: 'Screenshot',
      text: `Don't forget to screenshot the qr so you can show it to the merchant!`
    })
  },
  props:{
    uniqueCode: {
      type: String
    },
    campaignDetail: {
      type: Object
    },
  }
}
</script>

<style lang="scss" scoped>
.preview{
  &__container{
    max-width: 550px;
  }
  &__tnc{
    height: 26vh;
    overflow: scroll;
  }
}
</style>