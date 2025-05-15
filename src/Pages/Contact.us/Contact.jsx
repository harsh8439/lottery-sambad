import React, { useEffect, useState } from 'react';
import "./Contact.css";
import { FaTrash, FaPen } from "react-icons/fa";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import CreateContact from "../../components/Contact/Contact";

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    Our_support_team_is_available: "",
    Email_Support: "",
    massage: "",
  });

useEffect(() => {
  fetchContact();
  }, []);

  const fetchContact = async () =>{
  fetch("https://test.pearl-developer.com/lottery/public/api/contact-us")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setContacts(data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  }
  

  const handleEdit = (id) => {
    const contactToEdit = contacts.find((c) => c.id === id);
    setEditId(id);
    setEditForm({
      Our_support_team_is_available: contactToEdit.Our_support_team_is_available,
      Email_Support: contactToEdit.Email_Support,
      massage: contactToEdit.massage,
    });
  };

  const handleUpdate = (id) => {
    fetch(`https://test.pearl-developer.com/lottery/public/api/contact-us/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setContacts((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...editForm } : c))
          );
          setEditId(null);
        } else {
          alert("Failed to update contact.");
        }
      })
      .catch((err) => console.error("Update error:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      fetch(`https://test.pearl-developer.com/lottery/public/api/contact-us/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setContacts((prev) => prev.filter((contact) => contact.id !== id));
          } else {
            alert("Failed to delete the contact.");
          }
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <div className="contact-layout">
      <Sidebar />
      <div className="contact-main">
        <Navbar />
        <div className="card">
          <div className="card-header">
            <h2> Contact Messages</h2>
            <button style={{ color: "#fff" }} onClick={() => setOpenModal(!openModal)}>
              Create Contact
            </button>
          </div>
          <div className="table-responsive">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Support Team</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {editId === item.id ? (
                          <input
                            value={editForm.Our_support_team_is_available}
                            onChange={(e) =>
                              setEditForm({ ...editForm, Our_support_team_is_available: e.target.value })
                            }
                          />
                        ) : (
                          item.Our_support_team_is_available
                        )}
                      </td>
                      <td>
                        {editId === item.id ? (
                          <input
                            value={editForm.Email_Support}
                            onChange={(e) =>
                              setEditForm({ ...editForm, Email_Support: e.target.value })
                            }
                          />
                        ) : (
                          item.Email_Support
                        )}
                      </td>
                      <td>
                        {editId === item.id ? (
                          <textarea
                            value={editForm.massage}
                            onChange={(e) =>
                              setEditForm({ ...editForm, massage: e.target.value })
                            }
                          />
                        ) : (
                          item.massage
                        )}
                      </td>
                      <td>{item.created_at}</td>
                      <td className="action-buttons">
                        {editId === item.id ? (
                          <>
                            <button className="edit-btn" onClick={() => handleUpdate(item.id)}>
                              Save
                            </button>
                            <button className="delete-btn" onClick={() => setEditId(null)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="edit-btn" onClick={() => handleEdit(item.id)}>
                              <FaPen />
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-row">No contact messages found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {openModal && <CreateContact fetchContact={fetchContact} onCancel={onCancel} />}
    </div>
  );
}
