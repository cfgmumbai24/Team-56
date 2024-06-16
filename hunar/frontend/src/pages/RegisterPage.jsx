import axios from "axios";
import { useState } from "react";
import Layout from "../Layout";
import "./RegisterPage.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [standard, setStandard] = useState("");

  async function register(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
        teacherId,
        teacherName,
        address,
        age,
        standard,
      });
      const resp2 = await axios.post("http://localhost:5000/api/teacher", {
        username,
        teacherId,
        teacherName,
        address,
        age,
        standard,
      });
      const data = response.data;

      if (response.status === 201) {
        console.log("Registered:", data);
        setSuccess("Registration successful");
        // Store the token in local storage
        localStorage.setItem("token", data.token);
        // Handle successful registration, e.g., redirect to dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while signing up.");
      }
      console.error("Error:", error);
    }
  }
  //   teacher_id, username, teacher_name, address, age, standard
  return (
    <>
      <div className="register-container">
        <form
          className="register-form"
          onSubmit={register}
          style={{ border: "1px solid black" }}
        >
          <h2 className="register_heading">Register</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="form-group">
            <input
              type="text"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              placeholder="teacher id"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Teacher name "
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              placeholder="Standard"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>
          <button type="submit">Register</button>
          <div>
            Already a user ? <Link to="/login">Login </Link>
          </div>
        </form>
      </div>
    </>
  );
}
