export interface IDoto {
  label: string
  done: boolean
  id: string
  date: Date
  timeLeft: number
  idTimer: any
}

export interface IFilter {
  filterValue: string
}

export interface AppState extends IFilter {
  todoData: Array<IDoto>
}
