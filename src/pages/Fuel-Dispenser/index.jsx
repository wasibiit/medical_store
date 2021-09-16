import React, { useState, useEffect} from 'react';
import {Form} from 'react-bootstrap'
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

const FuelDispensersList= props =>{

const [fuelDispensersList, setFuelDispensersList] = useState([])

const [displayLength, setDisplayLength] = useState(10)
const [loading, setloading] = useState(false)
const [page, setPage] = useState(1)


useEffect(() => {



const fetchData = async() => {
const res = await fetch(API_URL.url+'/fuel-dispensers', {

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

fetch(API_URL.url+"/fuel-dispenser", {
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

return fuelDispensersList.filter((v, i) => {
const start = displayLength * (page - 1);
const end = start + displayLength;
return i >= start && i < end; }); } 

const data=getData(); 

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


            <Table   data={data} loading={loading} height={350}>
                <Column minWidth={70} flexGrow>
                    <HeaderCell>ID</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column minWidth={200} flexGrow>
                    <HeaderCell>Machine</HeaderCell>
                    <Cell dataKey="machine" />
                </Column>
                <Column minWidth={250} flexGrow>
                    <HeaderCell>Meter</HeaderCell>
                    <Cell dataKey="meter" />
                </Column>
                <Column minWidth={200} flexGrow>
                    <HeaderCell>Stock Type</HeaderCell>
                    <Cell dataKey="stock_type" />
                </Column>
                <Column minWidth={120} fixed="right" flexGrow>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        <span>
                            <Link to={"/edit-dispenser/"+rowData.id}> <Icon icon="edit2" />
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
                displayLength={displayLength} total={fuelDispensersList.length} onChangePage={handleChangePage}
                onChangeLength={handleChangeLength} />


            {/* <table className="table table-striped table-bordered stocktable" id="dataTable" width="100%"
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
                        <td>{fdispenser.machine}</td>
                        <td>{fdispenser.meter}</td>
                        <td>{fdispenser.stock_type}</td>

                        <td>
                            <div className="actbtns">



                                <Link to={process.env.PUBLIC_URL + "/edit-dispenser/" +fdispenser.id } type="button"
                                    className="btn btn-info"><i className="fas fa-pencil-alt"></i>

                                </Link>
                                <Button className="btn btn-danger" onClick={()=>
                                    handleDelete(fdispenser.id)}><i className="fas fa-trash-alt"></i></Button>
                            </div>
                        </td>
                    </tr>))}</tbody>


            </table> */}
        </div>
    </div>
    </Layout>

    )

    }

    export default FuelDispensersList;