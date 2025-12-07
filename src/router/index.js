import { createRouter, createWebHistory } from 'vue-router'
import FlowCanvasView from '../views/FlowCanvasView.vue'

const routes = [
  {
    path: '/',
    name: 'FlowCanvas',
    component: FlowCanvasView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
