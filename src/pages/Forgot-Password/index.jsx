import React from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink } from "react-router-dom";
class ForgotPsd extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            bgimg:"img/login-punch.png",
         
        }
    }

    render(){
    
    return (

        <Container>

        <Row className="justify-content-center">

            <Col xl={10} lg={12} md={9} >

                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                      
                        <Row>
                            <Col lg={6}  className="d-none d-lg-block bg-login-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + this.state.bgimg})`}}></Col>
                            <Col lg={6}>
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                        <p class="mb-4">We get it, stuff happens. Just enter your email address below
                                            and we'll send you a link to reset your password!</p>
                                    </div>
                                   
                                    <Form className="user">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                           
                                            <Form.Control className="form-control-user" type="email" placeholder="Enter email" />
                                          
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
}

export default ForgotPsd;