<template>
    <div>
      <!-- Daftar album -->
      <ul>
        <li v-for="album in albums" :key="album.id">
          <button @click="showAlbumDetail(album.id)">{{ album.title }}</button>
        </li>
      </ul>
  
      <!-- Detail album -->
      <div v-if="selectedAlbum">
        <h2>{{ selectedAlbum.title }}</h2>
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
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const albums = ref([]);
  const selectedAlbum = ref(null);
  const photos = ref([]);
  
  const router = useRouter();
  
  const fetchAlbums = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums');
      albums.value = await response.json();
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
  
  const fetchPhotos = async (albumId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      photos.value = await response.json();
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };
  
  const showAlbumDetail = (albumId) => {
    const selected = albums.value.find(album => album.id === albumId);
    selectedAlbum.value = selected;
    fetchPhotos(albumId);
  };
  
  const showFullSize = (url) => {
    window.open(url, '_blank'); // Membuka foto dalam ukuran aslinya di tab baru
  };
  
  onMounted(fetchAlbums);
  </script>
  
  <style scoped>
  /* Your CSS styles here */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    display: inline-block; 
    margin: 5px;
  }
  
  img {
    width: 100px; /* Atur ukuran foto sesuai kebutuhan */
    height: auto;
    cursor: pointer;
    
  }
  </style>
  