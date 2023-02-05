import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

import { IDoto } from '../../types/data'

import './task.css'

interface State {
  label: string
}

interface Props extends IDoto {
  onRename: (id: string, label: string) => void
  onToggleDone: () => void
  onToggleChange: () => void
  onDeleted: () => void
}

class Task extends Component<Props, State> {
  state = {
    label: this.props.label,
  }

  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    this.props.onRename(this.props.id, this.state.label)
  }

  render() {
    const { label, onToggleDone, onToggleChange, done, date } = this.props

    switch (done) {
      case false:
        return (
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
              <label>
                <span className="description"> {label}</span>
                <span className="created">{formatDistanceToNow(date, { addSuffix: true })}</span>
              </label>
              <button className="icon icon-edit" onClick={onToggleChange}></button>
              <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
            </div>
          </li>
        )
      case true:
        return (
          <li className={'completed'}>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
              <label>
                <span className="description"> {label}</span>
                <span className="created">{formatDistanceToNow(date, { addSuffix: true })}</span>
              </label>
              <button className="icon icon-edit" onClick={onToggleChange}></button>
              <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
            </div>
          </li>
        )
      case 'change':
        return (
          <li className={'editing'}>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
              <label>
                <span className="description"> {label}</span>
                <span className="created">{formatDistanceToNow(date, { addSuffix: true })}</span>
              </label>
              <button className="icon icon-edit" onClick={onToggleChange}></button>
              <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
            </div>
            <form className="form-task" onSubmit={this.onSubmit}>
              <input type="text" className="edit" defaultValue={label} onChange={this.onChange} />
            </form>
          </li>
        )
      default:
        return (
          <li>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={onToggleDone} checked={!!done} readOnly />
              <label>
                <span className="description"> {label}</span>
                <span className="created">{formatDistanceToNow(date, { addSuffix: true })}</span>
              </label>
              <button className="icon icon-edit" onClick={onToggleChange}></button>
              <button className="icon icon-destroy" onClick={this.props.onDeleted}></button>
            </div>
          </li>
        )
    }
  }
}

export default Task
