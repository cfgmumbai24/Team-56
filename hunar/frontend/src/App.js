import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditStudentData from "./pages/EditStudentData";
import Student from "./pages/Student";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/:id" element={<Student />} />
        <Route path="/student/:id/edit" element={<EditStudentData />} />
      </Routes>
    </div>
  );
}

export default App;
