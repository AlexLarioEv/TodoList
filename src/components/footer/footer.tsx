import React, { Component } from 'react'

import { IFilter } from '../../types/data'
import TaskFilter from '../task-filter/task-filter'

import './footer.css'

interface Props extends IFilter {
  onToggleAll: (arg0: string) => void
  onToggleActive: (arg0: string) => void
  onToggleCompleted: (arg0: string) => void
  onToggleCrear: () => void
  unfinishedTask: () => number
}

class Footer extends Component<Props, object> {
  render() {
    const { onToggleActive, onToggleAll, onToggleCompleted, filterValue, onToggleCrear, unfinishedTask } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{unfinishedTask()} items left</span>
        <TaskFilter
          onToggleAll={() => onToggleAll('all')}
          onToggleActive={() => onToggleActive('active')}
          onToggleCompleted={() => onToggleCompleted('completed')}
          filterValue={filterValue}
        />
        <button className="clear-completed" onClick={onToggleCrear}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
