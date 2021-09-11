import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { useParams } from "react-router-dom";


toast.configure({
autoClose: 8000,
draggable: false,
});

const EditEmployee =()=>{

    const params = useParams();

    const [id,setId] = useState('');
    const [token,setToken] = useState('');

    // useEffect(() => {
       
        
    //     },[])

        const handleSubmit = async (e) => {
            e.preventDefault();
    
            await fetch(API_URL.url+`/stock-type/${params.productname}`, {
                method: "PUT",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": id,
                   
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
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Stock</h6>
            </div>
            <div className="card-body">
                <div className="p-5">
                    <Form className="user" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='id' value={params.productname}
                                onChange={e=>setId(e.target.value)} type="text" placeholder="Enter stock name" />

                        </Form.Group>

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