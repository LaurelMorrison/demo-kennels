import React from "react";
import { Route } from "react-router-dom";
import { Home } from "./Home";
import { AnimalList } from "./animal/AnimalList";
import { CustomerList } from "./customer/CustomerList";
import { EmployeeList } from "./employee/EmployeeList";
import { LocationList } from "./location/LocationList";
import { AnimalDetail } from "./animal/AnimalDetail";
import { CustomerDetail } from "./customer/CustomerDetail";
import { EmployeeDetail } from "./employee/EmployeeDetail";
import { LocationDetail } from "./location/LocationDetail";
import { AnimalForm } from './animal/AnimalForm';
import { EmployeeForm } from './employee/EmployeeForm';
import { CustomerForm } from './customer/CustomerForm';
import { LocationForm } from './location/LocationForm';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { AnimalEditForm } from '../components/animal/AnimalEditForm';
import { CustomerEditForm } from '../components/customer/CustomerEditForm';
import { LocationEditForm } from './location/LocationEditForm.js';
import { EmployeeEditForm } from '../components/employee/EmployeeEditForm';



export const ApplicationViews = ({setAuthUser}) => {

    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            {/* Render the animal list when http://localhost:3000/animals */}
            <Route exact path="/animals">
                <AnimalList />
            </Route>

            <Route path="/login">
                <Login setAuthUser={setAuthUser} />
            </Route>

            <Route path="/register">
                <Register setAuthUser={setAuthUser} />
            </Route>

            <Route exact path="/animals/:animalId(\d+)">
                <AnimalDetail />
            </Route>

            <Route path="/animals/create">
                <AnimalForm />
            </Route>

            <Route path="/animals/:animalId(\d+)/edit">
             <AnimalEditForm />
            </Route>

            <Route exact path="/employees">
                <EmployeeList />
            </Route>


            <Route exact path="/employees/:employeeId(\d+)">
                <EmployeeDetail />
            </Route>

            <Route path="/employees/create">
                <EmployeeForm />
            </Route>

            <Route path="/employees/:employeeId(\d+)/edit">
             <EmployeeEditForm />
            </Route>

            <Route exact path="/customers">
                <CustomerList />
            </Route>

            <Route exact path="/customers/:customerId(\d+)">
                <CustomerDetail />
            </Route>


            <Route path="/customers/create">
                <CustomerForm />
            </Route>

            <Route path="/customers/:customerId(\d+)/edit">
             <CustomerEditForm />
            </Route>

            <Route exact path="/locations">
                <LocationList />
            </Route>

            <Route exact path="/locations/:locationId(\d+)">
                <LocationDetail />
            </Route>

            <Route path="/locations/create">
                <LocationForm />
            </Route>

            <Route path="/locations/:locationId(\d+)/edit">
                <LocationEditForm />
            </Route>

        </>
    )
}