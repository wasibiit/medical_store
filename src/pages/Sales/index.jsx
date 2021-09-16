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

const Saleslist= props =>{
const [saleslist, setSaleslist] = useState([]);
const [displayLength, setDisplayLength] = useState(10);
const [loading, setloading] = useState(false);
const [page, setPage] = useState(1);


useEffect(() => {


const fetchData = async() => {
const res = await fetch(API_URL.url+'/sales', {

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
setSaleslist(resp.data);
console.log(resp.data);

},
(error) => {
}
)

}

fetchData();
}, [])


function handleDelete(id) {

fetch(API_URL.url+"/sale", {
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
    
    return saleslist.filter((v, i) => {
    const start = displayLength * (page - 1);
    const end = start + displayLength;
    return i >= start && i < end; }); } 
    
    const data=getData(); 


return(

<Layout>
    <ToastContainer />
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Sales List</h4>
            <Link to={process.env.PUBLIC_URL + "/add-sale" } className="btn btn-primary btn-icon-split">
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

                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>Employee</HeaderCell>
                    <Cell dataKey="employee_name" />
                </Column> 
                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>Fuel Dispenser</HeaderCell>
                    <Cell dataKey="fuel_dispenser_name" />
                </Column>
                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>Start Meter</HeaderCell>
                    <Cell dataKey="start_meter" />
                </Column>  
                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>End Meter</HeaderCell>
                    <Cell dataKey="end_meter" />
                </Column> 
                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>Started At</HeaderCell>
                    <Cell dataKey="started_at" />
                </Column>
                <Column minWidth={200} flexGrow={3}>
                    <HeaderCell>Ended At</HeaderCell>
                    <Cell dataKey="ended_at" />
                </Column>
              
                <Column minWidth={120} fixed="right" flexGrow={1}>
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {

                        return (
                        <span>
                            <Link to={"/edit-sale/"+rowData.id}> <Icon icon="edit2" />
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
                displayLength={displayLength} total={saleslist.length} onChangePage={handleChangePage}
                onChangeLength={handleChangeLength} />
        </div>
    </div>
</Layout>

)

}

export default Saleslist;