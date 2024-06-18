<template>
  <section class="create-todo">
    <h4>Buatlah daftar kegiatan anda</h4>
    <form @submit.prevent="addTodo">
      <input type="text" placeholder="contoh [ Lari pagi ]" v-model="input_content" />
      <button type="submit" class="button">
        <span class="button__text">Tambah Kegiatan</span>
        <span class="button__icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
      </button>
    </form>

    <div class="todo-list">
      <h3 class="kegiatan">Daftar Kegiatan</h3>
      <div class="list1">
        <div class="filter">
          <button @click="filterCompleted = !filterCompleted">{{ filterCompleted ? 'Tampilkan' : 'Sudah selesai' }}</button>
        </div>

        <div class="list">
          <div v-for="todo in filteredTodos" :key="todo.createdAt" :class="`todo-item ${todo.done && 'done'}`">
            <label>
              <input type="checkbox" v-model="todo.done" @change="updateTodo(todo)" />
              <span :class="`bubble ${todo.category}`"></span>
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.content" :readonly="true" />
            </div>

            <div class="actions">
              <button class="delete" @click="removeTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:todos'])

const todos = ref(props.todos)
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
  emit('update:todos', todos.value)
}

const updateTodo = (todo) => {
  emit('update:todos', todos.value)
}

const removeTodo = todo => {
  const index = todos.value.findIndex(t => t === todo)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
  emit('update:todos', todos.value)
}

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal))
}, { deep: true })

const name = ref('')

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

<style scoped>
.create-todo form {
  display: flex;
  align-items: center;
  gap: 0; 
  margin-bottom: -10px;
}

.create-todo input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px; /* Adjust the width as needed */
}


.delete{
  border-radius: 4px 4px ;
  margin-bottom: 10px;
}
.delete:hover{
background-color: red;
color:white;
}
.kegiatan{
width: 400px;
  font-size: 21px;
}

.create-todo .todo-content input[type="text"] {
  color: black;
  margin-bottom:1px;
  height: 38px;
  width: 140px;
}

.filter {
  margin-bottom: 4px;
}

.filter button {
  background-color: #7900ff;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

.filter button:hover {
  background-color: #45a049;
}


/*===================================================================================*/
.button {
  position: relative;
  width: 140px;
  height: 46px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
  border-radius: 4px 4px; 
  margin-left: -5px; 
}

.button, .button__icon, .button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(-4px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 105%;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px 4px;
}

.button .svg {
  width: 30px;
  stroke: #fff;
}

.button:hover {
  background: #34974d;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #2e8644;
}

.button:active {
  border: 1px solid #2e8644;
}
</style>