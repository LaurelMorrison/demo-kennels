import React from "react"
import "./Employee.css";
import { Link } from "react-router-dom";

export const EmployeeCard = ({employee, handleDeleteEmployee}) => (
    <div className="card">
        <div className="card-content">
            <h3 className="card-EmployeeName">Name: {employee.name} </h3>
            <p className="employee__shelter">Location: {employee.address} </p>
            <Link to={`/employees/${employee.id}`}>
                <button>Details</button>
            </Link>
            <button type="button" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
        </div>
    </div>
)