/* eslint-disable prefer-destructuring */
import React, { Component } from 'react'
import './new-task-form.css'

interface State {
  label: string
  minutes: string
  seconds: string
  id: string
}

interface Props {
  addItem: (text: string, seconds: string, minutes: string) => string
}

class NewTaskForm extends Component<Props, State> {
  state = {
    label: '',
    minutes: '',
    seconds: '',
    id: '',
  }

  onLabeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      minutes: e.target.value,
    })
  }

  onSecChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      seconds: e.target.value,
    })
  }

  runTimer() {
    let seconds = this.state.seconds
    let minutes = this.state.minutes
    setInterval(() => {
      if (Number(seconds) >= 5) {
        minutes = String(Number(minutes) + 1)
        seconds = '0'
      }
      seconds = String(Number(seconds) + 1)
    }, 1000)
    return seconds
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (this.state.label.match(/\S/)) {
      const id = this.props.addItem(this.state.label, this.state.seconds, this.state.minutes)
      this.setState({
        id,
        label: '',
        minutes: '',
        seconds: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type={'text'}
            className="new-todo"
            placeholder="Task"
            autoFocus
            onChange={this.onLabeChange}
            value={this.state.label}
            required
          />
          <input
            type={'number'}
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.onMinChange}
            value={this.state.minutes}
            min={0}
            max={60}
          />
          <input
            type={'number'}
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.onSecChange}
            value={this.state.seconds}
            min={0}
            max={60}
          />
          <button type="submit"></button>
        </form>
      </header>
    )
  }
}

export default NewTaskForm
