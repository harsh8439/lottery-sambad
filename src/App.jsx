import React from 'react'
import AdminPanel from "./components/AdminPanel"
import Signup from './components/Signup'
import Login from "./components/Login"
import { BrowserRouter as Router , Routes, Route } from "react-router";

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  </Router>
  )
}

export default App