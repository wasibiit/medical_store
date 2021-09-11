import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import {Link,useLocation} from 'react-router-dom';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';


toast.configure({
autoClose: 8000,
draggable: false,
});

const AddEmployee =()=>{

const [salary,setSalary] = useState('');
const [city,setCity] = useState('');
const [contract_begin_date,setContract_begin_date] = useState('');
const {state} = useLocation();


const handleSubmit = async (e) => {
e.preventDefault();

await fetch(API_URL.url+'/employee', {
method: "POST",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": state.userid,
"city": city,
"salary": salary,
"contract_begin_date": contract_begin_date,
})
})
.then(res => res.json())
.then(
(result) => {

console.log(result);

toast.success(`${Notifications.addedsuccess}`, {
position: toast.POSITION.TOP_RIGHT });




},
(error) => {
toast.error(`${Notifications.notaddfailed}`, {
position: toast.POSITION.TOP_RIGHT });
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
                <h6 className="m-0 font-weight-bold text-primary">Add Employee</h6>
            </div>
            <div className="card-body">
                <div className="p-3">
                    <Form className="user" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='city' onChange={e=>setCity(e.target.value)}
                                type="text" placeholder="Enter city name" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='salary' onChange={e=>setSalary(e.target.value)}
                                type="number" placeholder="Enter Salary" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">

                            <Form.Control className="form-control-user" name='id' onChange={e=>setContract_begin_date(e.target.value)}
                                type="date" placeholder="Enter contract date" />

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

export default AddEmployee;