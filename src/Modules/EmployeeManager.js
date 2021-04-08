const employeeURL = "http://localhost:5002"

export const getEmployeeById = (id) => {
    return fetch (`${employeeURL}/employees/${id}?_expand=location`)
    .then(response => response.json())
}

export const getAllEmployees = () => {
    return fetch (`${employeeURL}/employees`)
    .then(response => response.json())
}

export const deleteEmployees = (id) => {
    return fetch (`${employeeURL}/employees/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const addEmployee = (newEmployee) => {
    return fetch(`${employeeURL}/employees`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEmployee)
    }).then(response => response.json())
}