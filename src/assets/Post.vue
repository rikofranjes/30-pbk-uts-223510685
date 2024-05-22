<template>
    <section class="post-section">
      <h3>Pilih User:</h3>
      <select v-model="selectedUser" @change="loadPosts(selectedUser)">
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
  
      <div v-if="posts.length">
        <h3>Postingan User: {{ selectedUser }}</h3>
        <div v-for="post in filteredPosts" :key="post.id">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
          <slot name="post-extra" :post="post"></slot> <!-- Slot for extra content -->
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    users: {
      type: Array,
      required: true
    },
    posts: {
      type: Array,
      required: true
    }
  })
  
  const emit = defineEmits(['update:posts'])
  
  const selectedUser = ref(1) // Default user id
  
  const filteredPosts = computed(() => {
    return props.posts.filter(post => post.userId === selectedUser.value)
  })
  
  const loadPosts = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      const data = await response.json()
      emit('update:posts', data)
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error)
    }
  }
  
  onMounted(async () => {
    await loadPosts(selectedUser.value)
  })
  </script>
  
  <style scoped>
  /* Your CSS styles here */
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
  
  select {
    padding: 5px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  </style>
  