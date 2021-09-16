import React from "react";
import { Link } from "react-router-dom";


const Usermenu=()=>{

    return(

        <React.Fragment>

        <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/test" }>
            <i className="fas fa-fw fa-users"></i>
            <span> Test</span></Link>
            
    </li>

    
    </React.Fragment>

    )

}

export default Usermenu;