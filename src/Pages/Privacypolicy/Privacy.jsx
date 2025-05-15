import React, { useEffect, useState } from "react";
import "./Privacy.css";
import { FaPen } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

export default function Privacy() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://test.pearl-developer.com/lottery/public/api/privacy-policy";

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const result = await response.json();
        if (result?.privacy_content || result?.data?.privacy_content) {
          setText(result.privacy_content || result.data.privacy_content);
        }
      } catch (error) {
        console.error("Error fetching policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ privacy_content: text }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to save policy");

      alert("Privacy policy updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving policy:", error);
      alert("Failed to update privacy policy.");
    }
  };

  return (
    <div className="Privacy-container">
      <Sidebar />
      <main className="Privacy-main">
        <Navbar />
        <div className="privacy-content-wrapper">
          <div className="privacy-header">
            <h2>Privacy Policy</h2>
            {!isEditing && (
              <button className="edit-btn" onClick={handleEdit}>
                <FaPen />
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <textarea
              className="privacy-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter Privacy Policy..."
              disabled={!isEditing}
              rows={20}
            />
          )}

          {isEditing && (
            <div className="save-btn-wrapper">
              <button className="save-btn" onClick={handleSave}>
                SAVE
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
