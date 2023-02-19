/* eslint-disable no-param-reassign */
import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { AppState, IDoto } from '../../types/data'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

type State = Readonly<AppState>

class App extends Component<object, State> {
  state: State = {
    todoData: [],
    filterValue: 'all',
  }

  createTodoItem(label: string, seconds: string, minutes: string) {
    return {
      label,
      done: false,
      id: uuidv4(),
      date: new Date(),
      seconds,
      minutes,
    }
  }

  addItem = (text: string, seconds: string, minutes: string) => {
    const newItem = this.createTodoItem(text, seconds, minutes)

    this.setState(({ todoData }): Pick<State, 'todoData'> => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
    return newItem.id
  }

  onToggleDone = (id: string): void => {
    this.setState(({ todoData }): Pick<State, 'todoData'> => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done }
      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  renameTask = (id: string, text: string) => {
    this.setState(({ todoData }): Pick<State, 'todoData'> => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        label: text,
      }

      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newData,
      }
    })
  }

  deletedTask = (id: string) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newData,
      }
    })
  }

  toggleFilter = (text: string) => {
    this.setState({ filterValue: text })
  }

  filter(items: Array<IDoto>, filter: string) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'completed':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  clerList = () => {
    this.setState(({ todoData }) => {
      const oldArray = todoData.filter((item) => !item.done)
      return {
        todoData: oldArray,
      }
    })
  }

  counterTask = (): number => {
    return this.state.todoData.reduce((acc, el) => acc + (el.done === false ? 1 : 0), 0)
  }

  render() {
    const visableItem = this.filter(this.state.todoData, this.state.filterValue)
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={visableItem}
          onDeleted={this.deletedTask}
          onToggleDone={this.onToggleDone}
          onRename={this.renameTask}
        />
        <Footer
          onToggleAll={this.toggleFilter}
          onToggleActive={this.toggleFilter}
          onToggleCompleted={this.toggleFilter}
          filterValue={this.state.filterValue}
          onToggleCrear={this.clerList}
          unfinishedTask={this.counterTask}
        />
      </section>
    )
  }
}

export default App
