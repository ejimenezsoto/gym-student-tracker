import React,  { useState, useEffect } from "react";
import Timer from "./Timer";

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
    <div className="container mt-5">
      <table className="table table-dark mt-5">
        <thead>
          <tr>
            <th>
              <input
                type="text"
                id="todoInput"
                className="form-control"
                placeholder="Type Full Name"
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
          </tr>
        </thead>

        <thead>
          <tr>
            <th scope="col" colSpan="2">
              Students
            </th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody id="table">
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student}</td>
              <td><Timer localStorage={student.id}/></td>
              <td>
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
