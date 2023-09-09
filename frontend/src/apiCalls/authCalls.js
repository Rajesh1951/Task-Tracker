import axios from 'axios'
const backend = 'https://task-tracker-api.vercel.app'
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${backend}/login`, { email, password })
    if (data?.error) {
      alert(data.error)
      return false;
    }
    sessionStorage.setItem('jwtToken', data)
    return true
  }
  catch (error) {
    alert(error)
    return false;
  }
}
export const signup = async (name, email, password) => {
  try {
    const { data } = await axios.post(`${backend}/signup`, { name, email, password })
    if (data?.error) {
      alert(data.error)
      return false
    }
    sessionStorage.setItem('jwtToken', data)
    return true
  }
  catch (error) {
    alert(error)
    return false
  }
}