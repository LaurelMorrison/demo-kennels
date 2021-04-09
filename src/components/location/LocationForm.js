import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { addLocation } from '../../Modules/LocationManager';
import './LocationForm.css';
import { getAllEmployees } from '../../Modules/EmployeeManager';

export const LocationForm = () => {

	const [location, setLocation] = useState({
		name: "",
		address: "",
		hours: "",
		employeeId: 0
	});

	// const [isLoading, setIsLoading] = useState(false);

	const [employees, setEmployees] = useState([]);

	const history = useHistory();


	const handleControlledInputChange = (event) => {
		const newLocation = { ...location }
		let selectedVal = event.target.value
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		newLocation[event.target.id] = selectedVal
		setLocation(newLocation)
	}

    useEffect(() => {
        getAllEmployees()
        .then(employeesFromApi => {
            setEmployees(employeesFromApi)
        })
	}, []);

	const handleClickSaveLocation = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form

		const employeeId = location.employeeId

		if (employeeId === 0) {
			window.alert("Please select an employee")
		} else {
			//invoke addAnimal passing animal as an argument.
			//once complete, change the url and display the animal list
			addLocation(location)
				.then(() => history.push("/locations"))
		}
	}

	return (
		<form className="loctionForm">
			<h2 className="loctionForm__title">Add New Location</h2>
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Location name:</label>
					<input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="location name" value={location.name} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="address">Shelter Address:</label>
					<input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location Address" value={location.address} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="hours">Shelter Hours:</label>
					<input type="text" id="hours" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location Hours" value={location.hours} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form-group">
					<label htmlFor="employeeId">Employee: </label>
					<select value={location.employeeId} name="employee" id="employeeId" onChange={handleControlledInputChange} className="form-control" >
						<option value="0">Select an employee</option>
						{employees.map(e => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
				</div>
			</fieldset>
			<button className="btn btn-primary"
				onClick={handleClickSaveLocation}>
				Save Location
          </button>
		</form>
	)
};