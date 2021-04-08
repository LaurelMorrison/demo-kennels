import React, { useState, useEffect} from 'react';
import { getAllCustomers, deleteCustomer } from "../../Modules/CustomerManager";
import { CustomerCard } from './CustomerCard';
import {useHistory} from "react-router-dom";

export const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const history = useHistory();

    const getCustomers = () => {   
        return getAllCustomers().then(customersFromAPI => {
                setCustomers(customersFromAPI)
            })
        }

    const handleDeleteCustomer = id => {
        deleteCustomer(id)
        .then(() => getCustomers())
    }

        useEffect(() => {
            getCustomers();
        }, []);

        return(
        <>
            <section className="section-content">
            <button type="button" className="btn" onClick={() => 
                {history.push("/customers/create")}}> Add Customer
            </button>
            </section>
            <div className="container-cards">
                {customers.map(customer => 
                <CustomerCard 
                    key={customer.id} 
                    customer={customer}
                    handleDeleteCustomer={handleDeleteCustomer}
                    />)}
            </div>
        </>
    );
};
