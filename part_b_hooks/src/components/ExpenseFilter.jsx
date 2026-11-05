import React, { useState, useRef, useEffect } from 'react'

const FILTERS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function ExpenseFilter({ filter, onFilterChange, onSearchChange }) {
  const [searchInput, setSearchInput] = useState('')
  const debounceRef = useRef(null)

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onSearchChange(value)
    }, 500)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="filter-section">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          value={searchInput}
          onChange={handleSearch}
          placeholder="Tìm kiếm khoản chi..."
        />
      </div>
      <div className="expense-filter">
        {FILTERS.map(item => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? 'active' : ''}`}
            onClick={() => onFilterChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ExpenseFilter
