import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/signin");
  };

  return (
    <div>
      <h1>About (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AboutPage;
