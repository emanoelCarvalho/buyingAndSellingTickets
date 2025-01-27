import { createRouter, createWebHistory } from 'vue-router'
import EventForm from '@/components/EventForm.vue'
import BuyTicket from '@/components/BuyTicket.vue'
import Home from '@/components/Home.vue'
import Register from '@/components/Register.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "EventForm",
      component: EventForm,
    },
    {
      path: "/buyTicket",
      name: "BuyTicket",
      component: BuyTicket,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    }
  ],
})

export default router