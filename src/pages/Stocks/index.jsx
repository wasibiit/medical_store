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

const Stock= props =>{
const [stocks, setStocks] = useState([])
const [id,setId] = useState('');
const [total_stock_purchased,setTotal_stock_purchased] = useState();
const [total_investment,setTotal_investment] = useState();
const [purchase_date,setPurchase_date] = useState('');
const [purchased_from,setPurchase_from] = useState('');
const [delivered_by,setDelivered_by] = useState('');
const [stock_type_id,setStock_type_id] = useState(0);


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
const res = await fetch(API_URL.url+'/stocks', {

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
setStocks(resp.data);

},
(error) => {
}
)

}

fetchData();
}, [])


function handleDelete(id) {

fetch(API_URL.url+"/stock", {
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
            <h4 className="m-0 font-weight-bold text-primary">Stock</h4>
            <Link to={process.env.PUBLIC_URL + "/add-stock" } className="btn btn-primary btn-icon-split">
            <span className="icon text-white-50">
                <i className="fas fa-plus"></i>
            </span>
            <span className="text">Stock</span>
            </Link>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-striped table-bordered stocktable" id="dataTable" width="100%"
                    cellSpacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Stock Name</th>
                            <th>Total Purchase</th>
                            <th>Total Investment</th>
                            <th>Purchase Date</th>
                            <th>Purchase From</th>
                            <th>Delivered by</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>{


                        stocks.map((stocks,index)=>(

                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{stocks.stock.stock_type}</td>                           
                            <td>{stocks.stock.total_stock_purchased}</td>
                            <td>{stocks.stock.total_investment}</td>
                            <td>{stocks.stock.purchase_date}</td>
                            <td>{stocks.stock.purchased_from}</td>
                            <td>{stocks.stock.delivered_by}</td>
                            <td>
                                <div className="actbtns">



                                    <Link to={process.env.PUBLIC_URL + "/edit-stock/"+stocks.stock.id } type="button" 
                                        className="btn btn-info"><i className="fas fa-pencil-alt"></i>

                                    </Link>
                                    <Button className="btn btn-danger" onClick={()=>
                                        handleDelete(stocks.stock.id)}><i className="fas fa-trash-alt"></i></Button>
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

export default Stock;