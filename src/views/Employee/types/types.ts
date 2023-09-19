export interface INewUser{
  id: number,
  username: string, 
  
}

export interface INewUser{
  id: number,
  name: string, 
  lastName: string,
  number: string,

}
export interface IUsers{
  id: number,
  username: string,
  name: string,
  lastname: string, 
  phone: string, 
  branch: IBranch,
  position: IPosition,
  is_active: boolean
  deparment: IDeparment
}

export interface ICurrentUser{
  name: string, 
  username: string, 
  branch_id: number,
  lastname: string,
  position_id: number,
  phone: string,
  password: string,
  password_confirm: string,
  region_id: number,
  department_id: number

}


export interface IDeparment{
  id: number, 
  name: string,
}

export interface IPosition{
  id: number,
  title: string,
  salary: number,
}
export interface IBranch{
  id: number,
  name: string, 
  code: string,
  region: IRegion
}

export interface IRegion{
  id: number,
  name: string
}