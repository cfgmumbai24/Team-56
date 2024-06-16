import React from "react";
import Book from "../assets/book.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ color: "black", fontSize: "4em", fontWeight: "bold" }}>
        Welcome to Gram Hunar
      </div>
      <div>
        <img src={Book} alt="" style={{ width: "400px" }} />
      </div>
      <div>
        <button style={{ backgroundColor: "#0D6F90", color: "white" }}>
          <Link
            to="/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "2em",
              padding: "0 0.5em",
            }}
          >
            Continue
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
