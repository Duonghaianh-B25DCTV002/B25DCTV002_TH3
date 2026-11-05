import React, { Component } from 'react'

class HeaderClock extends Component {
  constructor(props) {
    super(props)
    this.state = { time: new Date() }
    this.timer = null
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const { time } = this.state
    const timeStr = time.toLocaleTimeString('vi-VN')
    const dateStr = time.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return (
      <div className="header">
        <div className="header-title">
          <h1>Sổ Chi Tiêu</h1>
          <p className="header-date">{dateStr}</p>
        </div>
        <div className="header-clock">{timeStr}</div>
      </div>
    )
  }
}

export default HeaderClock

