import { createRouter, createWebHistory } from 'vue-router'
import PhotoRecommendations from "../pages/PhotoRecommendations.vue";
import PhotoUpload from "../pages/PhotoUpload.vue";

const routes = [
    { path: '/', component: PhotoRecommendations },
    { path: '/upload', component: PhotoUpload }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
