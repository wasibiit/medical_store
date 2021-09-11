import React, { useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

toast.configure({
autoClose: 8000,
draggable: false,
});

const FuelDispensersList= props =>{

const [fuelDispensersList, setFuelDispensersList] = useState([])


useEffect(() => {


$('#dataTable').DataTable({
    "ordering": false,
    searching: false,
    "bPaginate": true,
     "bLengthChange": false,
    "bFilter": false,
    "bInfo": false,
    "bAutoWidth": false
});

const fetchData = async() => {
const res = await fetch(API_URL.url+'/fuel_dispensers', {

method: "GET",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`
}
})
.then(res => res.json())
.then(
(resp) => {

setFuelDispensersList(resp.data);

console.log(resp.data);

},
(error) => {
}
)

}

fetchData();
}, [])


function handleDelete(id) {

fetch(API_URL.url+"/fuel_dispenser", {
method: "DELETE",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${id}`,
})
})
.then(res => res.json())
.then(
(result) => {

toast.success(`${Notifications.deletedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
window.location.reload();
},
(error) => {
toast.error(`${Notifications.notdeletedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
})

}


return(

<Layout>
    <ToastContainer />
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Fuel Dispensers List</h4>
            <Link to={process.env.PUBLIC_URL + "/add-dispenser" } className="btn btn-primary btn-icon-split">
            <span className="icon text-white-50">
                <i className="fas fa-plus"></i>
            </span>
            <span className="text">Add</span>
            </Link>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped table-bordered stocktable" id="dataTable" width="100%"
                    cellSpacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Machine </th>
                            <th>Meter</th>
                            <th>Stock type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{


fuelDispensersList.map((fdispenser,index)=>(

                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{fdispenser.fuel_dispenser.machine}</td>                           
                            <td>{fdispenser.fuel_dispenser.meter}</td>                           
                            <td>{fdispenser.fuel_dispenser.stock_type}</td>                           
                         
                            <td>
                                <div className="actbtns">



                                    <Link to={process.env.PUBLIC_URL + "/edit-dispenser/"+fdispenser.fuel_dispenser.id } type="button" 
                                        className="btn btn-info"><i className="fas fa-pencil-alt"></i>

                                    </Link>
                                    <Button className="btn btn-danger" onClick={()=>
                                        handleDelete(fdispenser.fuel_dispenser.id)}><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </td>
                        </tr>))}</tbody>


                </table>
            </div>
        </div>
    </div>
</Layout>

)

}

export default FuelDispensersList;