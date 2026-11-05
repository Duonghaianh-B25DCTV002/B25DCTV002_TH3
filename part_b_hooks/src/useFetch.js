import { useState, useEffect, useCallback } from 'react'

const API_URL = 'https://6aebe45eee39618d7bf896b5.mockapi.io/expenses'

export default function useFetch() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Không thể tải dữ liệu')
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const addItem = useCallback(async (item) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
      if (!res.ok) throw new Error('Không thể thêm khoản chi')
      const newItem = await res.json()
      setData(prev => [...prev, newItem])
      return newItem
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  const deleteItem = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Không thể xóa')
      setData(prev => prev.filter(item => String(item.id) !== String(id)))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  return { data, isLoading, error, addItem, deleteItem, refetch: fetchData }
}

