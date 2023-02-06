import React, { Component } from 'react'
import './new-task-form.css'

interface State {
  label: string
}

interface Props {
  addItem: (arg0: string) => void
}

class NewTaskForm extends Component<Props, State> {
  state = {
    label: '',
  }

  onLabeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (this.state.label.match(/\S/)) {
      this.props.addItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <form className="form-todo" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onLabeChange}
            value={this.state.label}
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
