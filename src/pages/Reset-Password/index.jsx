import React,{useState}from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, useParams } from "react-router-dom";
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';

const ForgotPsd=()=>{

    const params = useParams();
   
    const [bgimg,setBgimg]=useState('img/login-punch.png');
    const [newpassword,setNewpassword]=useState('');
    const [confirmpassword,setConfirmpassword]=useState('');

    
    let prid = params.id;

    const hello = prid.replace(':','');

    console.log(hello);


    const handleSubmit= async(event)=>{

        event.preventDefault();
        
        
        await fetch(API_URL.url+'/forget',{
            method:"POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",             
            },
            body: JSON.stringify({
                "id":hello,
                "password": newpassword
            })
        }).then((response)=>{
            response.json().then((result)=>{
               
        
                toast.success(`${Notifications.loginsuccess}`, {
                    position: toast.POSITION.TOP_RIGHT      });
        
        
            })
        }).catch((error)=>{
           
                toast.error(`${Notifications.notlogin}`, {
                    position: toast.POSITION.TOP_RIGHT      });
        })
        }

        const onchange=(e)=>{

           

            if (e.target.value !== newpassword) {
                
                console.log("please enter same password");

              } else{
                  console.log("password same");
                setConfirmpassword(e.target.value);
              }

        }

    
    return (

        <Container>

        <Row className="justify-content-center">

            <Col xl={10} lg={12} md={9} >

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      
                        <Row>
                            <Col lg={6}  className="d-none d-lg-block bg-login-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' +bgimg})`}}></Col>
                            <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Reset Your Password?</h1>
                                       
                                    </div>
                                   
                                    <Form className="user" onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                            <Form.Control className="form-control-user" type="password" placeholder="Enter new password" onChange={(e)=>setNewpassword(e.target.value)} />
                                          
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                            <Form.Control className="form-control-user" type="password" placeholder="Enter confirm password" onChange={onchange} />
                                          
                                        </Form.Group>

                                       
                                      
                                        <Button variant="primary" type="submit" className="btn-user btn-block">
                                            Reset Password
                                        </Button>
                                        </Form>
                                     
                                   
                                   <hr/>
                                   
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/register"}>Create an Account!</NavLink>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/login"}>Already have an account? Login!</NavLink>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Col>

        </Row>

    </Container>


    )
}

export default ForgotPsd;