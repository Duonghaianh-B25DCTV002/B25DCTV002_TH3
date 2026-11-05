import React from 'react'

const ALL_CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

function ExpenseList({ expenses, onDelete }) {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  const categoryTotals = ALL_CATEGORIES.map(cat => ({
    name: cat,
    total: expenses.filter(e => e.category === cat).reduce((s, e) => s + Number(e.amount), 0)
  }))

  return (
    <div className="expense-list">
      <div className="category-stats">
        {categoryTotals.map(ct => (
          <div key={ct.name} className="stat-card">
            <span className="stat-label">{ct.name}</span>
            <span className="stat-value">{ct.total.toLocaleString('vi-VN')}đ</span>
          </div>
        ))}
      </div>

      <h2>Danh sách chi tiêu</h2>
      {expenses.length === 0 ? (
        <p className="empty">Không có khoản chi nào.</p>
      ) : (
        <div>
          {expenses.map(e => (
            <div key={e.id} className="expense-item">
              <div className="expense-info">
                <span className="category-badge">
                  {e.category}
                </span>
                <span className="expense-name">{e.name}</span>
                <span className="expense-date">{e.date}</span>
              </div>
              <div className="expense-actions">
                <span className="expense-amount">
                  {Number(e.amount).toLocaleString('vi-VN')}đ
                </span>
                <button className="btn-delete" onClick={() => onDelete(e.id)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <div className="expense-total">
            <span>Tổng cộng:</span>
            <span className="total-amount">{total.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExpenseList
