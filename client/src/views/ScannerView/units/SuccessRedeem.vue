<template>
  <div class="d-flex flex-column align-center justify-center">
    <template v-if="!type">
      <p class="text-h5 text-center mb-3">
        QR <b>{{code}}</b> <br/>successfully redeemed!
      </p>
      <p class="text-subtitle-2 mb-3">
        Thank You
      </p>
      <v-btn class="w-50" @click="()=> $emit('reset')" variant="tonal">
        Scan again
      </v-btn>
    </template>
    <template v-else-if="type">
      <p class="text-h5 text-center mb-3">
        Failed to redeem <br/><b>{{code}}</b>
      </p>
      <p class="text-subtitle-2 mb-3">
        Please try again
      </p>
      <v-btn class="w-100" @click="()=> $emit('reset')" variant="tonal">
        Scan again
    </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      required: true
    },
    type: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style>

</style>