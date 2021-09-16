import React from 'react';
import jquery from 'jquery'; 
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/vendor/fontawesome-free/css/all.min.css';
import './assets/css/sb-admin-2.css';
import Adminroutes from './routes/Adminroutes';
import Userroutes from './routes/Userroutes';
import Emproutes from './routes/Emproutes';
import { getRole } from './utils/common';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavScrollTop from "./components/Navscrolltop/index";

import Login from './pages/Login/index';
import Register from './pages/Register/index';
import ForgotPsd from './pages/Forgot-Password/index';
import ResetPsd from './pages/Reset-Password/index';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/Notfound';


function App() {
    window.$ = window.jQuery = jquery;

    const getRoutesBy = (role) => {return role === "admin" ? <Adminroutes/> : role === "employee" ? <Emproutes/> : role === "customer" ? <Userroutes/>: <Userroutes/>;}

  return (
   
   <React.Fragment>
      
   <Router>
   <NavScrollTop>

   {getRoutesBy(getRole("token"))}
   
    
        <Switch>

       

        {/* <Route  exact 
                path={"/"}
                
                component={Login}
            /> */}

<Route exact path={["/", "/login"]} component={Login} />
            <Route   exact 
                path={`${process.env.PUBLIC_URL + "/register"}`}
                component={Register}
            />
             <Route   exact 
                path={`${process.env.PUBLIC_URL + "/forgot-password"}`}
                component={ForgotPsd}
            />
             <Route   exact 
                path={`${process.env.PUBLIC_URL + "/reset:id"}`}
                component={ResetPsd}
            />
           
            <Route  exact 
                path={`${process.env.PUBLIC_URL + "/dashboard"}`}
                
                component={Dashboard}
            />

            <Route exact  path={`${process.env.PUBLIC_URL + "/404"}`} component={NotFound} />
           
        
        </Switch>
    </NavScrollTop>
</Router>
</React.Fragment>
  );

}

export default App;
