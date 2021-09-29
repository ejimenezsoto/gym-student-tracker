import React,  { useState, useEffect } from "react";
import Timer from "./Timer";
import header from "../images/Header.jpeg"
import './StudentForm.css'


export default function StudentForm()  {
  
  

  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");

  const saveData = (newStudents) => {
    
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  useEffect(() => {
    if (localStorage.getItem("students")) {
      setStudents(JSON.parse(localStorage.getItem("students")));
    }
  }, []);

  const onAddStudent = () => {
    if (newStudent.trim()) {
      let newStudents = [...students, { student: newStudent.trim(), id: Date.now() }];

      setStudents(newStudents);
      setNewStudent("");
      saveData(newStudents);
    }
  };
  

  const deleteStudent = (id) => {
    let newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);

    saveData(newStudents);
  };

  
  return (
    <div className="container">
    <img src={header} alt="logo" className="img"/>
    
      <table className="table table-dark mt-5">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                id="todoInput"
                className="form-control"
                placeholder="Enter Your Full Name"
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
              />
            </th>
            <th>
              <button className="btn btn-primary btn-block" onClick={onAddStudent}>
                {" "}
                Sign-Up
              </button>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody id="table">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="align-middle">{student.student}</td>
              <td className="align-middle"><Timer localStorage={student.id} interval={150}/></td>
              <td className="align-middle">
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(student.id)}
                >
                  {" "}
                  Delete{" "}
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
