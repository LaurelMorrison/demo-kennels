const customerURL = "http://localhost:5002"

export const getCustomerById = (id) => {
    return fetch(`${customerURL}/customers/${id}?_expand=location&_expand=animal`)
    .then(response => response.json())
}

export const getAllCustomers = () => {
    return fetch (`${customerURL}/customers`)
    .then(response => response.json())
}

export const deleteCustomer = (id) => {
    return fetch(`${customerURL}/customers/${id}`, {
        method: "DELETE"
    }).then(response => response.json())
}

export const addCustomer = (newCustomer) => {
    return fetch(`${customerURL}/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomer)
    }).then(response => response.json())
}