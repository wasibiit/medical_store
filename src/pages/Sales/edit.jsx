import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {Row,Col,Form,Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { InputNumber } from 'rsuite';
import { DateTimeInput } from '@jalik/react-datetime-picker';
import '@jalik/react-datetime-picker/src/styles.css';
import { useHistory, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

toast.configure({
autoClose: 8000,
draggable: false,
});


const EditSale =(props)=>{

const history = useHistory();
const [id,setId]=useState('');
const [fuel_dispenser_id,setFuel_dispenser_id] = useState('');
const [fuel_dispenser_list,setFuel_dispenser_list] = useState([]);
const [fuel_dis_id,setFuel_dis_id] = useState(0);
const [fuel_dis_ids,setFuel_dis_ids] = useState('');
const [start_meter,setStart_meter] = useState('');
const [end_meter,setEnd_meter] = useState('');
const [started_at,setStarted_at] = useState(new Date().toISOString());
const [ended_at,setEnded_at] = useState(new Date().toISOString());
const [employee_id,setEmployee_id] = useState('');
const [employee_name,setEmployee_name] = useState('');
const [userId,setUserId] = useState('');
const [fuel_dispenser_name,setFuel_dispenser_name] = useState('');
const [employee_list,setEmployee_list] = useState([]);
const [loading, setloading] = useState(false)
const [prloading, setprloading] = useState(false)


useEffect(() => {


    const fetchDispenserData = async() => {

        setloading(true);

        const res = await fetch(API_URL.url+'/fuel-dispensers', {
        
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`
        },
        body: JSON.stringify({
            "resource": "fuel_dispensers",
           "method": "GET"
       })
        })
        .then(res => res.json())
        .then(
        (resp) => {
        

            setFuel_dispenser_list(resp.data);
            setloading(false);
        
        },
        (error) => {
        }
        )
        
        }

        fetchDispenserData();


    fetch(API_URL.url+"/sale", {
        method: "POST",
        headers: {
            "Origin": "*",               
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Notifications.token}`             
           
        },
        body: JSON.stringify({
            "resource": "sales",
            "method": "GET",
            "id": `${props.location.state}`
       })
    })
        .then(res => res.json())
        .then(
            (result) => {
               
                console.log(result)
               
                setId(result.id);
                setEmployee_id(result.id);
                setStart_meter(result.start_meter);
                setEnd_meter(result.end_meter);
                setStarted_at(result.started_at);
                setEnded_at(result.ended_at);
                setFuel_dis_ids(result.fuel_dispenser_id);

            fetch(API_URL.url+"/fuel-dispenser", {
                    
                    method: "POST",
                    headers: {
                    "Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`
                    },
                    body: JSON.stringify({
                        "resource": "fuel_dispensers",
                        "method": "GET",
                        "id": fuel_dis_ids
                   })
                    })
                    .then(res => res.json())
                    .then(
                    (resp) => {
                    
                        setFuel_dispenser_name(resp.machine);
                        setFuel_dispenser_id(resp.id);

                        console.log(resp);

                    
                    },
                    (error) => {
                    }
                    )

                         
     
                
            },
            (error) => {
            
            }
        )


        // Users Data fetch

        const fetchDispenserDatauser = async() => {
            const res = await fetch(API_URL.url+'/user', {
            
            method: "POST",
            headers: {
            "Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${Notifications.token}`
            },
            body: JSON.stringify({
            "resource": "users",
               "method": "GET",
               "token": `${Notifications.token}`
           })
            })
            .then(res => res.json())
            .then(
            (resp) => {
            
              
                setEmployee_name(resp.name);
                setEmployee_id(resp.employee.id);

               
            
            },
            (error) => {
            }
            )
            
            }

            fetchDispenserDatauser();



},[]);


function onchangeget(id){

    fetch(API_URL.url+`/fuel-dispenser`, {
        
        method: "POST",
        headers: {
        "Origin": "*",
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${Notifications.token}`
        },
        body: JSON.stringify({
            "id": `${id}`,
            "resource": "fuel_dispensers",
            "method": "GET"          
            
            })
        })
        .then(res => res.json())
        .then(
        (resp) => {
        

        setFuel_dis_ids(resp.id);
        setFuel_dispenser_name(resp.machine);
        setStart_meter(resp.meter);
        
        },
        (error) => {
        }
        )

}


const handleUpdate = async (e) => {
e.preventDefault();
setprloading(true);
await fetch(API_URL.url+'/sale', {
method: "PUT",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${Notifications.token}`

},
body: JSON.stringify({
"id": id,
"resource": "sales",
"method": "UPDATE",
"end_meter": end_meter,
"fuel_dispenser_name": fuel_dispenser_name,
"employee_id": employee_id,
"employee_name": employee_name,
"started_at": started_at,
"ended_at": ended_at,
"fuel_dispenser_id": fuel_dis_ids,

})
})
.then(res => res.json())
.then(
(result) => {
    setprloading(false);
    history.push('/sales-list');

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
   
    <Row>


        <Col lg={7} md={7} sm={12}>
        <Link to={process.env.PUBLIC_URL + "/sales-list" } className="btn btn-secondary btn-icon-split mb-3">
            <span className="icon text-white-50">
                <i className="fas fa-arrow-left"></i>
            </span>
            <span className="text">Back</span>
            </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Sale</h6>
            </div>
            <div className="card-body">

            {
                                loading?<><div className="prloader"><Spinner animation="border" variant="primary" /></div></>:<Form className="user" onSubmit={handleUpdate}>
                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPurchase">
                        <Form.Label>Selected Fuel Dispenser</Form.Label>
                        <select name="fuel_dispenser" id="fuel_dispenser" className="form-control-user form-control"
                                onChange={(e)=>onchangeget(e.target.value)} value={fuel_dis_ids}>

                               <option defaultValue={fuel_dis_id}>Select Fuel Dispenser</option>
                                {fuel_dispenser_list.map((fdispenser,i)=>(<option key={i} value={fdispenser.id}>
                                    {fdispenser.machine}</option>))}

                            </select>
                         
                        </Form.Group>


                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicInvest">
                        <Form.Label> Employee</Form.Label>
                        <span className="form-control-user" name='start_meter' value={start_meter}>
                                {employee_name}
                            </span>

                        </Form.Group>

                    </div>

                    <div className="row">
                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicInvest">
                        <Form.Label>Start Meter</Form.Label>
                            <span className="form-control-user" name='start_meter' value={start_meter}>
                                {start_meter}
                            </span>


                        </Form.Group>
                  
                    <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPDate">
                        <Form.Label>End Meter</Form.Label>
                                    <InputNumber className="form-control-user"  name='end_meter' onChange={(e)=>setEnd_meter(e)} value={end_meter} />
                        </Form.Group>
                        </div>
                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPDate">
                        <Form.Label>Started At</Form.Label>
                      
                      

                            <DateTimeInput
                        format="D tt"
                        locale="en-PK"
                        name="date"
                        onChange={(e)=>setStarted_at(e.target.value)}
                        showCalendarIcon
                        showCalendarOnFocus
                        value={started_at} className="form-control-user form-control"
                    />

                        </Form.Group>
                      
                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPurfrom">
                        <Form.Label>Ended At</Form.Label>
                      

                            <DateTimeInput
                            format="D tt"
                            locale="en-PK"
                            name="date"
                            onChange={(e)=>setEnded_at(e.target.value)}
                            showCalendarIcon
                            showCalendarOnFocus
                            value={ended_at} className="form-control-user form-control"
                        />
                        </Form.Group>

                    </div>


                    <Button disabled={prloading} variant="primary" type="submit" className="btn-user btn-block">
                        Update
                    </Button>

                    {
                                prloading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                </Form>
                            }

                



            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default EditSale;