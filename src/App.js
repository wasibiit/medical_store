import React from 'react';
import jquery from 'jquery'; 
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavScrollTop from "./components/Navscrolltop/index";
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import ForgotPsd from './pages/Forgot-Password/index';
import ResetPsd from './pages/Reset-Password/index';
import Dashboard from './pages/Dashboard';
// Stock Type
import StockType from './pages/Stock-Type/index';
import AddStockType from './pages/Stock-Type/add';

// Stocks
import Stock from './pages/Stocks/index';
import AddStock from './pages/Stocks/add';
import EditStock from './pages/Stocks/edit';

// Employee
import UsersList from './pages/Users/index';
import AddEmployee from './pages/Users/add';
import EditEmployee from './pages/Users/edit';

// Fuel Dispenser
import FuelDispensersList from './pages/Fuel-Dispenser/index';
import EditFuelDispenser from './pages/Fuel-Dispenser/edit';
import AddFuelDispenser from './pages/Fuel-Dispenser/add';


// Sales
import Saleslist from './pages/Sales/index';
// import EditFuelDispenser from './pages/Fuel-Dispenser/edit';
// import AddFuelDispenser from './pages/Fuel-Dispenser/add';

function App() {
    window.$ = window.jQuery = jquery;
  return (
    <Router>
    <NavScrollTop>
        <Switch>
            <Route
                path={`${process.env.PUBLIC_URL + "/login"}`}
                exact
                component={Login}
            />
            <Route
                path={`${process.env.PUBLIC_URL + "/register"}`}
                component={Register}
            />
             <Route
                path={`${process.env.PUBLIC_URL + "/forgot-password"}`}
                component={ForgotPsd}
            />
             <Route
                path={`${process.env.PUBLIC_URL + "/reset:id"}`}
                component={ResetPsd}
            />
            <Route
                path={`${process.env.PUBLIC_URL + "/dashboard"}`}
                
                component={Dashboard}
            />
             <Route
                path={`${process.env.PUBLIC_URL + "/stock-type"}`}
               
                component={StockType}
            />
              <Route
                path={`${process.env.PUBLIC_URL + "/add-stock-type"}`}
               
                component={AddStockType}
            />

            <Route path={`${process.env.PUBLIC_URL + "/stock"}`}
               
                component={Stock}
            />
              <Route
                path={`${process.env.PUBLIC_URL + "/add-stock"}`}
               
                component={AddStock}
            />
             <Route
                path={`${process.env.PUBLIC_URL + "/edit-stock/:id"}`}
               
                component={EditStock}
            />


          
             <Route
               path={`${process.env.PUBLIC_URL + "/add-employee"}`}
              
               component={AddEmployee}
           />

            <Route
               path={`${process.env.PUBLIC_URL + "/edit-employee/:id"}`}
              
               component={EditEmployee}
           />

            
            <Route
               path={`${process.env.PUBLIC_URL + "/users"}`}
              
               component={UsersList}
           />

            <Route
               path={`${process.env.PUBLIC_URL + "/fuel_dispensers"}`}
              
               component={FuelDispensersList}
           />

            <Route
               path={`${process.env.PUBLIC_URL + "/edit-dispenser/:id"}`}
              
               component={EditFuelDispenser}
           />   
           
           <Route
               path={`${process.env.PUBLIC_URL + "/add-dispenser"}`}
              
               component={AddFuelDispenser}
           />

            <Route
               path={`${process.env.PUBLIC_URL + "/sales"}`}
              
               component={Saleslist}
           />


             {/* <Route
                path={`${process.env.PUBLIC_URL + "/edit-stock/:productname"}`}
               
                component={EditStock}
            /> */}

<Route path="*" component={Login} />
           
        
        </Switch>
    </NavScrollTop>
</Router>

  );
}

export default App;
