import React from "react"
import "./Location.css"
import { Link } from "react-router-dom"

export const LocationCard = ({location, handleDeleteLocation}) => (
    <div className="card">
        <div className="card-content">
        <h3 className="content-locationname">Name: {location.name}</h3>
        <p className="location__address">Address: {location.address}</p>
        <Link to={`/locations/${location.id}`}>
                <button>Details</button>
            </Link>
        <Link to={`/locations/${location.id}/edit`}>
             <button>Edit</button>
          </Link>
        <button type="button" onClick={() => handleDeleteLocation(location.id)}>Delete</button>
        </div>
    </div>
)