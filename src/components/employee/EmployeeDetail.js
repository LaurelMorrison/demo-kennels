import React, { useState, useEffect } from 'react';
import { getEmployeeById, deleteEmployees } from '../../Modules/EmployeeManager';
import './EmployeeDetail.css';
import { useParams, useHistory } from "react-router-dom"

export const EmployeeDetail = () => {
    const [employee, setEmployee] = useState({});
    const [isLoading, setIsLoading ] = useState(true);

    const {employeeId} = useParams();
    const {history} = useHistory();

    useEffect(() => {
        getEmployeeById(employeeId)
        .then(employee => {
            setEmployee({
                name: employee.name,
                address: employee.address,
                location: employee.location
            })
            setIsLoading(false)
        })
    }, [employeeId])

    const handleDelete = () => {
        setIsLoading(true);
        deleteEmployees(employeeId).then(() => 
        history.push("/employees"))
    }

    return (
        <section className="employee">
            <h3 className="employee__name">Name: {employee.name}</h3>
            <div className="employee__address">Address {employee.address}</div>
            <div className="employee__location">Location: {employee.location?.name}</div>
            <button type="button" disabled={isLoading} onClick={handleDelete}>Delete</button>
        </section>
    )

}