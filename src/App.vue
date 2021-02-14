<template>
  <v-app>
    <!-- <wf-tabs-header 
      :users="users" 
      @change-user="userId = $event"
    ></wf-tabs-header> -->
    <v-app-bar
      app
      color="primary"
      absolute
      dark
    >

      <span
        class="text-h5 font-weight-bold"
        @click="refresh"
      >
      TASKS
      </span>

      <v-spacer></v-spacer>

      <div style="width: 148px;">
        <v-select
          v-model="userId"
          :items="users"
          item-text="name"
          item-value="id"
          class="pt-8"
          background-color="primary"
          solo
          flat
        >
          <template v-slot:item="props">
            <span class="black--text">
              {{ props.item.name }}
            </span>
          </template>

          <template v-slot:selection="props">
            <span class="font-weight-bold">
              {{ props.item.name }}
            </span>
          </template>
        </v-select>
      </div>

    </v-app-bar>
    
    <v-main>
            <v-sheet
              class="mx-auto"
              min-height="80vh"
              :max-width="appWidth"
            >
              <!-------------------------------------------------------------->
              <!-- Main content ---------------------------------------------->
              <!-------------------------------------------------------------->
              <v-tabs
                v-model="tabs"
                centered
                color="grey darken-1"
                icons-and-text
              >
                <v-tab key=-1>
                  All
                  <v-icon color="white" x-small>mdi-card</v-icon>
                </v-tab>
                <v-tab
                  v-for="categ in categories"
                  :key="categ.id"
                >
                  {{ categ.name }}
                  <v-icon :color="categ.color" x-small>mdi-checkbox-blank-circle</v-icon>
                </v-tab>
              </v-tabs>
              
              <v-alert
                v-if="apiErrored"
                border="right"
                colored-border
                type="error"
                elevation="2"
                class="ma-6"
              >
                We're sorry, we're not able to retrieve this information at the moment, please try back later
              </v-alert>
              
              <v-tabs-items 
                class="mx-4 py-10"
                v-model="tabs"
              >
                <!-------------------------------------------------------------->
                <!-- ALL Tab ---------------------------------------------->
                <!-------------------------------------------------------------->
                <v-tab-item
                  key=-1
                >
                    <div
                      v-for="categ in categories"
                      :key="categ.id"
                    >
                      <div
                        v-for="task in filteredTasks"
                        :key="task.id"
                      >
                        <Task  
                          v-if="categ.id == task.categId"
                          :task="task"
                          :color="categ.color"
                          :verify="categ.verify"
                          @task-request-check="onTaskRequestCheck"
                        />
                      </div>
                    </div>
                </v-tab-item>
                <!-------------------------------------------------------------->
                <!-- END ALL Tab ---------------------------------------------->
                <!-------------------------------------------------------------->
                <v-tab-item
                  v-for="categ in categories"
                  :key="categ.id"
                >
                    <div
                      v-for="task in filteredTasks"
                      :key="task.id"
                    >
                      <Task  
                        v-if="categ.id == task.categId"
                        :task="task"
                        :color="categ.color"
                        :verify="categ.verify"
                        @task-request-check="onTaskRequestCheck"
                      />
                    </div>
                </v-tab-item>
              </v-tabs-items>
              <!-------------------------------------------------------------->
              <!-- END Main content ------------------------------------------>
              <!-------------------------------------------------------------->
            </v-sheet>
    </v-main>
    <v-footer 
      app
      padless
      dark
      absolute
    >
      <v-card
        width="100%"
        flat
        tile
      >
        <v-card-text 
          class="grey lighten-1 grey--text text--darken-3 text-center"
        >
          {{ new Date().getFullYear() }} — <strong>encobao.com</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- <wf-tabs-footer devName="Encobao.com"></wf-tabs-footer> -->
  </v-app>
</template>

<script>
  //import WfTabsHeader from './components/WfTabsHeader'
  import Task from './components/Task'
  //import WfTabsFooter from './components/WfTabsFooter'
  import axios from 'axios'


  export default {
    name: 'App',
    components: {
      Task,
      //WfTabsFooter,
      //WfTabsHeader,
    },
    data: () => ({
      appWidth: '800px',
      tabs: null,
      userId: -1,
      apiErrored: false,
      users: [],
      // users: [
        //   { id: 1, name: 'Daniel' },
      // ],
      categories: [],
      // categories: [
      //   {   
      //       id: 1, 
      //       name: "Sidework", 
      //       color: "#b30000", 
      //       verify: false 
      //   },
      // ],
      tasks: [],
      // tasks: [
      //   { 
      //     id: 1, 
      //     name: 'Soups and Salads',
      //     description: 'Refill the soup containers, dressing and toppings for salads during your shift.', 
      //     categId: 1,
      //     status: 0,
      //     userId: 1,
      //     users: [ 
      //             { id: 1, name: 'Daniel'},
      //             { id: 2, name: 'Jessica'},
      //             { id: 3, name: 'Pepe'},
      //           ], 
      //   },
      // ],
      filteredTasks: Array,
    }),
    watch: {
      userId: function(val) {
        function findIndexOnTasks(task) {
          return task.users.findIndex( user => user.id == val) != -1
        }

        if (val == -1) {
          this.filteredTasks = this.tasks
        } else {
          this.filteredTasks = this.tasks.filter( findIndexOnTasks )
        }
      },
    },
    methods: {
      onTaskRequestCheck(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId)
        this.tasks[index].status = 2
      },

      // onChangeUser(newUserId) {
      //   this.userId = newUserId
      // },
      
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
      this.getApiObject(process.env.VUE_APP_API_URL + 'categories.json')
      //this.getApiObject('api/categories.json')
      //this.getApiObject('http://encobao.com/api/categories.json')
        .then(data => this.categories = data)

      this.getApiObject(process.env.VUE_APP_API_URL + 'users.json')
      //this.getApiObject('api/users.json')
      //this.getApiObject('http://encobao.com/api/users.json')
        .then(data => {
          this.users = data
          this.users.unshift( {id: -1, name: 'All users'} )
        })

      this.getApiObject(process.env.VUE_APP_API_URL + 'tasks.json')
      //this.getApiObject('api/tasks.json')
      //this.getApiObject('http://encobao.com/api/tasks.json')
        .then(data => {
          this.tasks = data
          this.filteredTasks = this.tasks
        })
    },
  }
</script>
