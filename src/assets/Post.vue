<template>
  <section class="post-section">
    <h3 class="ko">Pilih User:</h3>
    <select v-model="selectedUser" @change="loadPosts(selectedUser)">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <div v-if="posts.length">
      <h3 class="ko">Postingan User: {{ selectedUser }}</h3>
      <div v-for="post in filteredPosts" :key="post.id" class="post">
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

/* Styles for centering content */
.post-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  
}

h3 {
  margin-bottom: 5px;
}

select {
  padding: 6px 8px;
  font-size: 14px;
  margin-bottom: 1px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  box-sizing: border-box;
}

.post {
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 7px;
  margin-bottom: 17px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post h4 {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}

.post p {
  font-size: 16px;
  color: #666;
}

/* Styles for loading message */
.loading {
  font-size: 16px;
  color: #999;
}
.ko{
  font-size: 22px;
}

</style>


