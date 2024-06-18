import { defineStore } from 'pinia'
import axios from 'axios'

export const useAlbumStore = defineStore('album', {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums')
        this.albums = response.data
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        this.photos = response.data
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    },
  },
})
