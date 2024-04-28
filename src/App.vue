<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])

const name = ref('')

const input_content = ref('')

const filterCompleted = ref(false)

const todos_asc = computed(() => todos.value.sort((a, b) => {
  return b.createdAt - a.createdAt
}))

const filteredTodos = computed(() => {
  if (filterCompleted.value) {
    return todos_asc.value.filter(todo => todo.done)
  } else {
    return todos_asc.value
  }
})

const addTodo = () => {
  if (input_content.value.trim() === '') {
    return
  }

  todos.value.push({
    content: input_content.value,
    done: false,
    createdAt: new Date().getTime()
  })

  input_content.value = ''
}

const removeTodo = todo => {
  const index = todos.value.findIndex(t => t === todo)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

watch(name, (newVal) => {
  localStorage.setItem('name', newVal)
})

watch(filterCompleted, (newVal) => {
  localStorage.setItem('filterCompleted', newVal)
})

onMounted(() => {
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
  filterCompleted.value = JSON.parse(localStorage.getItem('filterCompleted')) || false
})
</script>



<template>
  <main class="app">


    <section class="create-todo">

      <form @submit.prevent="addTodo">
        <h4>Buatlah daftar kegian anda</h4>
        <input type="text" placeholder="contoh [ Lari pagi ]" v-model="input_content" /> 
        <input type="submit" value="Tambah Kegiatan" />
       
      </form>
    </section>

    <section class="todo-list">
      <h3 class="kegiatan">Daftar Kegiatan </h3>

      <div class="list1">
      <div class="filter">
        <button @click="filterCompleted = !filterCompleted">{{ filterCompleted ? 'Tampilkan' : 'Sudah selesai' }}</button>
      </div>

      <div class="list">

        <div v-for="todo in filteredTodos" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">

          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>

        </div>
      </div>

      </div>
    </section>

  </main>
</template>


<style scoped>
.filter {
  margin-bottom: 10px;
}

.filter button {
  background-color: #7900ff; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

.filter button:hover {
  background-color: #45a049;
}
</style> 