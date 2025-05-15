import React, { useState, useEffect } from "react";
import "./Faq.css";
import { FaTrash, FaPen } from "react-icons/fa";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch(
        "https://test.pearl-developer.com/lottery/public/api/faqs_get"
      );
      const data = await response.json();
      const dataArray = Array.isArray(data?.data) ? data.data : [];
      setFaqs(dataArray);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    }
  };

  const handleAddFaq = async () => {
    try {
      const response = await fetch(
        "https://test.pearl-developer.com/lottery/public/api/faqs_store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic, description }),
        }
      );

      if (!response.ok) throw new Error("Failed to add FAQ");
      const resData = await response.json();

      const newFaq = resData?.data;
      setFaqs([...faqs, newFaq]);
      setShowForm(false);
      setTopic("");
      setDescription("");
      fetchFaqs();
    } catch (error) {
      console.error("Error adding FAQ", error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      const response = await fetch(
        `https://test.pearl-developer.com/lottery/public/api/faqs/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete FAQ");
      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (error) {
      console.error("Error deleting FAQ", error);
    }
  };

  const handleEditFaq = (faq) => {
    setEditMode(true);
    setEditId(faq.id);
    setTopic(faq.topic || faq.title);
    setDescription(faq.description || "");
    setShowForm(true);
  };

  const handleUpdateFaq = async () => {
    try {
      const response = await fetch(
        `https://test.pearl-developer.com/lottery/public/api/faqs/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic, description }),
        }
      );

      if (!response.ok) throw new Error("Failed to update FAQ");

      const updatedFaqs = faqs.map((faq) =>
        faq.id === editId ? { ...faq, topic, description } : faq
      );

      setFaqs(updatedFaqs);
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setTopic("");
      setDescription("");
    } catch (error) {
      console.error("Error updating FAQ", error);
    }
  };

  return (
    <div className="faq-container">
      <Sidebar />
      <main className="faq-main">
        <Navbar />
        <div className="faq__Container">
          <div className="faq-add-btn">
            <button
              onClick={() => {
                setShowForm(true);
                setEditMode(false);
                setTopic("");
                setDescription("");
              }}
            >
              + Add F&Q
            </button>
          </div>

          {/* Header */}
          <div className="faq-list">
            <div className="faq-header">
              <div className="faq-col serial">Sr.No.</div>
              <div className="faq-col question">Question</div>
              <div className="faq-col answer">Answer</div>
              <div className="faq-col action">Actions</div>
            </div>

            {/* FAQ Items */}
            {faqs?.map((faq, index) => {
              if (!faq || !faq.topic || !faq.description) return null;
              return (
                <div className="faq-item" key={faq.id}>
                  <div className="faq-col serial">{index + 1}</div>
                  <div className="faq-col question">{faq.topic}</div>
                  <div className="faq-col answer">{faq.description}</div>
                  <div className="faq-col action faq-actions">
                    <button onClick={() => handleEditFaq(faq)}>
                      <FaPen />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(faq.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editMode ? "Edit FAQ" : "Add FAQ"}</h2>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter Question"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Answer"
              />
              <div className="modal-buttons">
                <button onClick={editMode ? handleUpdateFaq : handleAddFaq}>
                  {editMode ? "Update" : "Submit"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditMode(false);
                    setEditId(null);
                    setTopic("");
                    setDescription("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Are you sure you want to delete this FAQ?</h3>
              <div className="modal-buttons" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  style={{ backgroundColor: "#dc3545", color: "#fff", padding: "10px 20px", border: "none" }}
                  onClick={() => {
                    handleDeleteFaq(deleteId);
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  style={{ backgroundColor: "#6c757d", color: "#fff", padding: "10px 20px", border: "none" }}
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Faq;
