import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import useClock from '../hooks/useClock'

function HeaderClock() {
  const time = useClock()
  const { isDark, toggleTheme } = useContext(ThemeContext)

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
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
        </button>
        <div className="header-clock">{timeStr}</div>
      </div>
    </div>
  )
}

export default HeaderClock
