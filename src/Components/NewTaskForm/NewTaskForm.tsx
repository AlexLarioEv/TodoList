import React, { useState } from 'react'
import './NewTaskForm.css'

interface Props {
  addItem: (text: string, timeLeft: number) => string
}

const NewTaskForm: React.FC<Props> = (props) => {
  const { addItem } = props

  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMinutes(e.target.value)
  }

  const onSecChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    const timeLeft = Number(minutes) * 60 + Number(seconds)
    e.preventDefault()
    if (label.match(/\S/)) {
      addItem(label, timeLeft)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type={'text'}
          className="new-todo"
          placeholder="Task"
          autoFocus
          onChange={onLabeChange}
          value={label}
          required
        />
        <input
          type={'number'}
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={onMinChange}
          value={minutes}
          min={0}
          max={60}
        />
        <input
          type={'number'}
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={onSecChange}
          value={seconds}
          min={0}
          max={60}
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

export default NewTaskForm
