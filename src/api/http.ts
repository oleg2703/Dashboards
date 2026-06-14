const API_URL = "http://localhost:3001"

export const http = {
  get: async (url: string) => {
    const res = await fetch(`${API_URL}${url}`)
    return res.json()
  }
}