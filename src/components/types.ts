import { RouteLocationRaw } from "vue-router";

export interface INavItem{
  id: number,
  title: string,
  to: RouteLocationRaw,
  icon: string,
}

export interface INavGroup{
  id: number, 
  title: string, 
  icon: string,
  childNav: Array<INavItem | INavGroup >
}

export interface INavHeader{
  id: number,
  header: string,
}