<template>
    <div>
      <h2>{{ album.title }}</h2>
      <ul>
        <li v-for="photo in photos" :key="photo.id">
          <img
            :src="photo.thumbnailUrl"
            :alt="photo.title"
            @click="showFullSize(photo.url)"
          />
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  import { useRouter } from 'vue-router';
  
  const album = ref(null);
  const photos = ref([]);
  
  const router = useRouter();
  
  const showFullSize = (url) => {
    window.open(url, '_blank'); // Membuka foto dalam ukuran aslinya di tab baru
  };
  
  // Fetch daftar foto berdasarkan album ID
  const fetchPhotos = async () => {
    const albumId = router.currentRoute.value.params.id;
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      photos.value = await response.json();
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  
  onMounted(fetchPhotos);
  
  const props = defineProps(['album']);
  </script>
  