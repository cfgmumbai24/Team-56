import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [teacherData, setTeacherData] = useState(null); // Teacher data is an object or null (or array)
  const [students, setStudents] = useState([]); // Array to store students
  const [error, setError] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username);
    }
  }, []);

  useEffect(() => {
    if (username) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/teacher/${username}`
          );
          setTeacherData(response.data); // Set teacher data (object or array)
        } catch (error) {
          console.error("Error fetching teacher data: ", error);
          setError("Error fetching data");
        }
      };

      fetchData();
    }
  }, [username]);

  // Fetch students on separate effect (optional optimization)
  useEffect(() => {
    if (teacherData) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/teacher/${
              Array.isArray(teacherData)
                ? teacherData[0].teacher_id
                : teacherData?.teacher_id // Handle both object and array cases
            }/underStudents`
          );
          setStudents(response.data); // Update students array with response data (which is the array of objects)
          setError(""); // Clear previous error (optional)
        } catch (error) {
          console.error("Error fetching students: ", error);
          setError("Error fetching students");
        }
      };

      fetchStudents();
    }
  }, [teacherData]);

  return (
    <div>
      <h1>Dashboard of {username}</h1>
      {error && <p>{error}</p>}
      {teacherData ? ( // Check for teacher data (object or array)
        <div>
          <h2>Data from API:</h2>
          {Array.isArray(teacherData) ? ( // Check if teacherData is an array
            teacherData.map(
              (
                teacher // Iterate over teacher objects
              ) => (
                <div key={teacher.teacher_id}>
                  <div>Teacher ID: {teacher.teacher_id}</div>
                  <div>Username: {teacher.username}</div>
                  <div>Teacher Name: {teacher.teacher_name}</div>
                  <div>Address: {teacher.address}</div>
                  <div>Age: {teacher.age}</div>
                  <div>Standard: {teacher.standard}</div>
                </div>
              )
            )
          ) : (
            <div>
              <div>Teacher ID: {teacherData.teacher_id}</div>
              <div>Username: {teacherData.username}</div>
              <div>Teacher Name: {teacherData.teacher_id}</div>
              <div>Address: {teacherData.address}</div>
              <div>Age: {teacherData.age}</div>
              <div>Standard: {teacherData.standard}</div>
            </div>
          )}
          <h2>Students:</h2>
          {students.length > 0 ? ( // Check if there are students
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Standard</th>
                  <th>Student Profile</th>
                </tr>
              </thead>
              <tbody>
                {students.map(
                  (
                    student // Iterate over students array (which holds objects)
                  ) => (
                    <tr key={student.student_id}>
                      <td>{student.student_id}</td>
                      <td>{student.student_name}</td>
                      <td>{student.roll_no}</td>
                      <td>{student.standard}</td>
                      <td>
                        <a href={`/student/${student.student_id}`}>
                          View Profile
                        </a>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No students assigned yet.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
