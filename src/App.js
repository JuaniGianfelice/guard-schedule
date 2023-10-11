import Home from './pages/home'
import Dashboard from './pages/dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/dashboard" element = {<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App