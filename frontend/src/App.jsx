import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Vehicles from './components/pages/Vehicles';
import Oilchange from './components/pages/Oilchange';
import Tirechange from './components/pages/Tirechange';
import Brakechange from './components/pages/Brakechange';
import Airconditioner from './components/pages/Airconditioner';
import Carwash from './components/pages/Carwash';
import Workcalendar from './components/pages/Workcalendar';
import Updatecar from './components/pages/Updatecar';

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/oilchange" element={<Oilchange />} />
        <Route path="/tirechange" element={<Tirechange />} />
        <Route path="/brakechange" element={<Brakechange />} />
        <Route path="/airconditioner" element={<Airconditioner />} />
        <Route path="/carwash" element={<Carwash />} />
        <Route path="/calendar" element={<Workcalendar />} />
        <Route path="/updatecar" element={<Updatecar />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
