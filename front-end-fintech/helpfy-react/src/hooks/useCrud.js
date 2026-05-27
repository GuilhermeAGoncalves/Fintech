import { useState, useEffect, useCallback } from 'react'

export function useCrud(api) {
  const [items, setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setItems(await api.list())
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [api])

  useEffect(() => { load() }, [load])

  const create = async (data) => {
    const item = await api.create(data)
    setItems(prev => [...prev, item])
    return item
  }

  const update = async (id, data) => {
    const item = await api.update(id, data)
    setItems(prev => prev.map(i => i.id === id ? item : i))
    return item
  }

  const remove = async (id) => {
    await api.remove(id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return { items, loading, error, create, update, remove, reload: load }
}
