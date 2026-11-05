import React, { Component } from 'react'

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

class ExpenseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      amount: '',
      category: CATEGORIES[0],
      date: new Date().toISOString().split('T')[0],
      errors: {}
    }
  }

  validate = () => {
    const errors = {}
    if (!this.state.name.trim()) errors.name = 'Vui lòng nhập nội dung'
    if (!this.state.amount || Number(this.state.amount) <= 0) errors.amount = 'Số tiền phải lớn hơn 0'
    if (!this.state.date) errors.date = 'Vui lòng chọn ngày'
    return errors
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()
    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
      return
    }
    this.props.onAdd({
      name: this.state.name.trim(),
      amount: Number(this.state.amount),
      category: this.state.category,
      date: this.state.date
    })
    this.setState({
      name: '',
      amount: '',
      category: CATEGORIES[0],
      date: new Date().toISOString().split('T')[0],
      errors: {}
    })
  }

  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
      errors: { ...this.state.errors, [field]: '' }
    })
  }

  render() {
    const { name, amount, category, date, errors } = this.state
    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <h2>Thêm khoản chi</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nội dung</label>
            <input
              type="text"
              value={name}
              onChange={this.handleChange('name')}
              placeholder="VD: Cơm trưa"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Số tiền (VNĐ)</label>
            <input
              type="number"
              value={amount}
              onChange={this.handleChange('amount')}
              placeholder="VD: 50000"
            />
            {errors.amount && <span className="error">{errors.amount}</span>}
          </div>
          <div className="form-group">
            <label>Loại</label>
            <select value={category} onChange={this.handleChange('category')}>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Ngày chi</label>
            <input
              type="date"
              value={date}
              onChange={this.handleChange('date')}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>
        </div>
        <button type="submit" className="btn-add">Thêm khoản chi</button>
      </form>
    )
  }
}

export default ExpenseForm

