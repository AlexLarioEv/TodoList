import React from 'react'

import { IDoto } from '../../Types/Data'
import Task from '../Task/Task'

import './TaskList.css'

interface ListProps {
  todos: Array<IDoto>
  onDeleted: (id: string) => void
  onToggleDone: (id: string) => void
  onRename: (id: string, text: string) => void
  runTimer: (id: string, timeLeft: number, timeRunner: boolean) => NodeJS.Timer
}

const TaskList: React.FC<ListProps> = (props) => {
  const { todos, onDeleted, onToggleDone, onRename, runTimer } = props
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        {...itemProps}
        key={id}
        id={id}
        onRename={onRename}
        runTimer={runTimer}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default TaskList
