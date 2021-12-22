import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Home from './Pages/HomePage/Home/Home';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Shared/PrivateRoute/PrivateRoute';
import Profile from './Pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>} />
          <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
