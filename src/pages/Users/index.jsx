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

const Userslist= props =>{

const [userslist,setUserslist] = useState([]);


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




const fetchData = async () => {
    const res = await fetch(API_URL.url+'/users', {
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
    (response) => {
        setUserslist(response.data);
    console.log(response.data);
    },
    (error) => {
    }
    )
    
    }

fetchData();
}, [])


function handleDelete(id) {

    fetch(API_URL.url+"/employee", {
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
            <h4 className="m-0 font-weight-bold text-primary">Users List</h4>
         
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped table-bordered stocktable userstable" id="dataTable" width="100%"
                    cellSpacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                  
                    <tbody>{


                    userslist.map((user,index)=>(

                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.user.name}</td>
                            <td>{user.user.email}</td>
                            <td>{user.user.gender}</td>
                            <td>{user.user.role}</td>        
                            <td>
                                <div className="actbtns">

                                    {user.user.role=='employee'? <a href="#" className="btn btn-info"><i className="fas fa-pencil-alt"></i></a>: <Link to={{pathname:"/add-employee",state:{userid:user.user.id} }} className="btn btn-success"><i className="fas fa-user-tie"></i></Link>}
                                   
                                    
                                    <Button className="btn btn-danger" onClick={()=>
                                        handleDelete(user.user.id)} ><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </td>
                        </tr>))
                        
                        }</tbody>
                

                </table>
            </div>
        </div>
    </div>
</Layout>

)

}

export default Userslist;