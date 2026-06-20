const API_URL = 'http://localhost:3001'

export const http = {
  get: async (url: string) => {
    const res = await fetch(`${API_URL}${url}`)

    return {
      data: await res.json(),
    }
  },

  post: async (url: string, body: unknown) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return {
      data: await res.json(),
    }
  },

  put: async (url: string, body: unknown) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    return {
      data: await res.json(),
    }
  },

  delete: async (url: string) => {
    await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
    })

    return {}
  },
}