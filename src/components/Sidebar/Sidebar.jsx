import React from 'react'
import './Sidebar.css'
import { Home, HelpCircle, Mail, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MdOutlinePrivacyTip } from "react-icons/md";


export default function Sidebar() {
  return (
        <aside className="sidebar">
      <h2 className="sidebar-title">LOTTERY SAMBAD</h2>
      <nav className="sidebar-menu">
        <Link to="/">
          <Home size={18} style={{ marginRight: '8px' }} /> Dashboard
        </Link>
        <Link to="/faq">
          <HelpCircle size={18} style={{ marginRight: '8px' }} /> FAQ
        </Link>
        <Link to="/Contact">
          <Mail size={18} style={{ marginRight: '8px' }} /> Contact Us
        </Link>
        <Link to="/Disclaimer">
          <AlertCircle size={18} style={{ marginRight: '8px' }} /> Disclaimer
        </Link>
        <Link to="/privacypolicy">
          <MdOutlinePrivacyTip  size={18} style={{ marginRight: '8px' }} /> Privacy Policy
        </Link>
      </nav>
    </aside>
  )
}
