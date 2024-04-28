import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../views/Dash_board.vue";
import Forms from "../views/Forms.vue";
import Tables from "../views/Tables.vue";
import UIElements from "../views/UIElements.vue";
import Login from "../views/Pages/Login.vue";
import Modal from "../views/Modal.vue";
import Card from "../views/CardView.vue";
import Blank from "../views/BlankView.vue";
import NotFound from "../views/NotFound.vue";
import Employee from '@/views/Employee/index.vue'
import CreateOrder from "@/views/Order/CreateOrder.vue";
import Layout from '@/views/Order/OrderNavs.vue';
import BecomDriverVue from "@/views/Driver/BecomDriver.vue";
import BaseAppViewVue from "@/views/BaseApp/BaseAppView.vue";''
import BaseLoaderVue from "@/components/BaseLoader.vue";
import SidebarVue from "@/components/Sidebar.vue";
import MyOrdersVue from "@/views/BaseApp/MyOrders.vue";
import ActiveOrdersVue from "@/views/BaseApp/ActiveOrders.vue";
import DriverOrdersVue from "@/views/BaseApp/Driver/DriverOrders.vue";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: BaseAppViewVue,
    meta: {
      layout: "empty"
    }
  },
  {
    path: '/loading',
    name: 'loading',
    component: BaseLoaderVue,
    meta: { layout: "empty" }
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms",
    name: "Forms",
    component: Forms,
    meta: { layout: '' }
  },
  {
    path: "/cards",
    name: "Cards",
    component: Card,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/employee",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/ui-elements",
    name: "UIElements",
    component: UIElements,
  },
  {
    path: "/modal",
    name: "Modal",
    component: Modal,
  },
  {
    path: "/my-orders",
    name: "my-orders",
    component: MyOrdersVue,
  },
  {
    path: "/blank",
    name: "Blank",
    component: Blank,
  },
  {
    path: '/create-order',
    name: 'order',
    component: CreateOrder,
    meta: { layout: "empty" }
  },
  {
    path:'/driver-current-orders',
    name: 'driver-current-orders',
    component: DriverOrdersVue,
  },
  {
    path: '/become-driver',
    name: 'become-driver',
    component: BecomDriverVue,
    meta: { layout: "empty" }
  },
  {
    path: '/active-orders',
    name: 'active-orders',
    component: ActiveOrdersVue,
  },

  {
    path: "/:pathMatch(.*)*", component: NotFound, meta: {
      layout: "emty"
    }
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});





export default router;
