import React, { useState, useEffect } from "react";
import { updateEmployee, getEmployeeById} from "../../Modules/EmployeeManager";
import "./EmployeeForm.css";
import { useParams, useHistory} from "react-router-dom";
import{getAllLocations} from "../../Modules/LocationManager";

export const EmployeeEditForm = () => {
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const { employeeId } = useParams();
  const history = useHistory();

    //   ***  Every keystroke updates the state of the animal object
  const handleFieldChange = (event) => {
    const stateToChange = { ...employee };
    let editedVal = event.target.value;

    if (event.target.id.includes("Id")) {
      editedVal = parseInt(editedVal);
    }

    stateToChange[event.target.id] = editedVal;
    setEmployee(stateToChange);
  };
  useEffect(() => {
    getAllLocations().then((locationsFromAPI) => {
      setLocations(locationsFromAPI);
    });
  }, []);

  const updateExistingEmployee = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedEmployee = {
      id: employeeId,
      name: employee.name,
      address: employee.address,
      locationId: employee.locationId,
    };

    updateEmployee(editedEmployee)
    .then(() => history.push("/employees"));
  };

  useEffect(() => {
    getEmployeeById(employeeId)
    .then((employee) => {
      setEmployee(employee);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={employee.name}
            />
            <label htmlFor="name">Employee name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={employee.address}
            />
            <label htmlFor="address">Address</label>
          </div>
          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Assign to location: </label>
              <select
                value={employee.locationId}
                name="locationId"
                id="locationId"
                onChange={handleFieldChange}
                className="form-control"
              >
                <option value="0">Select a location</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingEmployee}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};