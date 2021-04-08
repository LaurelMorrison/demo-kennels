import React, { useEffect, useState } from 'react';
import { getAllEmployees, deleteEmployees } from '../../Modules/EmployeeManager';
import { EmployeeCard } from './EmployeeCard';
import { useHistory } from "react-router-dom";

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const history = useHistory();

    const getEmployees = () => {
        return getAllEmployees().then(employeesFromAPI => {
            setEmployees(employeesFromAPI)
        }
            )
    } 

    const handleDeleteEmployee = id => {
        deleteEmployees(id)
        .then(() => getEmployees())
    }

    useEffect(() => {
    getEmployees()}, 
    []);

    return (
        <>
        <section className="section-content">
            <button type="button" className="btn" onClick={() => 
                {history.push("/employees/create")}}> Add Employee
            </button>
            </section>
        <div className="containter-card">
            {employees.map(employee => 
            <EmployeeCard 
                key={employee.id} 
                employee={employee} 
                handleDeleteEmployee={handleDeleteEmployee}
                />)}
        </div>
        </>
    )

}