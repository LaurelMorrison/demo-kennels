const locationURL = "http://localhost:5002";

export const getLocationById = (id) => {
    return fetch (`${locationURL}/locations/${id}?=expand_employee`)
    .then(response => response.json())
}

export const getAllLocations = () => {
    return fetch (`${locationURL}/locations`)
    .then(response => response.json())
}

export const deleteLocations = (id) => {
    return fetch (`${locationURL}/locations/${id}`, {        
        method: "DELETE"
    })
    .then(response => response.json())
}

export const addLocation = (newLocation) => {
    return fetch(`${locationURL}/locations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
    }).then(response => response.json())
}