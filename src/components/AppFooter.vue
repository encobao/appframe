<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row
      no-gutters
    >
      <v-col cols="12">
        <v-card
          width="100%"
          flat
          tile
        >
          <v-card-text 
            class="primary lighten-1 text-center white--text"
          >
            {{ new Date().getFullYear() }} — <strong>encobao.com</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'AppFooter',
    // props: {
    //   devName: String,
    // },
  }
</script>
