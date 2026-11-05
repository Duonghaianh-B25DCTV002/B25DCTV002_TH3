import React, { Component } from 'react'

const FILTERS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

class ExpenseFilter extends Component {
  render() {
    const { filter, onFilterChange } = this.props
    return (
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
    )
  }
}

export default ExpenseFilter
