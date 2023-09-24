import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ServiceView from "../views/ServiceView";
import WeatherView from "../views/WeatherView";
import TableView from "../views/TableView";
import ReservationView from "../views/ReservationView";
import ReservationsTableView  from "../views/ReservationsTableView";
import CustomerReservationHistoryView from "../views/CustomerReservationHistoryView";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: LoginView
  },
  {
    path: '/services',
    name: 'services',
    component: ServiceView
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
    },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView
  },
    {
    path: '/reservationtableview',
    name: 'reservationtableview',
    component: ReservationsTableView
    },
    {
    path: '/customerreservationhistory',
    name: 'customerreservationhistory',
    component: CustomerReservationHistoryView
    }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
