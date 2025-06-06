import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/signin");
  };

  return (
    <div>
      <h1>Home (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
