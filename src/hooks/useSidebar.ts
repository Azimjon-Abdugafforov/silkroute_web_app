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
    title: "Dashboard",
    to: "/dashboard",
    icon: "mdi:home",
  },
  {
    id: 1,
    title: "Employee",
    to: "/employee",
    icon: "mdi:data",
  },
  {
    id: 2,
    header: "Asosi menyu",
  },
  {
    id: 3,
    title: "Cards",
    icon: "mdi:home",
    childNav: [
      {
        id: 1,
        title: "Applications",
        to: "/applications",
        icon: "mdi:application",
      },
      {
        id: 2,
        title: "Products",
        to: "/products",
        icon: "mdi:progress-upload",
      },
    ],
  },
  {
    id: 1,
    title: "Tables",
    to: "/tables",
    icon: "mdi:data",
  },
]
