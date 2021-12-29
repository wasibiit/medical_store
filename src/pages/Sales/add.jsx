import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import {Row,Col} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { DateTimeInput } from '@jalik/react-datetime-picker';
import '@jalik/react-datetime-picker/src/styles.css';
import {useHistory,Link} from 'react-router-dom';
import { Formik, Field, ErrorMessage,Form } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';

toast.configure({
autoClose: 8000,
draggable: false,
});


const AddSale =()=>{

const [fuel_dispenser_list,setFuel_dispenser_list] = useState([]);
const [fuel_dis_id,setFuel_dis_id] = useState(0);
const [fuel_dis_ids,setFuel_dis_ids] = useState('');
const [start_meter,setStart_meter] = useState('');
const [started_at,setStarted_at] = useState(new Date().toISOString());
const [ended_at,setEnded_at] = useState(new Date().toISOString());
const [employee_id,setEmployee_id] = useState('');
const [employee_name,setEmployee_name] = useState('');
const [fuel_dispenser_name,setFuel_dispenser_name] = useState('');
const [loading, setloading] = useState(false)

const history = useHistory();


useEffect(() => {


    const fetchDispenserData = async() => {
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

         
        
        
        },
        (error) => {
        }
        )
        
        }

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
                    setEmployee_id(resp.id);

                    console.log(resp)
                   
                
                },
                (error) => {
                }
                )
                
                }
       
        
        fetchDispenserData();
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
            "id":`${id}`,
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
                <h6 className="m-0 font-weight-bold text-primary">Add Sale</h6>
            </div>
            <div className="card-body">

            <Formik
                initialValues={{
                   
                    end_meter: '',
                   
                }}
                validationSchema={Yup.object().shape({
                   
                  
                    end_meter: Yup.string()
                        .required('End meter is required'),
                      
                })}
                onSubmit={async fields => { 
                    setloading(true);
                    await fetch(API_URL.url+'/sale', {
                    method: "POST",
                    headers: {
                    "Origin": "*",
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`

                    },
                    body: JSON.stringify({
                    "resource": "sales",
                    "method": "POST",
                    "employee_id": employee_id,
                    "fuel_dispenser_id": fuel_dis_ids,
                    "start_meter": start_meter,
                    "end_meter": fields.end_meter,
                    "started_at": started_at,
                    "employee_name": employee_name,
                    "ended_at": ended_at

                    })
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {

                    

                    if(Object.prototype.hasOwnProperty.call(result, 'error')) {
                        toast.error(`${result["error"]["message"]}`, {
                        position: toast.POSITION.TOP_RIGHT });

                    } else {
                        setloading(false);
                        history.push('/sales-list');
                        toast.success(`${Notifications.addedsuccess}`, {
                    position: toast.POSITION.TOP_RIGHT });
                    }

                    })
                 }}
                >
               {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props;
        return (
                <Form className="user">
                       <div className="row">
                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                            <label htmlFor="fuel_dispenser">Select Fuel Dispenser</label>
                            <select  name="fuel_dispenser" id="fuel_dispenser" className="form-control-user form-control" 
                                onChange={(e)=>onchangeget(e.target.value)}>

                               <option defaultValue={fuel_dis_id}>Select Fuel Dispenser</option>
                                {fuel_dispenser_list.map((fdispenser,i)=>(<option key={i} value={fdispenser.id}>
                                    {fdispenser.machine}</option>))}

                            </select>  
                                          
                            
                        </div>  
                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                            <label htmlFor="select_Employee"> Employee</label>
                        
                            <span className="form-control-user" name='start_meter' >
                               {employee_name}
                            </span>     
                        </div>                      
                        
                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                            <label htmlFor="start_meter">Start Meter</label>
                            <span className="form-control-user" name='start_meter' >
                                {start_meter}
                            </span>                            
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                        <label htmlFor="end_meter">End Meter</label>
                           <Field name="end_meter" type="number" min="0" className={'form-control-user form-control' + (errors.end_meter && touched.end_meter ? ' is-invalid' : '')} />
                           <ErrorMessage name="end_meter" component="div" className="invalid-feedback" />
                        </div>
                       <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                           <label>Start At</label>
                           <DateTimeInput
        format="D tt"
        locale="en-PK"
        name="date"
        onChange={(e)=>setStarted_at(e.target.value)}
        showCalendarIcon
        showCalendarOnFocus
        value={started_at} className="form-control-user form-control"
      />
                       </div>
                       <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                           <label>End At</label>
                           <DateTimeInput
                            format="D tt"
                            locale="en-PK"
                            name="date"
                            onChange={(e)=>setEnded_at(e.target.value)}
                            showCalendarIcon
                            showCalendarOnFocus
                            value={ended_at} className="form-control-user form-control"
                        />
                       </div>

                        <div className="form-group mb-0 col-lg-12 col-md-12 col-sm-12 col-12">
                            <button type="submit" disabled={loading} className="btn-user btn-block btn btn-primary">Submit</button>
                            {
                                loading?<Spinner animation="border" variant="primary" className="mt-3" />:<span></span>
                            }
                        </div>
                        </div>
                        
                    </Form>
 );
      }}
    </Formik>

             



            </div>
        </div>

        </Col>
    </Row>

</Layout>

)
}

export default AddSale;