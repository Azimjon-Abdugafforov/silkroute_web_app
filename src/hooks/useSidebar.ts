import { ref } from "vue";

const isOpen = ref(false)

export function useSidebar() {
  return {
    isOpen
  };
}

export const navItems = [
  {
    id: 1,
    title: "Orders",
    icon: "mdi:order-bool-ascending",
    role: "ADMIN",
    childNav:[
      {
        id: 1,
        title: "Active orders",
        to: "/active-orders",
        icon: "mdi:shoe-print"
      },
      {
        id:1,
        title: "Cancelled orders",
        to: "/cancelled-orders",
        icon: "mdi:close-box-multiple-outline"
      },
      {
        id: 1,
        title: "Applications",
        to: "/applications",
        icon: "mdi:application",
        role: "ADMIN"
      },
    ]
  },
  {
    id: 1,
    title: "My Orders",
    to: "/my-orders",
    icon: "mdi:home",
    role: "USER"
  },

  {
    id: 1,
    title: "Employee",
    to: "/employee",
    icon: "mdi:data",
    role: "ADMIN"
  },
  {
    id: 2,
    header: "Main manu",
  },
  {
    id:3,
    title:"Profile",
    icon: "mdi:account",
    to: "/employee",
    role: "USER"
  },
  {
    id: 3,
    title: "Cards",
    icon: "mdi:cards",
    role: "USER",
    childNav: [
      {
        id: 1,
        title: "Applications",
        to: "/applications",
        icon: "mdi:application",
        role: "ADMIN"
      },
      {
        id: 2,
        title: "Products",
        to: "/products",
        icon: "mdi:progress-upload",
        role: "ADMIN"
      },
    ],
  },
  {
    id: 1,
    title: "Statistics",
    icon: "mdi:data",
    role: "ADMIN",
    childNav:[
      {
        id:1,
        title: "Annaul Statistics",
        icon: "mdi:chart-areaspline",
        role: "ADMIN",
        to: "/general-stats"
      },
      {
        id:1,
        title: "Statistics by term",
        icon: "mdi:chart-box-outline",
        role: "ADMIN",
        to: "/term-stats"
      },
    ]
  },
  {
    id: 1,
    title: "Trucks",
    to: "/trucks",
    icon: "mdi:truck",
    role: "ADMIN"
  },
]
