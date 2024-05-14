<template>
  <main class="app">
    <header>
      <nav>
        <ul >
          <button @click="activeTab = 'Todos'" :class="{ 'active': activeTab === 'Todos' }" class="app1">Todos</button><br>
          <button @click="activeTab = 'Post'" :class="{ 'active': activeTab === 'Post' }"class="app1">Post</button>
        </ul>
      </nav>
    </header>

    <section v-if="activeTab === 'Todos'" class="create-todo">
      <form @submit.prevent="addTodo">
        <h4>Buatlah daftar kegiatan anda</h4>
        <input type="text" placeholder="contoh [ Lari pagi ]" v-model="input_content" />
        <input type="submit" value="Tambah Kegiatan" />
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
      </div>
    </section>

    <section v-if="activeTab === 'Post'" class="post-section">
      <h3>Pilih User:</h3>
      <select v-model="selectedUser">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>

      <div v-if="!loading">
        <h3>Postingan User: {{ selectedUser }}</h3>
        <div v-for="post in filteredPosts" :key="post.id">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
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

// Post Section
const activeTab = ref('Todos')
const selectedUser = ref(1) // Default user id
const users = ref([])
const posts = ref([])
const loading = ref(true)

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === selectedUser.value)
})

const loadPosts = async (userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    posts.value = await response.json()
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  // Fetch users and posts data from the API
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user')
  users.value = await usersResponse.json()
  posts.value = await postsResponse.json()
  loading.value = false; // Menandai loading selesai setelah data terambil
})

</script>

<style scoped>
/* Your CSS styles here */
.create-todo .todo-content input[type="text"] {
  color: white;
  background-color: rgba(0, 0, 0, 0);
}

.filter {
  margin-bottom: 10px;
}

.filter button {
  background-color: #7900ff;
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

.list {
  margin-top: -50px;
  padding: 35px;
}
.app1{
  margin-top: 8px;
  background-color: blue;
  box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  width: 100px;
  height: 40px;
}
.app1:hover{
  background-color: #45a049;
}
</style>
