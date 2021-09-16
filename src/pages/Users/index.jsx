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

const Userslist= props =>{

const [userslist,setUserslist] = useState([]);
const [displayLength, setDisplayLength] = useState(10)
const [loading, setloading] = useState(false)
const [page, setPage] = useState(1)



useEffect(() => {


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

        console.log(result);
    
    toast.success(`${Notifications.deletedsuccess}`, {
    position: toast.POSITION.TOP_RIGHT });
    // window.location.reload();
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
        
        return userslist.filter((v, i) => {
        const start = displayLength * (page - 1);
        const end = start + displayLength;
        return i >= start && i < end; }); } 
        
        const data=getData(); 


return(

<Layout>
    <ToastContainer />
    <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h4 className="m-0 font-weight-bold text-primary">Users List</h4>
         
        </div>
        <div className="card-body">

        <Table   data={data} loading={loading} height={350}>
                <Column minWidth={50} >
                    <HeaderCell>ID</HeaderCell>
                    <Cell>
        {(rowData, rowIndex) => {
          return <span>{rowIndex+1}</span>;
        }}
      </Cell>
                </Column>

                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column minWidth={200} flexGrow={1}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column minWidth={150} flexGrow={1}>
                    <HeaderCell>Gender</HeaderCell>
                    <Cell dataKey="gender" />
                </Column>
                <Column minWidth={120} fixed="right" >
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                        {rowData => {
                          

                        return (                           
                        <span>
                            {rowData.role === 'employee'? 
                            <Link to={"/edit-employee/"+rowData.employee.id} >
                                <i className="fas fa-pencil-alt"></i></Link> : 
                                <Link to={{pathname:"/add-employee",state:{userid: rowData.id} }} >
                                    <i className="fas fa-user-tie"></i></Link>}
                          
                            <a alt={rowData.id} onClick={()=>handleDelete(rowData.id)}>
                                <Icon icon="trash" /> </a>
                        </span>
                        );
                        }}
                    </Cell>
                </Column>

            </Table>
            <TablePagination lengthMenu={[ { value: 8, label: 8 }, { value: 20, label: 20 } ]} activePage={page}
                displayLength={displayLength} total={userslist.length} onChangePage={handleChangePage}
                onChangeLength={handleChangeLength} />


            {/* <div className="table-responsive"> */}
                {/* <table className="table table-striped table-bordered stocktable userstable" id="dataTable" width="100%"
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
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.role}</td>        
                            <td>
                                <div className="actbtns">

                                    {user.role=='employee'? <Link to={process.env.PUBLIC_URL + "/edit-employee/"+user.id} className="btn btn-info"><i className="fas fa-pencil-alt"></i></Link>: <Link to={{pathname:"/add-employee",state:{userid:user.id} }} className="btn btn-success"><i className="fas fa-user-tie"></i></Link>}
                                   
                                    
                                    <Button className="btn btn-danger" onClick={()=>
                                        handleDelete(user.id)} ><i className="fas fa-trash-alt"></i></Button>
                                </div>
                            </td>
                        </tr>))
                        
                        }</tbody>
                

                </table> */}
            {/* </div> */}
        </div>
    </div>
</Layout>

)

}

export default Userslist;