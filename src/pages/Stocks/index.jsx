import React, { useState, useEffect} from 'react';
import {Form,Button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import API_URL from '../../utils/api';
import Layout from '../../layouts/index';
import {Link} from 'react-router-dom';
import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
import TablePagination from 'rsuite/lib/Table/TablePagination';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon } from 'rsuite';

toast.configure({
autoClose: 8000,
draggable: false,
});

const Stock= props =>{
const [stocks, setStocks] = useState([])
const [displayLength, setDisplayLength] = useState(10)
const [loading, setloading] = useState(false)
const [page, setPage] = useState(1)


useEffect(() => {

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

const handleChangePage=(dataKey)=>{
setPage(dataKey);
}
const handleChangeLength=(dataKey)=>{
setPage(1);
setDisplayLength(dataKey);
}
const getData=()=>{

return stocks.filter((v, i) => {
const start = displayLength * (page - 1);
const end = start + displayLength;
return i >= start && i < end; }); } 

const data=getData(); return( <Layout>
    <ToastContainer />
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Stock</h4>
            <Link to={process.env.PUBLIC_URL + "/add-stock" } className="btn btn-primary btn-icon-split">
            <span className="icon text-white-50">
                <i className="fas fa-plus"></i>
            </span>
            <span className="text">Add</span>
            </Link>
        </div>
        <div className="card-body">

            <Table data={data} loading={loading} height={350}>
                <Column minWidth={60}>
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <span>{rowIndex+1}</span>;
                        }}
                    </Cell>
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Stock Name</HeaderCell>
                    <Cell dataKey="stock_type" />
                </Column>

                <Column minWidth={180} flexGrow={1}>
                    <HeaderCell>Total Purchase</HeaderCell>
                    <Cell dataKey="total_stock_purchased" />
                </Column>

                <Column minWidth={180} flexGrow={1}>
                    <HeaderCell>Total Investment</HeaderCell>
                    <Cell dataKey="total_investment" />
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Purchase Date</HeaderCell>
                    <Cell dataKey="purchase_date" />
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Purchase From</HeaderCell>
                    <Cell dataKey="purchased_from" />
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Delivered by</HeaderCell>
                    <Cell dataKey="delivered_by" />
                </Column>

                <Column minWidth={120} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        <span>
                            <Link to={"/edit-stock/"+rowData.id}> <Icon icon="edit2" />
                            </Link> | {' '}
                            <a onClick={()=>handleDelete(rowData.id)}>
                                <Icon icon="trash" /> </a>
                        </span>
                        );
                        }}
                    </Cell>
                </Column>

            </Table>
            <TablePagination lengthMenu={[ { value: 8, label: 8 }, { value: 20, label: 20 } ]} activePage={page}
                displayLength={displayLength} total={stocks.length} onChangePage={handleChangePage}
                onChangeLength={handleChangeLength} />

            {/* <div className="table-responsive">
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
                            <td>{stocks.stock_type}</td>
                            <td>{stocks.total_stock_purchased}</td>
                            <td>{stocks.total_investment}</td>
                            <td>{stocks.purchase_date}</td>
                            <td>{stocks.purchased_from}</td>
                            <td>{stocks.delivered_by}</td>
                            <td>
                                <div className="actbtns">



                                    <Link to={process.env.PUBLIC_URL + "/edit-stock/" +stocks.id } type="button"
                                        className="btn btn-info"><i className="fas fa-pencil-alt"></i>

                                    </Link>
                                    <Button className="btn btn-danger" onClick={()=>
                                        handleDelete(stocks.stock.id)}><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </td>
                        </tr>))}</tbody>


                </table>
            </div> */}
        </div>
    </div>
    </Layout>

    )

    }

    export default Stock;