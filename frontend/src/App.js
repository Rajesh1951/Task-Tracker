import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
