/* eslint-disable prettier/prettier */

export interface IDoto {
  label: string
  done: boolean | string
  id: string
  date: Date
}

export interface IFilter {
  filterValue: string
}

export interface AppState extends IFilter {
  todoData: Array<IDoto>
}
