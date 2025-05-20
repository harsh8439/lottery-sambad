import React, { useState } from "react";
import "./Notification.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notification() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notificaitonFile: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "notificaitonFile") {
      setFormData({ ...formData, notificaitonFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    if (formData.notificaitonFile) {
      payload.append("file", formData.notificaitonFile);
    }

    try {
      const response = await fetch("api", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Notification posted successfully!");
        setFormData({ title: "", description: "", notificaitonFile: null });
      } else {
        toast.error(data.message || "Failed to post notification");
      }
    } catch (error) {
      toast.error("Network error or server issue.");
    }

    setLoading(false);
  };

  return (
    <div className="contact-layout">
      <Sidebar />
      <div className="contact-main">
        <Navbar />
        <div className="notification-container">
          <h2>Create Notification</h2>
          <form onSubmit={handleSubmit} className="notification-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload File</label>
              <input
                type="file"
                name="notificaitonFile"
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Notification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
