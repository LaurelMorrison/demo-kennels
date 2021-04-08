import React, { useState, useEffect } from "react";
import { updateACustomer, getCustomerById} from "../../Modules/CustomerManager";
import "./CustomerForm.css";
import { useParams, useHistory} from "react-router-dom";
import {getAllAnimals} from "../../Modules/AnimalManager";
import {getAllLocations} from "../../Modules/LocationManager";

export const CustomerEditForm = () => {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [animal, setAnimal] = useState([]);


  const { customerId } = useParams();
  const history = useHistory();

    //   ***  Every keystroke updates the state of the animal object
  const handleFieldChange = (event) => {
    const stateToChange = { ...customer };
    let editedVal = event.target.value;

    if (event.target.id.includes("Id")) {
      editedVal = parseInt(editedVal);
    }

    stateToChange[event.target.id] = editedVal;
    setCustomer(stateToChange);
  };

  useEffect(() => {
    getAllAnimals().then((animalsFromAPI) => {
      setAnimal(animalsFromAPI);
    });
  }, []);

  useEffect(() => {
    getAllLocations().then((locationFromAPI) => {
      setLocation(locationFromAPI);
    });
  }, []);

  const updateExistingCustomer = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedCustomer = {
      id: customerId,
      name: customer.name,
      address: customer.address,
      email: customer.email,
      animalId: customer.animalId,
      customerId: customer.locationId
    };

    updateACustomer(editedCustomer)
    .then(() => history.push("/locations"));
  };

  useEffect(() => {
    getCustomerById(customerId)
    .then((customer) => {
      setCustomer(customer);
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
              value={customer.name}
            />
            <label htmlFor="name">Customer name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="address"
              value={customer.address}
            />
            <label htmlFor="address">Address</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="email"
              value={customer.emial}
            />
            <label htmlFor="email">Email</label>
          </div>
          <fieldset>
            <div className="form-group">
              <label htmlFor="animal">New Pet: </label>
              <select
                value={customer.animalId}
                name="animalId"
                id="animalId"
                onChange={handleFieldChange}
                className="form-control"
              >
                <option value="0">Select a Pet</option>
                {animal.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Location: </label>
              <select
                value={customer.locationId}
                name="locationId"
                id="locationId"
                onChange={handleFieldChange}
                className="form-control"
              >
                <option value="0">Select a Location</option>
                {location.map((l) => (
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
              onClick={updateExistingCustomer}
              className="btn btn-primary">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};