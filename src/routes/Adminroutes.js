import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavScrollTop from "../components/Navscrolltop/index";


// // Stock Type
import StockType from '../pages/Stock-Type/index';
import AddStockType from '../pages/Stock-Type/add';

// // Stocks
import Stock from '../pages/Stocks/index';
import AddStock from '../pages/Stocks/add';
import EditStock from '../pages/Stocks/edit';

// // Employee
import UsersList from '../pages/Users/index';
import AddEmployee from '../pages/Users/add';
import EditEmployee from '../pages/Users/edit';

// // Fuel Dispenser
import FuelDispensersList from '../pages/Fuel-Dispenser/index';
import EditFuelDispenser from '../pages/Fuel-Dispenser/edit';
import AddFuelDispenser from '../pages/Fuel-Dispenser/add';


// // Admin Sales
import Salelist from '../pages/Sales/index';
import AddSale from '../pages/Sales/add';
import EditSale from '../pages/Sales/edit';


const Adminroutes=()=>{

    return(

        // <Router>
        // <NavScrollTop>
    
    
            <Switch>
    
           
                 <Route exact 
                    path={`${process.env.PUBLIC_URL + "/stock-type"}`}
                   
                    component={StockType}
                />
                  <Route  exact 
                    path={`${process.env.PUBLIC_URL + "/add-stock-type"}`}
                   
                    component={AddStockType}
                />
    
                <Route exact path={`${process.env.PUBLIC_URL + "/stock"}`}
                   
                    component={Stock}
                />
                  <Route exact 
                    path={`${process.env.PUBLIC_URL + "/add-stock"}`}
                   
                    component={AddStock}
                />
                 <Route exact 
                    path={`${process.env.PUBLIC_URL + "/edit-stock/:id"}`}
                   
                    component={EditStock}
                />
    
    
              
                 <Route exact  
                   path={`${process.env.PUBLIC_URL + "/add-employee"}`}
                  
                   component={AddEmployee}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/edit-employee/:id"}`}
                  
                   component={EditEmployee}
               />
    
                
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/users"}`}
                  
                   component={UsersList}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/fuel_dispensers"}`}
                  
                   component={FuelDispensersList}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/edit-dispenser/:id"}`}
                  
                   component={EditFuelDispenser}
               />   
               
               <Route exact 
                   path={`${process.env.PUBLIC_URL + "/add-dispenser"}`}
                  
                   component={AddFuelDispenser}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/sales-list"}`}
                  
                   component={Salelist}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/add-sale"}`}
                  
                   component={AddSale}
               />
    
                <Route exact 
                   path={`${process.env.PUBLIC_URL + "/edit-sale/:id"}`}
                  
                   component={EditSale}
               /> 
    
         
            </Switch>
        
    )
}

export default Adminroutes;