<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      absolute
      dark
    >

      <v-spacer></v-spacer>

      <span
        class="text-h5 pt-5"
        @click="refresh"
      >
      TASKS
      </span>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab
            v-for="tab in tablist"
            :key="tab.id"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>
    
    <v-main>
      <v-sheet
        color="white"
        max-width="1200px"
        height="100px"
        class="mx-auto mt-4 pa-3"
      >

        <v-tabs-items v-model="tabs">

          <v-tab-item>
            <tab-home></tab-home>
          </v-tab-item>

          <v-tab-item>
            <tab-images></tab-images>
          </v-tab-item>

          <v-tab-item>
            <tab-about-us></tab-about-us>
          </v-tab-item>

          <v-tab-item>
            <tab-contact-us></tab-contact-us>
          </v-tab-item>

        </v-tabs-items>

      </v-sheet>
    </v-main>
    
    <v-footer 
      app
      padless
      absolute
    >
      <app-footer></app-footer>
    </v-footer>
  
  </v-app>
</template>

<script>
  import AppFooter from './components/AppFooter'
  import TabHome from './components/TabHome'
  import TabImages from './components/TabImages'
  import TabAboutUs from './components/TabAboutUs'
  import TabContactUs from './components/TabContactUs'
  import axios from 'axios'


  export default {
    name: 'App',
    components: {
        AppFooter,
        TabHome,
        TabImages,
        TabAboutUs,
        TabContactUs,
    },
    data: () => ({
      tabs: null,
      apiErrored: false,
      tablist: [
        {   
            id: 1, 
            name: "home", 
        },
        {   
            id: 2, 
            name: "images", 
        },
        {   
            id: 3, 
            name: "about us", 
        },
        {   
            id: 4, 
            name: "contact us", 
        },
      ],
    }),
    watch: {
      // userId: function(val) {
      //   function findIndexOnTasks(task) {
      //     return task.users.findIndex( user => user.id == val) != -1
      //   }

      //   if (val == -1) {
      //     this.filteredTasks = this.tasks
      //   } else {
      //     this.filteredTasks = this.tasks.filter( findIndexOnTasks )
      //   }
      // },
    },
    methods: {
      async getApiObject(apiLocation) {
        try {
          const resp = await axios.get(apiLocation)
          return resp.data
        } catch(error) {
            this.apiErrored = true
        }
      },
      refresh() {
        location.reload()
      },
    },
    mounted () {
      // this.getApiObject(process.env.VUE_APP_API_URL + 'categories.json')
      //   .then(data => this.categories = data)

      // this.getApiObject(process.env.VUE_APP_API_URL + 'users.json')
      //   .then(data => {
      //     this.users = data
      //     this.users.unshift( {id: -1, name: 'All users'} )
      //   })

      // this.getApiObject(process.env.VUE_APP_API_URL + 'tasks.json')
      //   .then(data => {
      //     this.tasks = data
      //     this.filteredTasks = this.tasks
      //   })
    },
  }
</script>
