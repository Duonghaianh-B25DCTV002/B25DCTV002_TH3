import React, { useState, useRef } from 'react'

const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)

  const validate = () => {
    const errs = {}
    if (!name.trim()) errs.name = 'Vui lòng nhập nội dung'
    if (!amount || Number(amount) <= 0) errs.amount = 'Số tiền phải lớn hơn 0'
    if (!date) errs.date = 'Vui lòng chọn ngày'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    try {
      await onAdd({
        name: name.trim(),
        amount: Number(amount),
        category,
        date
      })
      setName('')
      setAmount('')
      setCategory(CATEGORIES[0])
      setDate(new Date().toISOString().split('T')[0])
      setErrors({})
      nameRef.current.focus()
    } catch {
      // error handled by useFetch
    }
  }

  const clearError = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Thêm khoản chi</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Nội dung</label>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); clearError('name') }}
            placeholder="VD: Cơm trưa"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Số tiền (VNĐ)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); clearError('amount') }}
            placeholder="VD: 50000"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>
        <div className="form-group">
          <label>Loại</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            onChange={(e) => { setDate(e.target.value); clearError('date') }}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>
      </div>
      <button type="submit" className="btn-add">Thêm khoản chi</button>
    </form>
  )
}

export default ExpenseForm

