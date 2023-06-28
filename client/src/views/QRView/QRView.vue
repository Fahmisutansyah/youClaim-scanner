<template>
  <div class="qr__container pa-4">
    <page-header/>
    <div class="loading__container w-100 d-flex justify-center" v-if="isLoading">
      <v-progress-circular indeterminate/>
    </div>
    <div v-else-if="!fillform && alreadyHave">
      <no-generate/>
    </div>
    <div class="" v-else-if="fillForm">
      <user-form @next="nextP" @submit="submitUser"/>
    </div>
    <div class="d-flex align-center justify-center w-100" v-else-if="!fillForm">
      <preview-qr :campaignDetail="campaignDetail" :uniqueCode="uniqueCode"/>
    </div>
  </div>
</template>

<script>
import UserForm from './units/UserForm.vue'
import PreviewQr from './units/PreviewQr.vue'
import NoGenerate from './units/NoGenerate.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import {getCampaignId, generate} from '@/api'

export default {
  components: {
    UserForm,
    PreviewQr,
    PageHeader,
    NoGenerate
  },
  mounted(){
    this.getCampaignId()
  },
  data(){
    return{
      fillForm: true,
      campaignId: null,
      body: {},
      campaignDetail: null,
      isLoading: false,
      uniqueCode: null,
      areadyHave: true
    }
  },
  computed: {
    paramSlug(){
      return this.$route.params.slug
    }
  },
  methods: {
    nextP(){
      this.fillForm = false
    },
    submitUser(body){
      this.isLoading = true
      this.body  = {campaignId: this.campaignId, ...body}
      generate(this.body, localStorage.getItem(this.paramSlug))
      .then(({data})=>{
        this.campaignDetail = data.campaign
        localStorage.setItem(this.paramSlug, data.token)
        this.uniqueCode = data.uniqueCode
        this.fillForm = false
        this.isLoading = false
      })
      .catch(err=>{
        this.isLoading = false
        if(err.response.data.msg == 'have already generated'){
          this.alreadyHave = true
        }
      })
    },
    getCampaignId(){
      getCampaignId(this.paramSlug)
        .then(({data})=>{
          this.campaignId = data.campaignId
        })
    },
  }
}
</script>

<style>

</style>