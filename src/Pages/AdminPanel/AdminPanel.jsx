import React, { useEffect, useState } from "react";
import "./Admin_panel.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

export default function AdminPanel() {
  const [image1PM, setImage1PM] = useState(null);
  const [image6PM, setImage6PM] = useState(null);
  const [image8PM, setImage8PM] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleUpload = async (e, time, setImageFn) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("time", time);
    formData.append("image", file);

    try {
      const response = await fetch(
        "https://test.pearl-developer.com/lottery/public/api/post-result",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (response.status) {
        console.log(response);
        setImageFn(URL.createObjectURL(file));
        toast.success(`${time} result uploaded successfully.`);
      } else {
        toast.error(`Failed to upload ${time} result.`);
      }
    } catch (error) {
      toast.error("An error occurred while uploading.");
      console.error(error);
    }
  };

  // ✅ Fetch results based on selected date using POST API
  useEffect(() => {
    if (selectedDate) {
      const fetchResultsByDate = async () => {
        try {
          const response = await fetch(
            "https://test.pearl-developer.com/lottery/public/api/get_all_result",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ date: selectedDate }),
            }
          );

          const data = await response.json();

          if (data.status && data.data) {
            setFilteredResults(data.data);
          } else {
            setFilteredResults([]);
            console.log("No data found for the selected date.");
          }
        } catch (err) {
          console.error("Error fetching results by date:", err);
          setFilteredResults([]);
        }
      };

      fetchResultsByDate();
    } else {
      setFilteredResults([]);
    }
  }, [selectedDate]);

  const ResultCard = ({ time, image, setImage }) => (
    <div className={`result-card card-${time.replace(" ", "").toLowerCase()}`}>
      <h2>{time} RESULT</h2>
      {image ? (
        <>
          <img
            src={image}
            alt={`${time} result`}
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <div style={{ marginTop: "10px" }}>
            <label>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleUpload(e, time, setImage)}
              />
              <div className="choose-btn">Choose Another File</div>
            </label>
          </div>
        </>
      ) : (
        <div className="upload-box">
          <h2 className="text-center text-gray-400 text-xs">
            PNG, JPG or PDF, smaller than 10MB
          </h2>
          <h4 className="text-center text-gray-900 text-sm font-medium">
            Drag and Drop or
          </h4>
          <label>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleUpload(e, time, setImage)}
            />
            <div className="choose-btn">Choose File</div>
          </label>
        </div>
      )}
    </div>
  );

  const OldResultCard = ({ time, image }) => (
    <div className="result-card card-old">
      <h2>{time} RESULT</h2>
      <div className="old-result-image">
        <img
          src={image}
          alt={`${time} result`}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="dashboard-layout">
      <ToastContainer />
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <section className="content-section">
          <div className="result-cards">
            <ResultCard time="1 PM" image={image1PM} setImage={setImage1PM} />
            <ResultCard time="6 PM" image={image6PM} setImage={setImage6PM} />
            <ResultCard time="8 PM" image={image8PM} setImage={setImage8PM} />
          </div>

          <div className="oldresultsection">
            <h3>OLD RESULTS</h3>
            <div className="filters">
              <label>DATE</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="old-results">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <OldResultCard
                    key={item.id}
                    time={item.time}
                    image={item.image}
                  />
                ))
              ) : (
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  No results found for selected date.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
