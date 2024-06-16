import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ChartPage from "../components/ChartPage";
import "./Dashboard.css";
import { Chart } from "chart.js";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.breakpoints.down("sm")}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [litScore, setLitScore] = useState([]);
  const [numScore, setNumScore] = useState([]);
  const [emotScore, setEmotScore] = useState([]);
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
          setTeacherData(response.data);
        } catch (error) {
          console.error("Error fetching teacher data: ", error);
          setError("Error fetching data");
        }
      };

      fetchData();
      console.log("teacherData : ", teacherData);
    }
  }, [username]);

  useEffect(() => {
    if (teacherData) {
      const fetchStudents = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/teacher/${
              Array.isArray(teacherData)
                ? teacherData[0].teacher_id
                : teacherData?.teacher_id
            }/underStudents`
          );
          localStorage.setItem(
            "teacherId",
            Array.isArray(teacherData)
              ? teacherData[0].teacher_id
              : teacherData?.teacher_id
          );
          setStudents(response.data);
          setError("");
        } catch (error) {
          console.error("Error fetching students: ", error);
          setError("Error fetching students");
        }
      };

      fetchStudents();
      fetchLitInfo();
      fetchNumInfo();
      fetchEmoInfo();
    }
  }, [teacherData]);
  const fetchLitInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/avg/average-literacy-score/${
          Array.isArray(teacherData)
            ? teacherData[0].teacher_id
            : teacherData?.teacher_id
        }`
      );
      setLitScore(response.data);
      console.log("Lit score : ", litScore);
      setError("");
    } catch (error) {
      console.error("Error fetching students: ", error);
      setError("Error fetching students");
    }
  };
  const fetchNumInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/avg/average-numeracy-score/${
          Array.isArray(teacherData)
            ? teacherData[0].teacher_id
            : teacherData?.teacher_id
        }`
      );
      setNumScore(response.data);
      console.log("num score : ", numScore);
      setError("");
    } catch (error) {
      console.error("Error fetching students: ", error);
      setError("Error fetching students");
    }
  };
  const fetchEmoInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/avg/average-emotional-score/${
          Array.isArray(teacherData)
            ? teacherData[0].teacher_id
            : teacherData?.teacher_id
        }`
      );
      setEmotScore(response.data);
      console.log("Emo score : ", emotScore);
      setError("");
    } catch (error) {
      console.error("Error fetching students: ", error);
      setError("Error fetching students");
    }
  };
  return (
    <>
      <div
        style={{
          height: "100dvh",
          marginBottom: "2em",
          margin: "0",
          padding: "0",
        }}
      >
        <div
          style={{
            backgroundColor: "#0277BD",
            fontSize: "2em",
            color: "white",
            fontWeight: "bold",
            padding: "0.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Dashboard of {username}
        </div>
        {error && <p>{error}</p>}
        {teacherData ? (
          <div style={{ margin: "1em" }}>
            <h2>Logged in teacher's details : </h2>
            {Array.isArray(teacherData) ? (
              teacherData.map((teacher) => (
                <div key={teacher.teacher_id}>
                  <div>
                    <strong>Teacher ID: </strong> {teacher.teacher_id}
                  </div>
                  <div>
                    <strong> Username: </strong>
                    {teacher.username}
                  </div>
                  <div>
                    <strong> Teacher Name: </strong>
                    {teacher.teacher_name}
                  </div>
                  <div>
                    <strong> Address:</strong> {teacher.address}
                  </div>
                  <div>
                    <strong> Age: </strong>
                    {teacher.age}
                  </div>
                  <div>
                    <strong> Standard:</strong> {teacher.standard}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <div>Teacher ID: {teacherData.teacher_id}</div>
                <div>Username: {teacherData.username}</div>
                <div>Teacher Name: {teacherData.teacher_name}</div>
                <div>Address: {teacherData.address}</div>
                <div>Age: {teacherData.age}</div>
                <div>Standard: {teacherData.standard}</div>
              </div>
            )}
            <h2>Students:</h2>
            {students.length > 0 ? (
              <TableContainer
                component={Paper}
                style={{
                  border: "1px solid #0277BD",
                }}
              >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center" className="tableHead">
                        Student ID
                      </StyledTableCell>
                      <StyledTableCell align="center" className="tableHead">
                        Student Name
                      </StyledTableCell>
                      <StyledTableCell align="center" className="tableHead">
                        Roll No
                      </StyledTableCell>
                      <StyledTableCell align="center" className="tableHead">
                        Standard
                      </StyledTableCell>
                      <StyledTableCell align="center" className="tableHead">
                        Link
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <StyledTableRow key={student.student_id}>
                        <StyledTableCell align="center">
                          {student.student_id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {student.student_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {student.roll_no}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {student.standard}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Link to={`/student/${student.student_id}`}>
                            Goto{" "}
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <p>No students assigned yet.</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
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
                  studentMarks={litScore}
                  name={"Literacy Score of entire class"}
                />
              </div>
            </td>
            <td width={"50%"}>
              {" "}
              <div className="graphChild">
                <ChartPage
                  studentMarks={numScore}
                  name={"Numeracy Score of entire class"}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="center" width={"50%"} height={"50%"}>
              <div style={{ margin: "2em", width: "50%" }}>
                <ChartPage
                  studentMarks={emotScore}
                  name={"Emotional Score of entire class"}
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
