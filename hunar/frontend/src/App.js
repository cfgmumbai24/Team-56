import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StudentData from "./pages/StudentData";
import EditStudentData from "./pages/EditStudentData/EditStudentData";
import Layout from "./Layout";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student/:id" element={<StudentData />} />
        <Route path="/student/:id/edit" element={<EditStudentData />} />
      </Routes>
    </div>
  );
}

export default App;
