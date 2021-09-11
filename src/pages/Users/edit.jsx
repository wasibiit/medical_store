import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import {Link,useParams} from 'react-router-dom';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';


toast.configure({
autoClose: 8000,
draggable: false,
});

const EditEmployee =()=>{

const params = useParams();
const [id,setId] = useState('');
const [salary,setSalary] = useState('');
const [city,setCity] = useState('');
const [contract_begin_date,setContract_begin_date] = useState('');
const [contract_end_date,setContract_end_date] = useState('');

useEffect(() => {
        
    fetch(API_URL.url+`/employee/${params.id}`, {
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
               
                console.log(result)
               
                setId(result.user.id);
                setSalary(result.user.salary);
                setCity(result.user.city);
                setContract_begin_date(result.user.contract_begin_date);
                setContract_end_date(result.user.contract_end_date);                
            },
            (error) => {
                // toast.error(`${Notifications.stockaddfailed}`, {
                //     position: toast.POSITION.TOP_RIGHT      });
            }
        )           
            
    
    },[])


    const handleUpdate = async (e) => {
        e.preventDefault();

        await fetch(API_URL.url+`/employee`, {
            method: "PUT",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`             
               
            },
            body: JSON.stringify({
                "id": `${id}`,
                "salary": salary,
                "city": city,
                "contract_begin_date": contract_begin_date,
                "contract_end_date": contract_end_date,
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                   
                    toast.success(`${Notifications.updatedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                },
                (error) => {
                    toast.error(`${Notifications.notupdatedsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                }
            )
   
    }
    




return (
<Layout>
    <ToastContainer />
    <Row>


        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/users" } className="btn btn-secondary btn-icon-split mb-3">
        <span className="icon text-white-50">
            <i className="fas fa-arrow-left"></i>
        </span>
        <span className="text">Back</span>
        </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Employee</h6>
            </div>
            <div className="card-body">
                <div className="p-3">
                    <Form className="user" onSubmit={handleUpdate}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='city' value={city} onChange={e=>setCity(e.target.value)}
                                type="text" placeholder="Enter city name" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='salary' value={salary} onChange={e=>setSalary(e.target.value)}
                                type="number" placeholder="Enter Salary" />

                        </Form.Group>

                        <Row>
                            <Col lg={6} md={6} sm={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="form-control-user" name='contract_begin_date' value={contract_begin_date} onChange={e=>
                                    setContract_begin_date(e.target.value)}
                                    type="date" placeholder="Enter contract start date" />

                            </Form.Group>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="form-control-user" name='contract_end_date' value={contract_end_date} onChange={e=>
                                    setContract_end_date(e.target.value)}
                                    type="date" placeholder="Enter contract end date" />

                            </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" type="submit" className="btn-user btn-block">
                            Update
                        </Button>
                    </Form>

                </div>

            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default EditEmployee;