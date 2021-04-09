import React, {useState, useEffect} from 'react';
import { deleteCustomer, getCustomerById } from "../../Modules/CustomerManager";
import './CustomerDetail.css';
import { useParams, useHistory } from "react-router-dom";

export const CustomerDetail = () => {
    const [customer, setCustomer] = useState({});
    const [setIsLoading] =useState(true)
    const {customerId} = useParams();
    const history = useHistory();

    useEffect(() => {
        getCustomerById(customerId)
        .then(customer => {
            setCustomer({
                name: customer.name,
                address: customer.address,
                location: customer.location,
                animal: customer.animal
          });
          setIsLoading(false);
        });
    }, [customerId]);

    const handleDelete = () => {
        setIsLoading(true);
        deleteCustomer(customerId).then(() =>
        history.push("/customers")
        )
    }

    return (
        <section className="customer">
            <h3 className="customer__name">Name: {customer.name}</h3>
            <div className="customer__address">Address: {customer.address}</div>   
            <div className="customer__location">Shelter: {customer.location?.name}</div>
            <div className="customer__animal">Pet: {customer.animal?.name}</div>
            <button type="button" onClick={handleDelete}>Delete</button>
        </section>    
    )
}