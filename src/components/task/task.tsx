import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { IDoto } from '../../types/data'
import Timer from '../timer/timer'

import './task.css'

interface State {
  label: string
  isEditiong: boolean
}

interface Props extends IDoto {
  onRename: (id: string, label: string) => void
  onToggleDone: () => void
  onDeleted: () => void
  runTimer: (id: string, timeLeft: number) => void
  deleteTimer: (id: string, idTimer: any) => void
}

class Task extends Component<Props, State> {
  state = {
    label: this.props.label,
    isEditiong: false,
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    this.setState(({ isEditiong }) => {
      return {
        isEditiong: !isEditiong,
      }
    })
    this.props.onRename(this.props.id, this.state.label)
  }

  onToggleChange = () => {
    this.setState(({ isEditiong }): Pick<State, 'isEditiong'> => {
      return {
        isEditiong: !isEditiong,
      }
    })
  }

  deleteTask = () => {
    clearTimeout(this.props.idTimer)
    this.props.onDeleted()
  }

  render() {
    const { onToggleDone, runTimer, deleteTimer, label, done, date, timeLeft, id, idTimer } = this.props
    const { isEditiong } = this.state
    const element = (
      <form className="form-task" onSubmit={this.onSubmit}>
        <input type="text" className="edit" defaultValue={label} onChange={this.onChange} />
      </form>
    )

    return (
      <li className={isEditiong ? 'editing' : '' || done ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
          <label htmlFor="#">
            <span className="title"> {label} </span>
            <Timer
              timeLeft={timeLeft}
              done={done}
              id={id}
              idTimer={idTimer}
              runTimer={runTimer}
              deleteTimer={deleteTimer}
            ></Timer>
            <span className="description">{formatDistanceToNow(date, { addSuffix: true })}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onToggleChange}></button>
          <button className="icon icon-destroy" onClick={this.deleteTask}></button>
        </div>
        {this.state.isEditiong ? element : null}
      </li>
    )
  }
}

export default Task
