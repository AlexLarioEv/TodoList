import React, { Component } from 'react'

import { IDoto } from '../../types/data'
import Task from '../task/task'

import './task-list.css'

interface ListProps {
  todos: Array<IDoto>
  onDeleted: (id: string) => void
  onToggleDone: (id: string) => void
  onRename: (id: string, text: string) => void
}

class TaskList extends Component<ListProps, object> {
  render() {
    const { todos, onDeleted, onToggleDone, onRename } = this.props
    const elements = todos.map((item) => {
      const { id, label, ...itemProps } = item

      return (
        <Task
          {...itemProps}
          key={id}
          id={id}
          label={label}
          onRename={onRename}
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
}

export default TaskList
