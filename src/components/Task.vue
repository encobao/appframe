<template>
  <v-card 
    class="mb-6"
    :color="color"
    dark
  >
    <v-card-title class="headline">
      {{ task.name }} 
      <span class="text-subtitle-1 pl-2">(</span>
        <span 
          v-for="(user, index) in task.users"
          :key="user.id"
          class="text-subtitle-1 pl-1"
        >
          {{ user.name }}
          <span v-if="(index + 1) < task.users.length">, </span>

        </span>
      <span class="text-subtitle-1 pl-1">)</span>
    </v-card-title>

    <v-card-subtitle>
      {{ task.description }}
    </v-card-subtitle>
    
    <v-row 
      v-if="verify"
      justify="end"
      class="pr-8 pb-5"
    >
      <v-btn
        outlined
        small
        @click="$emit('task-request-check', task.id)" 
        v-if="task.status === 0"
      >
        Request check
      </v-btn>
      <div v-else-if="task.status === 1">
        <v-btn 
          text
          small
        >
          Completed
        </v-btn>
        <v-icon color="white" >mdi-thumb-up</v-icon>
      </div>
      <v-btn 
        small
        text 
        v-else
      >
        Requested
      </v-btn>
    </v-row>
  
    <!-- <v-card-actions v-if="verify">
      <v-btn
        outlined
        small
        right
        absolute
        class="mb-10"
        @click="$emit('task-request-check', task.id)" 
        v-if="task.status === 0"
      >
        Request check
      </v-btn>
      <v-btn 
        class="mb-2"
        text
        small
        v-else-if="task.status === 1"
      >
        Completed
      </v-btn>
      <v-btn 
        class="mb-2"
        small
        text 
        v-else
      >
        Requested
      </v-btn>
    </v-card-actions>
   -->
  </v-card>
</template>

<script>
  export default {
    name: 'Task',
    props: {
      task: Object,
      color: String,
      verify: Boolean,
    },
  }
</script>
