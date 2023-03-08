import React from 'react'

import { IFilter } from '../../Types/Data'
import TaskFilter from '../TaskFilter/TaskFilter'

import './Footer.css'

interface Props extends IFilter {
  onToggleAll: (arg0: string) => void
  onToggleActive: (arg0: string) => void
  onToggleCompleted: (arg0: string) => void
  onToggleCrear: () => void
  unfinishedTask: () => number
}

const Footer: React.FC<Props> = (props) => {
  const { onToggleActive, onToggleAll, onToggleCompleted, filterValue, onToggleCrear, unfinishedTask } = props
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

export default Footer
