import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Notifications from '../../utils/notifications';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, Redirect } from 'react-router-dom';
import API_URL from '../../utils/api';


toast.configure({
    autoClose: 8000,
    draggable: false,
});


const Register =()=>{

    const [bgimg,setBgimg] = useState('img/registerimg.png');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [redirect,setRedirect] = useState(false);



    const submit = async (e) => {
        e.preventDefault();

        await fetch(API_URL.url+'/register', {
            method: "POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",             
               
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
                "gender": gender
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                   
                    toast.success(`${Notifications.regsuccess}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                },
                (error) => {
                    toast.error(`${Notifications.regerror}`, {
                        position: toast.POSITION.TOP_RIGHT      });
                }
            )

            setRedirect(true);
   
    }

     if(redirect){

        return <Redirect to="/login"/>;
     }

  

    return (
        
        <Container>
       <ToastContainer />
        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">


                
                <Row>
                    <Col lg={5} className=" d-none d-lg-block bg-register-image"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + bgimg})`}}></Col>
                    <Col lg={7}>
                    <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                   
                                    <Form className="user" onSubmit={submit} method="POST">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                           
                                           <Form.Control className="form-control-user" type="text" placeholder="Enter Name" onChange={e=>setName(e.target.value)} />
                                         
                                       </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                           <Form.Control className="form-control-user" type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
                                         
                                       </Form.Group>

                                       <Form.Group className="mb-3" controlId="formBasicPassword">
                                           
                                           <Form.Control className="form-control-user" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
                                       </Form.Group>
                                      

                                       <div className="form-group">
                                           <select name="gender" id="gender" className="form-control-user form-control" onChange={e=>setGender(e.target.value)}>
                                           <option>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                           </select>
                                       </div>
                                      
                                      
                                        <Button variant="primary" type="submit" className="btn-user btn-block">
                                            Register
                                        </Button>
                                        </Form>
                                     
                                   
                                   <hr/>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/forgot-password"}>Forgot Password?</NavLink>
                                    </div>
                                    <div className="text-center">
                                        <NavLink className="small" to={process.env.PUBLIC_URL + "/login"}>Already have an account?</NavLink>
                                    </div>
                                </div>
                    </Col>
                </Row>
            </div>
        </div>

    </Container>


    )
}

export default Register;