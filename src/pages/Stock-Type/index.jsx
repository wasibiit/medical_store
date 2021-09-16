import React, { useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import TablePagination from 'rsuite/lib/Table/TablePagination';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon, InputNumber } from 'rsuite';

toast.configure({
autoClose: 8000,
draggable: false,
});

const StockTypeList= props =>{


const [acstatus,setAcstatus] = useState(false);
const [stocktype, setStocktype] = useState([])
const [displayLength, setDisplayLength] = useState(10)
const [loading, setloading] = useState(false)
const [page, setPage] = useState(1)

const [id, setId] = useState('');
const [price, setPrice] = useState('');
const [stock_type, setStock_type] = useState('');


useEffect(() => {

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
"id": `${id}`,
"type": stock_type,
"price": price
})
})
.then(res => res.json())
.then(
(result) => {

    toast.success(`${Notifications.updatedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });

        setTimeout(() => {
            
$('#updatemodal').modal('hide');
window.location.reload();
          }, 2000);

},
(error) => {
    toast.error(`${Notifications.notupdatedsuccess}`, {
        position: toast.POSITION.TOP_RIGHT });
})

}


const getstockdata=(id)=>{
    
    fetch(API_URL.url+`/stock-type/${id}`, {
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
    (result) => {
        
        setId(result.id);
        setPrice(result.price);
        setStock_type(result.type);
    },
    (error) => {
    
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


const handleChangePage=(dataKey)=>{
    setPage(dataKey);
    }
    const handleChangeLength=(dataKey)=>{
    setPage(1);
    setDisplayLength(dataKey);
    }
    const getData=()=>{
    
    return stocktype.filter((v, i) => {
    const start = displayLength * (page - 1);
    const end = start + displayLength;
    return i >= start && i < end; }); } 
    
    const data=getData(); 


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
            <span className="text">Add</span>
            </Link>
        </div>
        <div className="card-body">

        <Table   data={data} loading={loading} height={350} >
                <Column minWidth={70}>
                    <HeaderCell>ID</HeaderCell>

                   <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={200} flexGrow={2}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="type" />
                </Column>
                <Column minWidth={200} flexGrow={2}>
                    <HeaderCell>Price</HeaderCell>
                    <Cell dataKey="price" />
                </Column>
              
                <Column minWidth={120} fixed="right" flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        <span>
                            <a href="#updatemodal" data-toggle="modal" onClick={()=> getstockdata(rowData.id)}> <Icon icon="edit2" />
                            </a> | {' '}
                            <a onClick={()=>handleDelete(rowData.id)}>
                                <Icon icon="trash" /> </a>
                        </span>
                        );
                        }}
                    </Cell>
                </Column>

            </Table>
            <TablePagination lengthMenu={[ { value: 8, label: 8 }, { value: 20, label: 20 } ]} activePage={page}
                displayLength={displayLength} total={stocktype.length} onChangePage={handleChangePage}
                onChangeLength={handleChangeLength} />

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
                                        <Form.Label>Stock Type</Form.Label>
                                            <Form.Control className="form-control-user" name='value' value={stock_type}
                                                onChange={e=>setStock_type(e.target.value)} type="text"  />

                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Price</Form.Label>                                           

                                            <InputNumber className="form-control-user" name='price' value={price}
                                                onChange={e=>setPrice(e)}/>
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