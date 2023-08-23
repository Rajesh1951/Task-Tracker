import { login, signup } from '../apiCalls/authCalls'
import React, { useState } from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [toggle, setToggle] = useState(true)
  const handleChange = (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (toggle) {
      login(data.email, data.password)
        .then(result => {
          if (result)
            navigate('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
      return;
    }
    else {
      signup(data.name, data.email, data.password)
        .then(result => {
          if (result)
            navigate('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  return (
    <div id='page'>
      <div id='container'>
        <h1>Welcome to Task Tracker</h1>
        <div id="toggle">
          <button onClick={() => setToggle(true)} style={toggle ? { backgroundColor: "green" } : { backgroundColor: "grey" }}>Login</button>
          <button onClick={() => setToggle(false)} style={toggle ? { backgroundColor: "grey" } : { backgroundColor: "green" }}>Signup</button>
        </div>
        <div id="main">
          <form>
            {!toggle && <><label htmlFor='name'>Name</label>
              <input id='name' name='name' onChange={(e) => handleChange(e)} type="text" value={data.name} />
            </>}
            <label htmlFor='email'>Email</label>
            <input name='email' onChange={(e) => handleChange(e)} type="text" value={data.email} />
            <label htmlFor='password'>Password</label>
            <input name='password' onChange={(e) => handleChange(e)} type="text" value={data.password} />
            <button type='submit' onClick={(e) => handleSubmit(e)}>{toggle ? 'Login' : 'Signup'}</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default Login