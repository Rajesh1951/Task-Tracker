import React, { useEffect, useState } from 'react'
import { createTask, getList, updateTask, deleteTask } from '../apiCalls/TaskCalls';
import '../styles/task.css'
function Dashboard() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState(
    {
      name: '',
      priority: 'High',
      status: 'Done'
    });
  const [toggle, setToggle] = useState(false)
  const fetch = async () => {
    try {
      const l = await getList();
      setList(l);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  const addTask = (e) => {
    e.preventDefault()
    console.log(task)
    createTask(task)
      .then(() => {
        fetch()
      })
  }
  const handleChange = (e) => {
    setTask(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateTask({ id: task._id, ...task })
    setToggle(false)
    setTimeout(async() => {      
      await fetch();
    }, 0);
  }
  const editTask = (index) => {
    setToggle(true)
    setTask(list[index])
  }
  const handelDelete = async (id) => {
    deleteTask(id)
      .then(() => {
        fetch();
        setToggle(false)
      })
  }
  return (
    <div>
      <button onClick={() => sessionStorage.clear('jwtToken')}>logout</button>
      <div id="input">
        <h2>{toggle ? 'Edit the ' : 'Add a '}task</h2>
        <form>
          <label>
            Enter Task
            <input name='name' type="text" value={task.name} onChange={(e) => handleChange(e)} required />
          </label>
          <label>
            Priority
            <select name="priority" id="priority" value={task.priority} onChange={(e) => handleChange(e)}>
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" id="status" value={task.status} onChange={(e) => handleChange(e)}>
              <option value='Done'>Done</option>
              <option value='Progress'>Progress</option>
              <option value='Pending'>Pending</option>
            </select>
          </label>
          {toggle ? <button type="submit" onClick={(e) => handleUpdate(e)}>Update</button>
            : <button type="submit" onClick={(e) => addTask(e)}>Add</button>}
        </form>

      </div>
      <div id="list">
        {list.length > 0 && list.map((e, i) =>
          <div key={e._id} className='task'>
            <div className="taskName">{e.name}</div>
            <div className="taskPriority">Priority: {e.priority}</div>
            <div className="taskStatus">Status: {e.status}</div>
            <button onClick={() => editTask(i)}>edit</button>
            <button onClick={() => handelDelete(e._id)}>delete</button>
          </div>
        )}
      </div>
      <button onClick={() => setToggle(true)}>edit</button>
    </div>
  )
}

export default Dashboard