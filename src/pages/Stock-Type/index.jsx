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

const StockTypeList= props =>{

const [state, setState] = useState({
    id: "",
    type: ""
})
const [acstatus,setAcstatus] = useState(false);
const [stocktype, setStocktype] = useState([])


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
    const res = await fetch(API_URL.url+'/stock-types', {
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
        setStocktype(response.data);
    console.log(response.data);
    },
    (error) => {
    }
    )
    
    }

fetchData();
}, [])


const handleUpdate = async (e) => {
    e.preventDefault();

await fetch(API_URL.url+"/stock-type", {
method: "PUT",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": `${state.id}`,
"type": state.type
})
})
.then(res => res.json())
.then(
(result) => {

    toast.success(`${Notifications.stockupdatesuccess}`, {
        position: toast.POSITION.TOP_RIGHT });

        setTimeout(() => {
            
$('#updatemodal').modal('hide');
window.location.reload();
          }, 2000);

},
(error) => {
    toast.error(`${Notifications.stockaddfailed}`, {
        position: toast.POSITION.TOP_RIGHT });
})

}

function handleDelete(id) {
    
fetch(API_URL.url+"/stock-type", {
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
            <h4 className="m-0 font-weight-bold text-primary">Stock Type</h4>
            <Link to={process.env.PUBLIC_URL + "/add-stock-type" } className="btn btn-primary btn-icon-split">
            <span className="icon text-white-50">
                <i className="fas fa-plus"></i>
            </span>
            <span className="text">Add Stock Type</span>
            </Link>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped table-bordered stocktable" id="dataTable" width="100%"
                    cellSpacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                  
                    <tbody>{


                        stocktype.map((stock,index)=>(

                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{stock.stock_type.type}</td>
                            <td>
                                <div className="actbtns">


                                    <a href="#updatemodal" data-toggle="modal" onClick={()=> setState({id: stock.stock_type.id, type: stock.stock_type.type})}
                                        className="btn btn-info"><i className="fas fa-pencil-alt"></i>

                                    </a><Button className="btn btn-danger" onClick={() => handleDelete(stock.stock_type.id)}><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </td>
                        </tr>))}</tbody>
                

                </table>
            </div>
        </div>
    </div>

    <div className="modal fade" id="updatemodal">
        <div className="modal-dialog">
            <div className="modal-content">

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card shadow mb-0">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-primary">Edit Stock Type</h6>
                            </div>
                            <div className="card-body">
                                <div className="p-5">
                                    <Form className="user" onSubmit={handleUpdate} method="PUT">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">

                                            <Form.Control className="form-control-user" name='value' value={state.type}
                                                onChange={e=>setState({id:state.id,type:e.target.value})} type="text" placeholder="Enter stock
                                                name" />

                                        </Form.Group>

                                        <Button variant="primary" type="submit"  className="btn-user btn-block">
                                            Update
                                        </Button>
                                    </Form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
</Layout>

)

}

export default StockTypeList;