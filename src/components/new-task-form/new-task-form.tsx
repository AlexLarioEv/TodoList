/* eslint-disable prefer-destructuring */
import React, { Component } from 'react'
import './new-task-form.css'

interface State {
  label: string
  minutes: string
  seconds: string
}

interface Props {
  addItem: (text: string, timeLeft: number) => string
}

class NewTaskForm extends Component<Props, State> {
  state = {
    label: '',
    minutes: '',
    seconds: '',
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

  onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const timeLeft = Number(this.state.minutes) * 60 + Number(this.state.seconds)
    e.preventDefault()
    if (this.state.label.match(/\S/)) {
      this.props.addItem(this.state.label, timeLeft)
      this.setState({
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
