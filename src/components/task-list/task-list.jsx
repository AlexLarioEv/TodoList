import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'

import './task-list.css'

class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onToggleChange, onRename } = this.props
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
          onToggleChange={() => onToggleChange(id)}
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

TaskList.defaultProp = {
  todos: [],
}

TaskList.propsTypes = {
  todos: PropTypes.arrayOf(PropTypes.string),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleChange: PropTypes.func,
  onRename: PropTypes.func,
}

export default TaskList
