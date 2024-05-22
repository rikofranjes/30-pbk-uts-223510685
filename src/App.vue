<template>
  <main class="app">
    <header>
      <nav>
        <ul class="todos1">
          <li @click="activeTab = 'Todos'" :class="{ 'active': activeTab === 'Todos' }" class="todos">Todos</li>
          <li @click="activeTab = 'Post'" :class="{ 'active': activeTab === 'Post' }" class="todos">Post</li>
        </ul>
      </nav>
    </header>

    <Todos v-if="activeTab === 'Todos'" :todos="todos" @update:todos="updateTodos" />
    <Post v-if="activeTab === 'Post'" :users="users" :posts="posts" @update:posts="updatePosts">
      <template #post-extra="{ post }">
        <button @click="likePost(post)">Like</button>
      </template>
    </Post>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Todos from './assets/Todos.vue'
import Post from './assets/Post.vue'

const activeTab = ref('Todos')
const todos = ref([])
const users = ref([])
const posts = ref([])

const updateTodos = (newTodos) => {
  todos.value = newTodos
}

const updatePosts = (newPosts) => {
  posts.value = newPosts
}

const likePost = (post) => {
  alert(`You liked: ${post.title}`)
}

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})
</script>

<style scoped>
/* Your CSS styles here */
.app1 {
  margin-top: 8px;
  background-color: blue;
  box-shadow: 0 0 4px rgba(0, 0, 0, 1);
  width: 100px;
  height: 40px;
}

.app1:hover {
  background-color: #45a049;
}

header {
  background-color: #f3f3f3;
  padding: 10px 0;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}

section {
  margin-top: 20px;
}
</style>
