import React, { useEffect, useState } from 'react'
import { createTask, getList, updateTask, deleteTask } from '../apiCalls/TaskCalls';
import '../styles/task.css'
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const navigate = useNavigate()
  const [initialList, setInitialList] = useState([]);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
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
      setList(handleFilter(l));
      setInitialList(l);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  }
  useEffect(() => {
    fetch()
  }, [])
  const addTask = async (e) => {
    e.preventDefault()
    await createTask(task)
    setTimeout(async () => {
      await fetch();
    }, 500);
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
    setTimeout(async () => {
      await fetch();
    }, 500);
  }
  const editTask = (index) => {
    setToggle(true)
    setTask(list[index])
  }
  const handelDelete = async (id) => {
    deleteTask(id)
      .then(() => {
        fetch();
      })
  }
  const handleFilter = (l) => {
    if (filter === 'All')
      return l;
    return l.filter(e => e.status === filter)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    const l = initialList.filter(i => i.name.includes(query))
    setList(handleFilter(l))
  }
  function handleLogout() {
    sessionStorage.clear('jwtToken')
    navigate('/')
  }
  useEffect(() => {
    if (query.length === 0)
      setList(handleFilter(initialList))
  }, [query])
  useEffect(() => {
    setList(handleFilter(initialList))
  }, [filter])
  return (
    <div>
      <h1 id='heading'>Welcome to Task Tracker</h1>
      <button id="logout" onClick={() => handleLogout()}>logout</button>
      <div id="input">
        <h2>{toggle ? 'Edit the ' : 'Add a '}task</h2>
        <form>
          <label>
            <div className='center'>Enter Task: </div>
            <input className='dashInput' name='name' type="text" value={task.name} onChange={(e) => handleChange(e)} required />
          </label>
          <label>
            Priority:
            <select name="priority" id="priority" value={task.priority} onChange={(e) => handleChange(e)}>
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </select>
          </label>
          <label>
            Status:
            <select name="status" id="status" value={task.status} onChange={(e) => handleChange(e)}>
              <option value='Done'>Done</option>
              <option value='Progress'>Progress</option>
              <option value='Pending'>Pending</option>
            </select>
          </label>
          {toggle ? <button className='addButton' type="submit" onClick={(e) => handleUpdate(e)}>Update</button>
            : <button className='addButton' type="submit" onClick={(e) => addTask(e)}>Add</button>}
        </form>
      </div>
      <div id="search">
        <form >
          <input className='dashInput' type="search" placeholder='search..' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" className='searchButton' onClick={(e) => handleSearch(e)}>Search</button>
          {/* <button onClick={(e) => handleReset(e)}>reset</button> */}
        </form>
        <div id="filter">
          Status:
          <select id="filterDropDown" onChange={(e) => setFilter(e.target.value)}>
            <option value='All'>All</option>
            <option value='Pending'>Pending</option>
            <option value='Progress'>Progress</option>
            <option value='Done'>Done</option>
          </select>
        </div>
      </div>
      <div id="list">
        {list.length < 1 && <h2>List is empty</h2>}
        {list.length > 0 &&
          <table>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            <tbody>
              {list.map((e, i) => <>
                <tr key={e._id} className={`task ${e.status}`}>
                  <td className="taskName">{e.name}</td>
                  <td className="taskPriority">{e.priority}</td>
                  <td className="taskStatus">{e.status}</td>
                  <td><button className='taskButtons' onClick={() => editTask(i)}>edit</button></td>
                  <td><button className='taskButtons' onClick={() => handelDelete(e._id)}>delete</button></td>
                </tr>
              </>
              )}
            </tbody>
          </table>
        }
      </div>
    </div >
  )
}

export default Dashboard