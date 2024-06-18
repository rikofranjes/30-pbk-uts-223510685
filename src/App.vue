<template>
  <q-layout view="hHh lpR fFf"> 
    <q-header1 elevated class="bg-brown text-white" id="header">
      <Navbar />
    </q-header1>

    <q-page-container class="content">

      <main class="app">
        <header>
          <nav>
            <ul class="todos1">
              <li @click="activeTab = 'Todos'" :class="{ 'active': activeTab === 'Todos' }" class="todos">Todos</li>
              <li @click="activeTab = 'Post'" :class="{ 'active': activeTab === 'Post' }" class="todos">Post</li>
              <li @click="activeTab = 'Albums'" :class="{ 'active': activeTab === 'Albums' }" class="todos">Albums</li>
            </ul>
          </nav>
        </header>
        <section>
          <Todos v-if="activeTab === 'Todos'" :todos="todos" @update:todos="updateTodos" />
          <Post v-if="activeTab === 'Post'" :users="users" :posts="posts" @update:posts="updatePosts">
            <template #post-extra="{ post }">
              <button @click="likePost(post)">Like</button>
            </template>
          </Post>
          <Albums v-if="activeTab === 'Albums'" :albums="albums" @update:albums="updateAlbums" />
        </section>
      </main>
    </q-page-container>

    <q-footer elevated class="bg-brown-8 text-white" id="footer">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <h5 href="#"> About Us</h5>
            <copyright />
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>

  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Todos from "./assets/Todos.vue"
import Post from "./assets/Post.vue"
import Albums from "./pages/Albums.vue"
import copyright from "./assets/copyrights.vue"

const activeTab = ref('Todos')
const todos = ref([])
const users = ref([])
const posts = ref([])
const albums = ref([])

const updateTodos = (newTodos) => {
  todos.value = newTodos
}

const updatePosts = (newPosts) => {
  posts.value = newPosts
}

const likePost = (post) => {
  alert(`You liked: ${post.title}`)
}

const updateAlbums = (newAlbums) => {
  albums.value = newAlbums
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
html, body, #q-app {
  height: 100%;
}

/* Warna dasar layout */
.q-layout {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.q-page-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.carousel-container,
.card-container {
  margin-bottom: 20px;
}

/* Header dengan warna coklat */
#header {
  background-color: #795548; /* Warna coklat untuk header */
  color: white; /* Warna teks putih */
  padding: 20px;
  position: absolute;
  margin: 0;
}

/* Footer dengan warna hitam */
#footer {
  text-align: center;
  background-color: #000000; /* Warna hitam untuk footer */
  color: white; /* Warna teks putih */
  padding: 1px;
  position: absolute;
}

h5 {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 100%;
  cursor: pointer;
  color: white; /* Warna teks putih */
}

/* Gaya untuk aplikasi utama */
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header untuk bagian utama */
header {
  background-color: #f3f3f3; /* Warna abu-abu muda */
  padding: 7px;
  text-align: center;
  width: 103%;
  border-radius: 88px 6px;
  margin-top: 22px;
}

/* Gaya navigasi */
nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav ul li {
  display: inline-block;
  margin-right: 60px;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
  color: #ff5722; /* Warna oranye untuk tab aktif */
}

/* Gaya untuk section */
section {
  margin-top: -7px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Gaya untuk item todos */
.todos {
  font-size: 17px;
  transition: transform 0.4s;
  color: #000; /* Warna teks hitam */
}

.todos:hover {
  transform: scale(1.5);
  transition: transform 0.4s;
  color: #ff5722; /* Warna oranye saat hover */
}

q-header1{
  width: 100%;
}
</style>
