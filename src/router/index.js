import { createRouter, createWebHistory } from 'vue-router';
import Albums from '../pages/Albums.vue';
import AlbumDetail from '../pages/AlbumDetail.vue';

const routes = [
  {
    path: '/albums',
    name: 'Albums',
    component: Albums
  },
  {
    path: '/albums/:id',
    name: 'AlbumDetail',
    component: AlbumDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
