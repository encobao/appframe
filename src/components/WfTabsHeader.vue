<template>
    <v-app-bar
      app
      color="white"
      class="px-md-16"
    >

      <v-avatar
        color="grey darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <div style="width: 148px;" class="pt-4">
        <v-select
          v-model="userId"
          :items="users"
          item-text="name"
          item-value="id"
          single-line
          color="grey darken-1"
          item-color="grey darken-1"
          :change="$emit('change-user',userId)"
        ></v-select>
      </div>

    </v-app-bar>
</template>

<script>
  export default {
    name: 'WfTabsHeader',
    props: {
      users: Array,
    },
    data: () => ({
        userId: -1,
    }),
  }
</script>
