import React, { Component } from 'react'

import { IFilter } from '../../types/data'

import './task-filter.css'

interface Props extends IFilter {
  onToggleAll: () => void
  onToggleActive: () => void
  onToggleCompleted: () => void
}

class TaskFilter extends Component<Props, object> {
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

export default TaskFilter
