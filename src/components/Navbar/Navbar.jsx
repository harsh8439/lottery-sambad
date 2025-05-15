import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigation = useNavigate();


  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://test.pearl-developer.com/lottery/public/api/admin-logout",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      localStorage.removeItem("token");
      toast.success("Logout successful!");

      setTimeout(() => {
        navigation("/login");
      }, 1000);
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);



  
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!dropdownOpen || keyCode !== 27) return;
        setDropdownOpen(false);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    }, [dropdownOpen]);
  



  return (
    <header className="dashboard-header">
              <ToastContainer />
        
        
      <h2 className="header-title">Admin Panel</h2>
      <div className="profile">
        <div className="relative inline-block z-10">
          <div
            ref={trigger}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="rounded-full p-2 bg-white cursor-pointer"
          >
            <FaRegUserCircle color="black" size={30} />
          </div>

          <div
            ref={dropdown}
            className={`dropdown-menu ${dropdownOpen ? "block" : "hidden"}`}
          >
            <p className="dropdown-username">Harsh Sharma</p>
            <button onClick={handleLogout} className="dropdown-logout">
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
