import React, { Component } from 'react'
import PropsTypes from 'prop-types'

import './task-filter.css'

class TaskFilter extends Component {
  render() {
    const { onToggleAll, onToggleActive, onToggleCompleted, filterValue } = this.props

    return (
      <ul className="filters">
        <li>
          <button onClick={onToggleAll} className={filterValue === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li>
          <button onClick={onToggleActive} className={filterValue === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li>
          <button onClick={onToggleCompleted} className={filterValue === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TaskFilter.defaultProps = {
  filterValue: 'all',
}

TaskFilter.propsTypes = {
  filterValue: PropsTypes.string,
  onToggleAll: PropsTypes.func,
  onToggleActive: PropsTypes.func,
  onToggleCompleted: PropsTypes.func,
}

export default TaskFilter
