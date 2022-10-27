import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
