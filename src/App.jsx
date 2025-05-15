import React from 'react'
import Signup from './Pages/Auth/Signup'
import Login from "./Pages/Auth/Login"
import { BrowserRouter as Router , Routes, Route } from "react-router";
import Faq from './Pages/FAQ/Faq';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import Contact from './Pages/Contact.us/contact';
import Disclaimer from './Pages/Disclaimer/Disclaimer';
import Privacypolicy from './Pages/Privacypolicy/Privacy';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/" element={<AdminPanel />} />
    <Route path="/faq" element={<Faq />}/>
      <Route path="/Contact" element={<Contact/>}/>
<Route path="/Disclaimer" element={<Disclaimer/>}/>
<Route path="/privacypolicy" element={<Privacypolicy/>}/>
    </Routes>
  </Router>
  )
}

export default App