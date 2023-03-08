import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { IDoto } from '../../Types/Data'
import TaskTimer from '../TaskTimer/TaskTimer'

import './Task.css'

interface Props extends IDoto {
  onRename: (id: string, label: string) => void
  onToggleDone: () => void
  onDeleted: () => void
  runTimer: (id: string, timeLeft: number, timeRunner: boolean) => NodeJS.Timer
}

const Task: React.FC<Props> = (props) => {
  const { id, label, done, date, timeLeft, onRename, runTimer, onDeleted, onToggleDone } = props

  const [labelSearch, setLabelSearch] = useState(label)
  const [isEditiong, setIsEditiong] = useState(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabelSearch(e.target.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setIsEditiong((valBol) => !valBol)
    onRename(id, label)
  }

  const onToggleChange = () => {
    setIsEditiong((valBol) => !valBol)
  }

  const deleteTask = () => {
    onDeleted()
  }

  const element = (
    <form className="form-task" onSubmit={onSubmit}>
      <input type="text" className="edit" defaultValue={labelSearch} onChange={onChange} />
    </form>
  )

  return (
    <li className={isEditiong ? 'editing' : '' || done ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
        <label htmlFor="#">
          <span className="title"> {labelSearch} </span>
          <TaskTimer timeLeft={timeLeft} done={done} id={id} runTimer={runTimer}></TaskTimer>
          <span className="description">{formatDistanceToNow(date, { addSuffix: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleChange}></button>
        <button className="icon icon-destroy" onClick={deleteTask}></button>
      </div>
      {isEditiong ? element : null}
    </li>
  )
}

export default Task
