import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sales_list from '../pages/Emp-Sales/index';
import AddEmpSale from '../pages/Emp-Sales/add';


const Emproutes=()=>{

    return(

        // <Router>
        // <NavScrollTop>
    
    
            <Switch>
    
            <Route exact 
               path={`${process.env.PUBLIC_URL + "/sales-lists"}`}
              
               component={Sales_list}
           />     


    
    <Route   exact 
       path={`${process.env.PUBLIC_URL + "/add-emp-sale"}`}
      
       component={AddEmpSale}
   />     
         
            </Switch>
    //     </NavScrollTop>
    // </Router>
    )
}

export default Emproutes;