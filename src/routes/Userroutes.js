import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Test from '../pages/Test/test';


const Userroutes=()=>{

    return(

        // <Router>
        // <NavScrollTop>
    
    
            <Switch>
    
            <Route  exact 
        path={`${process.env.PUBLIC_URL + "/test"}`}
       
        component={Test}
    />     
         
            </Switch>
    //     </NavScrollTop>
    // </Router>
    )
}

export default Userroutes;