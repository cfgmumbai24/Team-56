import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams hook
import Layout from "../Layout";
import { Link } from "react-router-dom";
import ChartPage from "../components/ChartPage";
const StudentData = () => {
  const [studentData, setStudentData] = useState(null); // Initialize with null to handle potential API delays
  const [studentMarks, setStudentMarks] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams(); // Get student ID from URL parameter
  const [lit_score, setLitScore] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [num_score, setNumScore] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [emot_score, setEmotScore] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
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
    const fetchStudentMarks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/score/${id}`
        );
        console.log("Student response data  : ", response.data);
        setStudentMarks(response.data); // Assuming the response is an array of student objects
        console.log("Student Marks : ", studentMarks);
        if (studentMarks) {
          studentMarks.forEach((mark) => {
            const month = new Date(mark.date_of_assign).getMonth(); // Extract month (0-11)
            console.log("Month : ", month);
            console.log("Mark : ", mark);
            lit_score[month] = mark.literacy_score; // Update literacy score
            num_score[month] = mark.numeracy_score; // Update numeracy score
            emot_score[month] = mark.socio_emotional_score; // Update socio-emotional score
          });
        }
        setError("");
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Error fetching student data");
      }
    };

    fetchData();
    fetchStudentMarks();
    const storedStudentData = localStorage.getItem("studentData");
    if (storedStudentData) {
      try {
        const parsedData = JSON.parse(storedStudentData);
        setStudentData(parsedData);
      } catch (error) {
        console.error("Error parsing stored student data:", error);
      }
    }
  }, [id, studentMarks]);

  // http://localhost:5000/api/score/1
  return (
    <div>
      {error && <p>{error}</p>}
      {studentData ? (
        studentData.length > 0 ? ( // Check if there are students in the array
          <div>
            <div
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0277BD",
                padding: "0.5em",
              }}
            >
              Student Details
            </div>
            {studentData.map(
              (
                student // Iterate over the student objects
              ) => (
                <div style={{ padding: "1em" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div key={student.student_id}>
                      {" "}
                      {/* Use student_id for unique keys */}
                      <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Student ID: {student.student_id}
                      </div>
                      <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Student Name: {student.student_name}
                      </div>
                      <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Roll No: {student.roll_no}
                      </div>
                      <div style={{ fontSize: "1em", fontWeight: "bold" }}>
                        Standard: {student.standard}
                      </div>
                      {/* Add more details as needed */}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          // localStorage.setItem(
                          //   "student_id",
                          //   student.student_id
                          // );
                          // localStorage.setItem(
                          //   "student_name",
                          //   student.student_name
                          // );
                          // localStorage.setItem("roll_no", student.roll_no);
                          // localStorage.setItem("standard", student.standard);
                        }}
                      >
                        <Link
                          to={`/student/${id}/edit`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Insert
                        </Link>
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "2em",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <table
                      style={{ border: "0px ", width: "100%" }}
                      align="center"
                      cellPadding={0}
                      cellMargin={0}
                    >
                      <tr>
                        <td width={"50%"}>
                          <div className="graphChild">
                            <ChartPage
                              studentMarks={lit_score}
                              name={"Literacy Score"}
                            />
                          </div>
                        </td>
                        <td width={"50%"}>
                          {" "}
                          <div className="graphChild">
                            <ChartPage
                              studentMarks={num_score}
                              name={"Numeracy Score"}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={2}
                          align="center"
                          width={"50%"}
                          height={"50%"}
                        >
                          <div style={{ margin: "2em", width: "50%" }}>
                            <ChartPage
                              studentMarks={emot_score}
                              name={"Emotional Score"}
                            />
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
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
