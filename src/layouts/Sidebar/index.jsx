import { Link } from "react-router-dom";
import { getRole } from "../../utils/common";
import Empmenu from "./Empmenu";
import Adminmenu from "./Adminmenu";
import Usermenu from "./Usermenu";


const Sidebar =(props)=>{

    const getRoutesBy = (role) => {return role === "admin" ? <Adminmenu/> : role === "employee" ? <Empmenu/> : role === "customer" ? <Usermenu/> : <Usermenu/>;}

    return(

        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${props.togglecls ? "toggled" : "no"}`}  id="accordionSidebar" >

            
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Petrol Pump</div>
            </a>

           
            <hr className="sidebar-divider my-0"/>

           
            <li className="nav-item active">
                <Link className="nav-link" to={process.env.PUBLIC_URL + "/dashboard" }>
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>


           
            {getRoutesBy(getRole("token"))}
           

        </ul>


    )

}

export default Sidebar;