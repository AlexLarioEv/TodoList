import React, { Component } from 'react'

interface Props {
  timeLeft: number
  done: boolean
  id: string
  idTimer: any
  runTimer: (id: string, timeLeft: number) => void
}

interface State {
  timeRunner: boolean
}

class Timer extends Component<Props, State> {
  state = {
    timeRunner: false,
  }

  onClickPlay: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({ timeRunner: true })
  }

  onClickPause: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({ timeRunner: false })
  }

  stopTimer(id: NodeJS.Timer) {
    clearTimeout(id)
  }

  formTime(timeLeft: number) {
    const hours = Math.floor(timeLeft / 60 / 60)
    const minutes = Math.floor(timeLeft / 60) - hours * 60
    const seconds = timeLeft % 60
    const formatted = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
    return formatted
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (
      prevState.timeRunner !== this.state.timeRunner ||
      prevProps.done !== this.props.done ||
      prevProps.timeLeft !== this.props.timeLeft
    ) {
      if (
        !this.props.done &&
        this.state.timeRunner &&
        prevProps.timeLeft === this.props.timeLeft &&
        this.props.timeLeft > 0
      ) {
        this.props.runTimer(this.props.id, this.props.timeLeft)
      }
      if (!this.state.timeRunner || this.props.done || this.props.timeLeft <= 0) {
        clearTimeout(this.props.idTimer)
        this.setState({ timeRunner: false })
      }
    }
  }

  componentWillUnmount(): void {
    window.localStorage.setItem('timeRunner', String(this.state.timeRunner))
  }

  componentDidMount(): void {
    const timeRunner = window.localStorage.getItem('timeRunner')
    window.localStorage.clear()
    if (timeRunner !== 'null') {
      this.setState({ timeRunner: JSON.parse(timeRunner!) })
    }
  }

  render(): React.ReactNode {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onClickPlay}></button>
        <button className="icon icon-pause" onClick={this.onClickPause}></button>
        {this.props.timeLeft > 0 ? this.formTime(this.props.timeLeft) : 'ding-dong'}
      </span>
    )
  }
}
export default Timer
