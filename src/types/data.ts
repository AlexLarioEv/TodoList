export interface IDoto {
  label: string
  done: boolean | string
  id: string
  date: Date
  seconds: string
  minutes: string
}

export interface IFilter {
  filterValue: string
}

export interface AppState extends IFilter {
  todoData: Array<IDoto>
}
