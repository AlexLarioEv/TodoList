import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IDoto } from '../../Types/Data'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

const App: React.FC = () => {
  const [todoData, setTodoData] = useState<Array<IDoto>>([])
  const [filterValue, setFilterValue] = useState('all')

  const createTodoItem = (label: string, timeLeft: number) => {
    return {
      label,
      done: false,
      id: uuidv4(),
      date: new Date(),
      timeLeft,
    }
  }

  const addItem = (text: string, timeLeft: number) => {
    const newItem = createTodoItem(text, timeLeft)
    setTodoData([...todoData, newItem])
    return newItem.id
  }

  const onToggleDone = (id: string): void => {
    const idx = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[idx]
    const newItem = { ...oldItem, done: !oldItem.done }

    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)])
  }

  const renameTask = (id: string, text: string) => {
    const idx = todoData.findIndex((el) => el.id === id)

    const oldItem = todoData[idx]
    const newItem = {
      ...oldItem,
      label: text,
    }
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)])
  }

  const deletedTask = (id: string) => {
    setTodoData((stateTodoData) => {
      const idx = stateTodoData.findIndex((el) => el.id === id)
      return [...stateTodoData.slice(0, idx), ...stateTodoData.slice(idx + 1)]
    })
  }

  const toggleFilter = (text: string) => {
    setFilterValue(text)
  }

  const filter = (items: Array<IDoto>, filterVal: string) => {
    switch (filterVal) {
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

  const clerList = () => {
    setTodoData(todoData.filter((item) => !item.done))
  }

  const counterTask = (): number => {
    return todoData.reduce((acc, el) => acc + (el.done === false ? 1 : 0), 0)
  }

  const runTimer = (id: string, timeLeft: number) => {
    const idTimer: ReturnType<typeof setInterval> = setInterval(() => {
      setTodoData((stateTodoData) => {
        const idx = stateTodoData.findIndex((el) => el.id === id)
        const oldItem = stateTodoData[idx]
        timeLeft -= 1
        const newItem = {
          ...oldItem,
          timeLeft,
        }
        return [...stateTodoData.slice(0, idx), newItem, ...stateTodoData.slice(idx + 1)]
      })
    }, 1000)
    return idTimer
  }

  const visableItem = filter(todoData, filterValue)
  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        todos={visableItem}
        onDeleted={deletedTask}
        onToggleDone={onToggleDone}
        onRename={renameTask}
        runTimer={runTimer}
      />
      <Footer
        onToggleAll={toggleFilter}
        onToggleActive={toggleFilter}
        onToggleCompleted={toggleFilter}
        filterValue={filterValue}
        onToggleCrear={clerList}
        unfinishedTask={counterTask}
      />
    </section>
  )
}

export default App
