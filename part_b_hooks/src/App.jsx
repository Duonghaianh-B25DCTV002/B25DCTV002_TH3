import React, { useState, useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import useFetch from './hooks/useFetch'
import HeaderClock from './components/HeaderClock'
import ExpenseForm from './components/ExpenseForm'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseList from './components/ExpenseList'

function App() {
  const [isDark, setIsDark] = useState(false)
  const toggleTheme = () => setIsDark(prev => !prev)
  const { data: expenses, isLoading, error, addItem, deleteItem } = useFetch()
  const [filter, setFilter] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = expenses
    .filter(e => filter === 'Tất cả' || e.category === filter)
    .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khoản chi này?')) {
      await deleteItem(id)
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`app ${isDark ? 'theme-dark' : 'theme-light'}`}>
        <div className="app-container">
          <HeaderClock />
          <ExpenseForm onAdd={addItem} />
          <ExpenseFilter
            filter={filter}
            onFilterChange={setFilter}
            onSearchChange={setSearchTerm}
          />
          {isLoading ? (
            <div className="loading-box">
              <div className="spinner"></div>
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : error ? (
            <div className="error-box">{error}</div>
          ) : (
            <ExpenseList expenses={filtered} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App

