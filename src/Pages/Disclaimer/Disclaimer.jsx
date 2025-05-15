import React, { useEffect, useState } from "react";
import "./Disclaimer.css";
import { FaPen, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

export default function Disclaimer() {
  const [disclaimerList, setDisclaimerList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [note, setNote] = useState("");
  const [importantNote, setImportantNote] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newImportantNote, setNewImportantNote] = useState("");

  useEffect(() => {
    fetchAllDisclaimers();
  }, []);

  const fetchAllDisclaimers = () => {
    fetch("https://test.pearl-developer.com/lottery/public/api/disclaimer")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setDisclaimerList(data.data || []);
        }
      })
      .catch((err) => {
        console.error("Error fetching disclaimer:", err);
      });
  };

  const handleSave = (id) => {
    fetch(`https://test.pearl-developer.com/lottery/public/api/disclaimer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note, important_note: importantNote }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          const updated = disclaimerList.map((item) =>
            item.id === id ? { ...item, note, important_note: importantNote } : item
          );
          setDisclaimerList(updated);
          setEditingId(null);
        } else {
          alert("Failed to update disclaimer");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://test.pearl-developer.com/lottery/public/api/disclaimer/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setDisclaimerList(disclaimerList.filter((item) => item.id !== id));
          alert("Disclaimer deleted successfully.");
        } else {
          alert("Failed to delete disclaimer.");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
      });
  };

  const handleCreate = () => {
    fetch("https://test.pearl-developer.com/lottery/public/api/disclaimer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note: newNote,
        important_note: newImportantNote,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          fetchAllDisclaimers();
          setShowModal(false);
          setNewNote("");
          setNewImportantNote("");
          alert("Disclaimer created successfully.");
        } else {
          alert("Failed to create disclaimer.");
        }
      })
      .catch((err) => {
        console.error("Create error:", err);
      });
  };

  return (
    <div className="disclaimer-layout">
      <Sidebar />
      <div className="disclaimer-main">
        <Navbar />

        <div className="card-header">
          <h2>Disclaimer & Important Note</h2>
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Create Disclaimer
          </button>
        </div>

        {disclaimerList.length > 0 ? (
          disclaimerList.map((item) => (
            <div key={item.id} className="disclaimer-card">
              <div className="disclaimer-header">
                <h2>Disclaimer & Important Note</h2>
                {editingId !== item.id && (
                  <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingId(item.id);
                        setNote(item.note || "");
                        setImportantNote(item.important_note || "");
                      }}
                    >
                      <FaPen className="edit-icon" />
                    </button>
                    <button className="edit-btn" onClick={() => handleDelete(item.id)}>
                      <FaTrash className="edit-icon" color="red" />
                    </button>
                  </div>
                )}
              </div>

              {editingId === item.id ? (
                <div className="edit-form">
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Disclaimer</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Important Note</label>
                    <textarea
                      value={importantNote}
                      onChange={(e) => setImportantNote(e.target.value)}
                      rows={4}
                      style={{ width: "100%", padding: "10px" }}
                    />
                  </div>
                  <button
                    onClick={() => handleSave(item.id)}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      padding: "10px 20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    style={{
                      backgroundColor: "#ccc",
                      padding: "10px 20px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="note-section">
                    <h3>Disclaimer</h3>
                    <p>{item.note?.replace(/\\n/g, " ")}</p>
                  </div>
                  <div className="important-note-section">
                    <h3>Important Note</h3>
                    <p>{item.important_note}</p>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No disclaimers available.</p>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create Disclaimer</h3>
            <textarea
              placeholder="Enter Disclaimer"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <textarea
              placeholder="Enter Important Note"
              value={newImportantNote}
              onChange={(e) => setNewImportantNote(e.target.value)}
              rows={4}
              style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={handleCreate}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: "#ccc",
                  padding: "10px 20px",
                  border: "none",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
