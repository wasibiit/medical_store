import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import {InputNumber} from 'rsuite';


toast.configure({
autoClose: 8000,
draggable: false,
});

const AddStockType =()=>{

    const [type,setType] = useState('');
    const [price,setPrice] = useState('');


        const handleSubmit = async (e) => {
                e.preventDefault();
        
                await fetch(API_URL.url+'/stock-type', {
                    method: "POST",
                    headers: {
                        "Origin": "*",               
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${Notifications.token}`             
                       
                    },
                    body: JSON.stringify({
                        "type": type,
                        "price": price,
                       
                    })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                           
                            
                            toast.success(`${Notifications.addedsuccess}`, {
                                position: toast.POSITION.TOP_RIGHT      });

                               
                        },
                        (error) => {
                            toast.error(`${Notifications.notaddfailed}`, {
                                position: toast.POSITION.TOP_RIGHT      });
                        }
                    )
           
            }
        
          
return (
<Layout>
    <ToastContainer />
    <Row>


        <Col lg={6} md={6} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/stock-type" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Add Stock Type</h6>
            </div>
            <div className="card-body">
                <div className="p-5">
                    <Form className="user" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Stock Type</Form.Label>
                            <Form.Control className="form-control-user" name='id' 
                                onChange={e=>setType(e.target.value)} type="text" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                           

                            <InputNumber className="form-control-user" name='price' 
                                onChange={e=>setPrice(e)}/>

                        </Form.Group>

                        <Button variant="primary" type="submit" className="btn-user btn-block">
                            Submit
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

export default AddStockType;