import React, { Component } from 'react'
import HeaderClock from './components/HeaderClock'
import ExpenseForm from './components/ExpenseForm'
import ExpenseFilter from './components/ExpenseFilter'
import ExpenseList from './components/ExpenseList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expenses: [
        { id: 1, name: 'Cơm trưa văn phòng', amount: 35000, category: 'Ăn uống', date: '2024-03-15' },
        { id: 2, name: 'Grab đi học', amount: 25000, category: 'Đi lại', date: '2024-03-15' },
        { id: 3, name: 'Mua sách React', amount: 150000, category: 'Học tập', date: '2024-03-14' },
        { id: 4, name: 'Xem phim CGV', amount: 90000, category: 'Giải trí', date: '2024-03-14' },
        { id: 5, name: 'Trà sữa Gong Cha', amount: 45000, category: 'Ăn uống', date: '2024-03-13' },
      ],
      filter: 'Tất cả'
    }
  }

  componentDidUpdate() {
    const total = this.state.expenses.reduce((s, e) => s + e.amount, 0)
    document.title = `Tổng chi: ${total.toLocaleString('vi-VN')}đ`
  }

  handleAdd = (expense) => {
    this.setState(prev => ({
      expenses: [...prev.expenses, { ...expense, id: Date.now() }]
    }))
  }

  handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khoản chi này?')) {
      this.setState(prev => ({
        expenses: prev.expenses.filter(e => e.id !== id)
      }))
    }
  }

  handleFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { expenses, filter } = this.state
    const filtered = filter === 'Tất cả'
      ? expenses
      : expenses.filter(e => e.category === filter)

    return (
      <div className="app">
        <HeaderClock />
        <ExpenseForm onAdd={this.handleAdd} />
        <ExpenseFilter filter={filter} onFilterChange={this.handleFilterChange} />
        <ExpenseList expenses={filtered} onDelete={this.handleDelete} />
      </div>
    )
  }
}

export default App

