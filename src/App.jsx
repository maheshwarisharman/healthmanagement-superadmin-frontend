import React, { useState } from 'react'
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import ViewDoctors from './components/viewdoctors';
import ViewAppointment from './components/viewappointments';
import ViewInventory from './components/viewInventory';

function App() {

  return (
    <div>
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/viewdoctors/:id" element={<ViewDoctors />} />
      <Route path="/viewappointment/:id" element={<ViewAppointment />} />
      <Route path="/viewinventory/:id" element={<ViewInventory />} />
    </Routes>
  </Router>
  </div>
  )
}

export default App
