import React, { useEffect, useRef, useState } from 'react'

interface Props {
  timeLeft: number
  done: boolean
  id: string
  runTimer: (id: string, timeLeft: number, timeRunner: boolean) => NodeJS.Timer
}

const TaskTimer: React.FC<Props> = (props) => {
  const { timeLeft, done, id, runTimer } = props
  const [timeRunner, setTimeRunner] = useState(false)
  const interavalRef = useRef<NodeJS.Timer>()

  const onClickPlay: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTimeRunner(true)
  }

  const onClickPause: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTimeRunner(false)
  }

  const formTime = () => {
    const hours = Math.floor(timeLeft / 60 / 60)
    const minutes = Math.floor(timeLeft / 60) - hours * 60
    const seconds = timeLeft % 60
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
    return formatted
  }

  useEffect(() => {
    if (timeRunner) {
      const idTimer = runTimer(id, timeLeft, timeRunner)
      interavalRef.current = idTimer
      if (timeLeft === 0 || done) setTimeRunner(false)
      return () => {
        clearTimeout(idTimer)
      }
    }
  }, [timeRunner, timeLeft])

  useEffect(() => {
    return () => {
      clearTimeout(interavalRef.current)
    }
  }, [])

  return (
    <span className="description">
      <button className="icon icon-play" onClick={onClickPlay}></button>
      <button className="icon icon-pause" onClick={onClickPause}></button>
      {timeLeft > 0 ? formTime() : 'ding-dong'}
    </span>
  )
}
export default TaskTimer
