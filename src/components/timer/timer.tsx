import React, { Component } from 'react'

interface Props {
  minutes: string
  seconds: string
}

interface State {
  minutes: string
  seconds: string
  timeRunner: boolean
}

class Timer extends Component<Props, State> {
  state = {
    minutes: this.props.minutes,
    seconds: this.props.seconds,
    timeRunner: true,
  }

  onClickPlay = () => {
    this.setState({ timeRunner: true })
  }

  onClickPause = () => {
    this.setState({ timeRunner: false })
  }

  runTimer(seconds: string, minutes: string) {
    setInterval(() => {
      if (this.state.timeRunner) {
        if (Number(seconds) <= 0) {
          if (Number(minutes) <= 0) {
            return this.setState({ timeRunner: false, seconds: 'Dzin!!!', minutes: 'Dzin' })
          }
          minutes = String(Number(minutes) - 1)
          seconds = '60'
        }
        seconds = String(Number(seconds) - 1)
        this.setState({ seconds, minutes })
      }
    }, 1000)
    return this.setState({ seconds, minutes })
  }

  componentDidMount(): void {
    this.runTimer(this.state.seconds, this.state.minutes)
  }

  render(): React.ReactNode {
    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.onClickPlay}></button>
        <button className="icon icon-pause" onClick={this.onClickPause}></button>
        {this.state.minutes.padStart(2, '0')}:{this.state.seconds.padStart(2, '0')}
      </span>
    )
  }
}
export default Timer
