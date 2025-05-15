import React, { useState } from "react";
import "./createDisclaimer.css";

const createDisclaimer = ({ onCancel, fetchcreateDisclaimer }) => {

  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("")
  const [description, setDescription] = useState("")

const handleSubmit = async () => {
  try {
    const response = await fetch('https://test.pearl-developer.com/lottery/public/api/createDisclaimer-us', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({
        Our_support_team_is_available: notes,
        Email_Support: email,
        massage: description
      })
    });

    const result = await response.json();

    if (response.ok && result.status) {
      alert("createDisclaimer Created Successfully");
      onCancel();
      fetchcreateDisclaimer();
    } else {
      alert("Failed to create createDisclaimer: " + result.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
};



  return (
    <div className="main__container">
    <div className="createDisclaimer-container">
      <div className="email-field">
        <label className="email-label">Email</label>
        <div className="email-box">
          <input
            type="text"
            className="email-input"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="email-actions"></div>
        </div>
      </div>

      <div className="Notes-field">
        <label className="Notes-label">Notes</label>
        <div className="Notes-box">
          <input type="text" className="Notes-input" placeholder="Enter Here"
                      value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="Notes-actions"></div>
        </div>
      </div>

      <div className="Discription-field">
        <label className="Discription-label">Discription</label>
        <div className="Discription-box">
          <input
            type="text"
            className="Discription-input"
            placeholder="enter the value here"
                        value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="e-actions"></div>
        </div>
      </div>

      <div style={{display: "flex", justifyContent: "space-between"}}>
        <button style={{color: "white", backgroundColor: "red"}} onClick={onCancel}>Cancel</button>
        <button style={{color: "white"}} onClick={handleSubmit}>Save</button>
      </div>
    </div>
    </div>

  );
};

export default createDisclaimer;
