import React, { useEffect, useRef, useState } from "react";
import "./Admin_panel.css";
import { FaRegUserCircle } from "react-icons/fa";
import cardImage from "../assets/image/image.png";

export default function AdminPanel() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [image1PM, setImage1PM] = useState(null);
  const [image6PM, setImage6PM] = useState(null);
  const [image8PM, setImage8PM] = useState(null);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const handleUpload = (e, setImageFn) => {
    const file = e.target.files[0];
    if (file) {
      setImageFn(URL.createObjectURL(file));
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

  // Card component
  const ResultCard = ({ time, image, setImage }) => (
    <div className={`result-card card-${time.replace(" ", "").toLowerCase()}`}>
      <div className="clock"></div>
      <h2>{time} RESULT</h2>
      {image ? (
        <>
          <img
            src={image}
            alt={`${time} result`}
            style={{ width: "300px", height: "200px", objectFit:"cover" ,borderRadius: "10px" }}
          />
          <div style={{ marginTop: "10px" }}>
            <label>
              <input type="file" accept="image/*" hidden onChange={(e) => handleUpload(e, setImage)} />
              <div className="choose-btn">Choose Another File</div>
            </label>
          </div>
        </>
      ) : (
        <div className="upload-box">
          <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M31.65 10.61L32.25 10.07L31.65 10.61Z..."
              fill="#4F46E5"
            />
          </svg>
          <h2 className="text-center text-gray-400 text-xs">PNG, JPG or PDF, smaller than 10MB</h2>
          <h4 className="text-center text-gray-900 text-sm font-medium">Drag and Drop or</h4>
          <label>
            <input type="file" accept="image/*" hidden onChange={(e) => handleUpload(e, setImage)} />
            <div className="choose-btn">Choose File</div>
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logocontainer">
          <img src="./src/assets/image/logo.png" alt="Logo" className="logo" />
          <h2 className="logo_text">LOTTERY SAMBAD</h2>
        </div>
        <div className="profile">
          <div className="flex justify-center">
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
                className={`absolute right-0 top-full w-[240px] rounded-lg p-2 bg-white ${
                  dropdownOpen ? "block" : "hidden"
                }`}
              >
                <div className="px-4 py-3">
                  <p className="text-xl font-semibold text-blue-500">Harsh Sharma</p>
                </div>
                <button className="w-full px-4 py-2 text-sm text-dark hover:bg-gray-50">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Result Cards */}
      <section className="result-cards">
        <ResultCard time="1 PM" image={image1PM} setImage={setImage1PM} />
        <ResultCard time="6 PM" image={image6PM} setImage={setImage6PM} />
        <ResultCard time="8 PM" image={image8PM} setImage={setImage8PM} />
      </section>

      {/* Old Results */}
      <div className="oldresultsection">
        <h3>OLD RESULTS</h3>
      </div>
      <section className="old-results">
        <div className="filters">
          <div>
            <label>DATE</label>
            <input type="date" />
          </div>
          <div>
            <label>Time</label>
            <select>
              <option>1:00pm</option>
              <option>6:00pm</option>
              <option>8:00pm</option>
            </select>
          </div>
        </div>
        <div className="result-card card-1pm">
          <h2>1 PM RESULT</h2>
          <div className="old-result-image">
          <img src={cardImage} alt="Old Result" />
        </div>
        </div>
      </section>
    </div>
  );
}
