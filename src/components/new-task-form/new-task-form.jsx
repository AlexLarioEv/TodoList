import React, { Component } from 'react'
import './new-task-form.css'

class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabeChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label !== '') {
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
