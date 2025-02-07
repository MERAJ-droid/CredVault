export const setToken = (token: string) => {
    localStorage.setItem('credvault_token', token)
  }
  
  export const getToken = () => {
    return localStorage.getItem('credvault_token')
  }
  
  export const removeToken = () => {
    localStorage.removeItem('credvault_token')
  }
  
  export const isAuthenticated = () => {
    return !!getToken()
  }
  