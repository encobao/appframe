<template>
  <v-app>
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
        ></v-select>
      </div>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          centered
          class="ml-n9"
          color="grey darken-1"
          icons-and-text
        >
          <v-tab key=-1>All</v-tab>
          <v-tab
            v-for="categ in categories"
            :key="categ.id"
          >
            {{ categ.name }}
            <v-icon :color="categ.color" x-small>mdi-card</v-icon>
          </v-tab>
        </v-tabs>
      </template>

    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            class="mx-auto"
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!-------------------------------------------------------------->
              <!-- Main content ---------------------------------------------->
              <!-------------------------------------------------------------->
              <v-tabs-items 
                class="mx-4 py-7"
                v-model="tab"
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>
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
        {{ new Date().getFullYear() }} — <strong>Encobao</strong>
      </v-col>
    </v-footer>

  </v-app>
</template>

<script>
  import Task from './components/Task'
  import axios from 'axios'


  export default {
    name: 'App',
    components: {
      Task,
    },
    data: () => ({
      tab: null,
      userId: -1,
      //users: null,
      users: [
        { id: 1, name: 'Daniel' },
        { id: 2, name: 'Jessica' },
      ],
      //categories: null,
      categories: [
        {   
            id: 1, 
            name: "Sidework", 
            color: "#b30000", 
            verify: false 
        },
        {   
            id: 2, 
            name: "Closing", 
            color: "#1A237E", 
            verify: true 
        },
      ],
      tasks: [
        { 
          id: 1, 
          name: 'Soups and Salads',
          description: 'Refill the soup containers, dressing and toppings for salads during your shift.', 
          categId: 1,
          status: 0,
          userId: 1,
          users: [ 
                  { id: 1, name: 'Daniel'},
                  { id: 2, name: 'Jessica'},
                  { id: 3, name: 'Pepe'},
                ], 
        },
        { 
          id: 2, 
          name: 'Beverage Station',
          description: 'Refill ice, straws, strawberry lemonade, sweeted and unsweeted tea.', 
          categId: 1, 
          status: 0, 
          userId: 1,
          users: [ 
                  { id: 1, name: 'Daniel'},
                ], 
        },
        { 
          id: 3, 
          name: 'Station 4',
          description: 'Clean and restock Station 4.', 
          categId: 2, 
          status: 0, 
          userId: 1,
          users: [ 
                  { id: 1, name: 'Daniel'},
                  { id: 3, name: 'Pepe'},
                ], 
        },
        { 
          id: 4, 
          name: 'Detail chairs',
          description: 'Do a detail cleanning for all chairs in your section.', 
          categId: 3, 
          status: 1, 
          userId: 2,
          users: [ 
                  { id: 1, name: 'Daniel'},
                  { id: 3, name: 'Pepe'},
                ], 
        },
      ],
      filteredTasks: Array,
    }),
    watch: {
      userId: function(val) {
        function findIndexOnTasks(task) {
          //return task.userId == val
          return task.users.findIndex( user => user.id == val) != -1
        }

        if (val == -1) {
          this.filteredTasks = this.tasks
        } else {
          //this.filteredTasks = this.tasks.filter( task => task.userId === val )
          this.filteredTasks = this.tasks.filter( findIndexOnTasks )
        }
      },
    },
    methods: {
      onTaskRequestCheck(taskId) {
        const index = this.tasks.findIndex(task => task.id === taskId)
        this.tasks[index].status = 2
      },
    },
    // created: function() {
    // //   this.users.unshift( {id: -1, name: 'All users'} )
    //   this.filteredTasks = this.tasks
    // },
    mounted () {
      axios
        .get('api/categories.json')
        .then(resp => {
          console.log(resp.data)
          this.categories = resp.data
        })
        // .catch(error => {
        //   console.log(error)
        //   this.errored = true
        // })
        // .finally(() => this.loading = false)

      axios
        .get('api/users.json')
        .then(resp => {
          //console.log(resp.data)
          this.users = resp.data
          this.users.unshift( {id: -1, name: 'All users'} )
          //   this.filteredTasks = this.tasks
        })
        // .catch(error => {
        //   console.log(error)
        //   this.errored = true
        // })
        // .finally(() => this.loading = false)
      this.filteredTasks = this.tasks
    },

  }
</script>