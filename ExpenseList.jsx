import React, { Component } from 'react'

class ExpenseList extends Component {
  render() {
    const { expenses, onDelete } = this.props
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    return (
      <div className="expense-list">
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
                    {e.amount.toLocaleString('vi-VN')}đ
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
}

export default ExpenseList
