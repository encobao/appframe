<template>
  <v-footer 
    app
    padless      
    absolute
    color="white"
  >
    <v-col
      class="text-center grey--text text--darken-1"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>{{ devName }}</strong>
    </v-col>
  </v-footer>
</template>

<script>
  export default {
    name: 'WfTabsFooter',
    props: {
      devName: String,
    },
  }
</script>
