function assertOk(response) {
  if (!response.ok) {
    throw new Error('PRD 请求失败，请稍后重试')
  }
  return response
}

export const prdApi = {
  async list() {
    const response = await assertOk(await fetch('/api/prds'))
    return response.json()
  },

  async get(id) {
    const response = await assertOk(await fetch(`/api/prds/${encodeURIComponent(id)}`))
    return response.json()
  },

  async create(payload) {
    const response = await assertOk(
      await fetch('/api/prds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
    )
    return response.json()
  },

  async update(id, payload) {
    const response = await assertOk(
      await fetch(`/api/prds/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
    )
    return response.json()
  },
}
