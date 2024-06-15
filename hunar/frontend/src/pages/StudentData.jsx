import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook

const StudentData = () => {
  const [studentData, setStudentData] = useState(null); // Initialize with null to handle potential API delays
  const [error, setError] = useState("");
  const { id } = useParams(); // Get student ID from URL parameter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/student/${id}`
        );
        setStudentData(response.data); // Assuming the response is an array of student objects
        setError("");
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Error fetching student data");
      }
    };

    fetchData();
  }, [id]); // Dependency on ID for re-fetching on change

  return (
    <div>
      {error && <p>{error}</p>}
      {studentData ? (
        studentData.length > 0 ? ( // Check if there are students in the array
          <div>
            <h2>Student Details</h2>
            {studentData.map(
              (
                student // Iterate over the student objects
              ) => (
                <div key={student.student_id}>
                  {" "}
                  {/* Use student_id for unique keys */}
                  <div>Student ID: {student.student_id}</div>
                  <div>Student Name: {student.student_name}</div>
                  <div>Roll No: {student.roll_no}</div>
                  <div>Standard: {student.standard}</div>
                  {/* Add more details as needed */}
                </div>
              )
            )}
          </div>
        ) : (
          <p>No student found with ID: {id}</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentData;
