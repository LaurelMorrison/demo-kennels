import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addCustomer } from '../../Modules/CustomerManager';
import './CustomerForm.css'
import { getAllLocations } from '../../Modules/LocationManager';
import { getAllAnimals } from '../../Modules/AnimalManager'

export const CustomerForm = () => {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        animalId: 0,
        locationId: 0
    })
    // const [isLoading, setIsLoading] = useState(false);

    const [locations, setLocations] = useState([]);
    const [animals, setAnimal] = useState([]);
    
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCustomer = {...customer}
        let selectedVar = event.target.value
        if ( event.target.id.includes("Id")){
            selectedVar = parseInt(selectedVar)
        }
        newCustomer[event.target.id] = selectedVar
        setCustomer(newCustomer)
    }

    useEffect(() => {
        getAllLocations()
        .then(locationsFromApi => {
            setLocations(locationsFromApi)
        })
    }, [])

    useEffect(() => {
        getAllAnimals()
        .then(animalsFromApi => {
            setAnimal(animalsFromApi)
        })
    }, [])

    const handleClickSaveCustomer = (event) => {
        event.preventDefault()

        const locationId = customer.locationId
        const animalId = customer.animalId

        if (locationId === 0 || animalId === 0) {
            window.alert("Please select a location and pet")
        } else {
            addCustomer(customer)
            .then(() => history.push("/customers"))
        }
    }

    return (
        <form className="customerForm">
            <h2 className="customerForm__title">Add New Customer</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Customer Name:</label>
                    <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer Name" value={customer.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Customer Address:</label>
                    <input type="text" id="address" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Customer Address" value={customer.address} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animal">New Pet Selection</label>
                    <select value={customer.animalId} name="animalId" id="animalId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select a pet</option>
                        {animals.map(a => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select value={customer.locationId} name="locationId" id="locationId" onChange={handleControlledInputChange} className="form-control">
                        <option value="0">Select a shelter</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn=primary" onClick={handleClickSaveCustomer}>
                Save Customer
            </button>
        </form>
    )
}
