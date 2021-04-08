import React from "react";
import "./Customer.css";
import { Link } from "react-router-dom";

export const CustomerCard = ({customer, handleDeleteCustomer}) => (
    <div className="card">
        <div className="card-content">
            <h3 className="content-customername">Name: {customer.name}</h3>
            <p className="customer__address">Address: {customer.address}</p>
            <Link to={`/customers/${customer.id}`}>
                <button>Details</button>
                </Link>
            <button type="button" onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
        </div>
    </div>
)