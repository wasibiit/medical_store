import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import { NavLink, Redirect } from "react-router-dom";
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';


toast.configure({
    autoClose: 8000,
    draggable: false,
});

class Login extends React.Component{

constructor(props){
super(props);

this.state = {
bgimg:"img/loginimg.jpg",
email:'',
password:'',
redirect:false
}


this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
}



handleChange(event){
    this.setState({
    [event.target.name] : event.target.value
    })
    }


handleSubmit(event){

event.preventDefault();


fetch(API_URL.url+'/login',{
    method:"POST",
    headers: {
        "Origin": "*",               
        "Content-Type": "application/json",
        "Accept": "application/json",             
    },
    body: JSON.stringify(this.state)
}).then((response)=>{
    response.json().then((result)=>{
       
        localStorage.setItem('token',result.user.token);
        toast.success(`${Notifications.loginsuccess}`, {
            position: toast.POSITION.TOP_RIGHT      });

            this.setState({ redirect: true });
                
           
            

    })
}).catch((error)=>{
   
        toast.error(`${Notifications.notlogin}`, {
            position: toast.POSITION.TOP_RIGHT      });
})
}


render(){

    if (this.state.redirect) {
        return <Redirect to='/dashboard'/>;
      }

return (

<Container>
<ToastContainer />
    <Row className="justify-content-center">

        <Col xl={10} lg={12} md={9}>

        <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">

                <Row>
                    <Col lg={6} className="d-none d-lg-block bg-login-image"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + this.state.bgimg})`}}>
                    </Col>
                    <Col lg={6}>
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>

                        <Form className="user" onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control className="form-control-user" name='email' value={this.state.email}
                                    onChange={this.handleChange} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">

                                <Form.Control className="form-control-user" name="password" value={this.state.password}
                                    onChange={this.handleChange} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="btn-user btn-block">
                                Submit
                            </Button>
                        </Form>


                        <hr />
                        <div className="text-center">
                            <NavLink className="small" to={process.env.PUBLIC_URL + "/forgot-password" }>Forgot
                                Password?</NavLink>
                        </div>
                        <div className="text-center">
                            <NavLink className="small" to={process.env.PUBLIC_URL + "/register" }>Create an Account!
                            </NavLink>
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

export default Login;