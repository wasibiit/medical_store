import React,{useState,useEffect}from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import {setCookie,getToken} from "../../utils/common";
import { NavLink } from "react-router-dom";
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import { useHistory } from 'react-router-dom';


toast.configure({
    autoClose: 8000,
    draggable: false,
});

const Login =()=>{

const [validated, setValidated] = useState(false);
const [bgimg,setBgimg] = useState('img/loginimg.jpg');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');

const history = useHistory();


useEffect(() => {

    if(getToken("token")){

        history.push('/dashboard');
    } else{
        history.push('/login');
    }

}, [])


const handleSubmit= async(event)=>{
    event.preventDefault();


        await fetch(API_URL.url+'/login',{
            method:"POST",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",             
            },
            body: JSON.stringify({
                "login": email,
                "password": password,
            })
        }).then((response)=>{
            response.json().then((result)=>{
        
        
                if (result.token === null || result.token === undefined) {
                    
                    toast.error(`${Notifications.invalidcred}`, {
                        position: toast.POSITION.TOP_RIGHT      });
        
                        // history.push('/login');
                } else {
                    
                   setCookie("token", result.token+":0z54x3"+result.role+"y9kv638")
                history.push('/dashboard');
                    window.location.href = "/dashboard";
                }
                   
        
            })
        }).catch((error)=>{
           
                toast.error(`${Notifications.notlogin}`, {
                    position: toast.POSITION.TOP_RIGHT      });
        })


    



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
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/' + bgimg})`}}>
                    </Col>
                    <Col lg={6}>
                    <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>

                        <Form noValidate validated={validated} className="user" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationCustom01">
                          
                                <Form.Control className="form-control-user" name='text' 
                                    onChange={e=>setEmail(e.target.value)} type="text" placeholder="Enter email" required />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="validationCustom02">

                                <Form.Control className="form-control-user" name="password" 
                                    onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required />
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

export default Login;