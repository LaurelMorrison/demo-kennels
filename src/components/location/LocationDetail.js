import React, { useState, useEffect } from 'react';
import { getLocationById, deleteLocations } from '../../Modules/LocationManager';
import './LocationDetail.css';
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const [location, setLocation] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {locationId} = useParams();
    const {history} = useHistory();

    useEffect(() => {
        getLocationById(locationId)
        .then(location => {
            setLocation({
                name: location.name,
                address: location.address,
                employee: location.employee
            })
            setIsLoading(false)
        })
    }, [locationId])

    const handleDelete = () => {
        setIsLoading(true);
        deleteLocations(locationId).then(() => 
        history.push("/locations"))
    }

    return (
        <section className="location">
            <h3 className="location__name">Name: {location.name}</h3>
            <div className="location__address">Address: {location.address}</div>
            <div className="location__employee">Employee: {location.employee?.name}</div>
            <button type="button" disabled={isLoading} onClick={handleDelete}>Delete</button>
        </section>
    )
}