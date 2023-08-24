import axios from 'axios'
const backend = 'https://task-tracker-g8uf.onrender.com'

const headerConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
export const getList = async () => {
  const token = sessionStorage.getItem('jwtToken')
  const { data } = await axios.get(`${backend}/list`, headerConfig(token));
  return data;
}
export const createTask = async ({ name, priority, status }) => {
  const token = sessionStorage.getItem('jwtToken')
  const { data } = await axios.post(`${backend}/create`, { name, priority, status }, headerConfig(token))
  return data;
}
export const updateTask = async ({ id, name, priority, status }) => {
  const token = sessionStorage.getItem('jwtToken')
  await axios.put(`${backend}/update`, { id, name, priority, status }, headerConfig(token))
  return ;
}

export const deleteTask = async (id)=>{
  return await axios.delete(`${backend}/delete/${id}`)
}