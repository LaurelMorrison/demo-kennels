import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addEmployee } from '../../Modules/EmployeeManager';
import './EmployeeForm.css'
import { getAllLocations } from '../../Modules/LocationManager';

export const EmployeeForm = () => {

    const [employee, setEmployee] = useState({
        name: "",
        address: "",
        locationId: 0
    })
    // const [isLoading, setIsLoading] = useState(false);

    const [locations, setLocations] = useState([]);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newEmployee = {...employee}
        let selectedVar = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVar = parseInt(selectedVar)
        }
        newEmployee[event.target.id] = selectedVar
        setEmployee(newEmployee)
    }

    useEffect(() => {
        getAllLocations()
        .then(locationsFromApi => {
            setLocations(locationsFromApi)
        })
    }, [])

    const handleClickSaveEmployee = (event) => {
        event.preventDefault()

        const locationId= employee.locationId

        if (locationId === 0) {
            window.alert("Please select a location")
        }
        else {
            addEmployee(employee)
                .then(() => history.push("/employees"))
        }
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">Add New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee Name: </label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name} />               
                    </div>
            </fieldset>
            <fieldset>
				<div className="form-group">
					<label htmlFor="address">Address:</label>
					<input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee address" value={employee.address} />
				</div>
			</fieldset>
            <fieldset>
            <div className="form-group">
					<label htmlFor="location">Assign to location: </label>
					<select value={employee.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select a location</option>
						{locations.map(l => (
							<option key={l.id} value={l.id}>
								{l.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
			<button className="btn btn-primary"
				onClick={handleClickSaveEmployee}>
				Save Employee
          </button>
        </form>
    )
}