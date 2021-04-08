import React, { useState, useEffect } from "react";
import { updateLocation, getLocationById} from "../../Modules/LocationManager";
import "./LocationForm.css";
import { useParams, useHistory} from "react-router-dom";
import{getAllEmployees} from "../../Modules/EmployeeManager";

export const LocationEditForm = () => {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployees] = useState([]);

  const { locationId } = useParams();
  const history = useHistory();

    //   ***  Every keystroke updates the state of the animal object
  const handleFieldChange = (event) => {
    const stateToChange = { ...location };
    let editedVal = event.target.value;

    if (event.target.id.includes("Id")) {
      editedVal = parseInt(editedVal);
    }

    stateToChange[event.target.id] = editedVal;
    setLocation(stateToChange);
  };
  useEffect(() => {
    getAllEmployees().then((employeesFromAPI) => {
      setEmployees(employeesFromAPI);
    });
  }, []);

  const updateExistingLocation = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedLocation = {
      id: locationId,
      name: location.name,
      address: location.address,
      employeeId: location.employeeId
    };

    updateLocation(editedLocation)
    .then(() => history.push("/locations"));
  };

  useEffect(() => {
    getLocationById(locationId)
    .then((location) => {
      setLocation(location);
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
              value={location.name}
            />
            <label htmlFor="name">Location name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={location.address}
            />
            <label htmlFor="address">Address</label>
          </div>
          <fieldset>
            <div className="form-group">
              <label htmlFor="employee">Assign Employee: </label>
              <select
                value={location.employeeId}
                name="employeeId"
                id="employeeId"
                onChange={handleFieldChange}
                className="form-control"
              >
                <option value="0">Select an Employee</option>
                {employee.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingLocation}
              className="btn btn-primary">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};