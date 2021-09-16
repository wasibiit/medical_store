// import React, { useState, useEffect} from 'react';
// import {Form,Button} from 'react-bootstrap'
// import { ToastContainer, toast } from 'react-toastify';
// import Notifications from '../../utils/notifications';
// import API_URL from '../../utils/api';
// import Layout from '../../layouts/index';
// import {Link} from 'react-router-dom';
// import { Table, Column, HeaderCell, Cell} from 'rsuite-table';
// import TablePagination from 'rsuite/lib/Table/TablePagination';
// import 'rsuite/dist/styles/rsuite-default.css';
// import { Icon } from 'rsuite';
import Layout from "../../layouts";

// toast.configure({
// autoClose: 8000,
// draggable: false,
// });

 const Saleslist= props =>{

// const [saleslist, setSaleslist] = useState([]);
// const [displayLength, setDisplayLength] = useState(10);
// const [loading, setloading] = useState(false);
// const [page, setPage] = useState(1);


// useEffect(() => {


// const fetchData = async() => {
// const res = await fetch(API_URL.url+'/sales', {

// method: "GET",
// headers: {
// "Origin": "*",
// "Content-Type": "application/json",
// "Accept": "application/json",
// "Authorization": `Bearer ${Notifications.token}`
// }
// })
// .then(res => res.json())
// .then(
// (resp) => {
// setSaleslist(resp.data);
// console.log(resp.data);

// },
// (error) => {
// }
// )

// }

// fetchData();
// }, [])


// function handleDelete(id) {

// fetch(API_URL.url+"/sale", {
// method: "DELETE",
// headers: {
// "Origin": "*",
// "Content-Type": "application/json",
// "Accept": "application/json",
// "Authorization": `Bearer ${Notifications.token}`

// },
// body: JSON.stringify({
// "id": `${id}`,
// })
// })
// .then(res => res.json())
// .then(
// (result) => {

// toast.success(`${Notifications.deletedsuccess}`, {
// position: toast.POSITION.TOP_RIGHT });
// window.location.reload();
// },
// (error) => {
// toast.error(`${Notifications.notdeletedsuccess}`, {
// position: toast.POSITION.TOP_RIGHT });
// })

// }

// const handleChangePage=(dataKey)=>{
//     setPage(dataKey);
//     }
//     const handleChangeLength=(dataKey)=>{
//     setPage(1);
//     setDisplayLength(dataKey);
//     }
//     const getData=()=>{
    
//     return saleslist.filter((v, i) => {
//     const start = displayLength * (page - 1);
//     const end = start + displayLength;
//     return i >= start && i < end; }); } 
    
//     const data=getData(); 


return(

 <Layout>

<h1>HI i am employee</h1>
 </Layout>


)

}

export default Saleslist;