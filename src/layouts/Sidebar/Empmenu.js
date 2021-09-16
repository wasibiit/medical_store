import React from "react";
import { Link } from "react-router-dom";

const Empmenu=()=>{

    return(

        <React.Fragment>

        <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/sales-lists" }>
            <i className="fas fa-fw fa-users"></i>
            <span> Sales</span></Link>
            
    </li>

    
    </React.Fragment>

    )

}

export default Empmenu;