import React from "react";
import { Link } from "react-router-dom";


const Adminmenu=()=>{

    return(

        <React.Fragment>

        <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/users" }>
            <i className="fas fa-fw fa-users"></i>
            <span> Admin Users</span></Link>
            
    </li>

    <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/stock-type" }>
            <i className="fas fa-fw fa-layer-group"></i>
            <span>Admin Stock Type</span></Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/stock" }>
            <i className="fas fa-fw fa-layer-group"></i>
            <span>Admin Stocks</span></Link>
    </li>

    <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/fuel_dispensers" }>
            <i className="fas fa-fw fa-layer-group"></i>
            <span>Admin Fuel Dispensers</span></Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" to={process.env.PUBLIC_URL + "/sales-list" }>
            <i className="fas fa-fw fa-layer-group"></i>
            <span>Admin Sales</span></Link>
    </li>  
    </React.Fragment>

    )

}

export default Adminmenu;