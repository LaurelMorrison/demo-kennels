import React, { useState, useEffect } from "react";
import { updateAnimal, getAnimalById} from "../../Modules/AnimalManager";
import "./AnimalForm.css";
import { useParams, useHistory} from "react-router-dom";
import{getAllLocations} from "../../Modules/LocationManager";
import{getAllCustomers} from "../../Modules/CustomerManager";

export const AnimalEditForm = () => {
  const [animal, setAnimal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [customers, setCustomers] = useState([]);

  const { animalId } = useParams();
  const history = useHistory();

    //   ***  Every keystroke updates the state of the animal object
  const handleFieldChange = (event) => {
    const stateToChange = { ...animal };
    let editedVal = event.target.value;

    if (event.target.id.includes("Id")) {
      editedVal = parseInt(editedVal);
    }

    stateToChange[event.target.id] = editedVal;
    setAnimal(stateToChange);
  };
  useEffect(() => {
    getAllLocations().then((locationsFromAPI) => {
      setLocations(locationsFromAPI);
    });
  }, []);

  useEffect(() => {
    getAllCustomers().then((customersFromAPI) => {
      setCustomers(customersFromAPI);
    });
  }, []);
  const updateExistingAnimal = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedAnimal = {
      id: animalId,
      name: animal.name,
      breed: animal.breed,
      image: animal.image,
      locationId: animal.locationId,
      customerId: animal.customerId
    };

    updateAnimal(editedAnimal)
    .then(() => history.push("/animals"));
  };

  useEffect(() => {
    getAnimalById(animalId)
    .then((animal) => {
      setAnimal(animal);
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
              value={animal.name}
            />
            <label htmlFor="name">Animal name</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="breed"
              value={animal.breed}
            />
            <label htmlFor="breed">Breed</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="image"
              value={animal.image}
            />
            <label htmlFor="image">Image</label>
          </div>
          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Assign to location: </label>
              <select
                value={animal.locationId}
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
          <fieldset>
            <div className="form-group">
              <label htmlFor="customerId">Customer: </label>
              <select
                value={animal.customerId}
                name="customer"
                id="customerId"
                onChange={handleFieldChange}
                className="form-control"
              >
                <option value="0">Select a customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingAnimal}
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