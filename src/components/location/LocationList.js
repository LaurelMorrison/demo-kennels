import React, {useEffect, useState} from 'react';
import {getAllLocations, deleteLocations} from '../../Modules/LocationManager';
import { LocationCard } from './LocationCard';
import { useHistory } from "react-router-dom";

export const LocationList = () => {
    const [locations, setLocations] = useState([]);
    const history = useHistory()

    const getLocations = () =>{
        return getAllLocations().then(locationsFromAPI => {
        setLocations(locationsFromAPI)})
    }

    const handleDeleteLocation = id => {
        deleteLocations(id)
        .then(() => getLocations())
    }

    useEffect(() => {
        getLocations();
    }, []);

    return (
        <>
            <section className="section-content">
            <button type="button"
            className="btn"
            onClick={() => {history.push("/locations/create")}}>
            Add Shelter
        </button>
        </section>
            <div className="container-cards">
                {locations.map(location => 
                <LocationCard 
                    key={location.id} 
                    location={location} 
                    handleDeleteLocation={handleDeleteLocation}
                    />)}
            </div>
        </>
    )

}