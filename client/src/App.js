import Home from './pages/home'
import UserDashboard from './pages/userDashboard'
import AdminDashboard from './pages/adminDashboard'
import VisitDashboard from './pages/visitDashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/userdashboard" element = {<UserDashboard/>}/>
      <Route path = "/admindashboard" element = {<AdminDashboard/>}/>
      <Route path = "/visitdashboard" element = {<VisitDashboard/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App