import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

class App extends Component {
  state = {
    todoData: [],
    filterValue: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: uuidv4(),
      date: new Date(),
    }
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  tooggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.tooggleProperty(todoData, id, 'done'),
      }
    })
  }

  onToggleChange = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: 'change' }

      return {
        todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)],
      }
    })
  }

  renameTask = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
        label: text,
      }

      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newData,
      }
    })
  }

  deletedTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return {
        todoData: newData,
      }
    })
  }

  toggleFilter = (text) => {
    this.setState({ filterValue: text })
  }

  filter(items, filter) {
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

  counterTask = () => {
    const valueFalse = this.state.todoData.reduce((acc, el) => acc + (el.done === false ? 1 : 0), 0)
    return this.state.todoData.reduce((acc, el) => acc + (el.done === 'change' ? 1 : 0), valueFalse)
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
          onToggleChange={this.onToggleChange}
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
