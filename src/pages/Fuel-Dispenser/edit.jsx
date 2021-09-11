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

const EditStock =()=>{

    const params = useParams();

    const [id,setId] = useState('');
    const [machine,setMachine] = useState('');
    const [meter,setMeter] = useState('');
    const [stock_type_id,setStock_type_id] = useState(0);
    const [stock_type,setStock_type] = useState('');
    const [stocktypelist,setStocktypelist] = useState([]);

    useEffect(() => {
        
        fetch(API_URL.url+`/fuel_dispenser/${params.id}`, {
            method: "GET",
            headers: {
                "Origin": "*",               
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`             
               
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                   
                    console.log(result)
                   
                    setId(result.fuel_dispenser.id);
                    setMachine(result.fuel_dispenser.machine);
                    setMeter(result.fuel_dispenser.meter);
                    setStock_type(result.fuel_dispenser.stock_type);
                    setStock_type_id(result.fuel_dispenser.stock_type_id);
                    
                },
                (error) => {
                    // toast.error(`${Notifications.stockaddfailed}`, {
                    //     position: toast.POSITION.TOP_RIGHT      });
                }
            )

            // Fetch Stock Type Data

            fetch(API_URL.url+'/stock-types', {
                method: "GET",
                headers: {
                "Origin": "*",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${Notifications.token}`
                }
                })
                .then(res => res.json())
                .then(
                (response) => {
                    setStocktypelist(response.data);
                console.log(response.data);
                },
                (error) => {
                }
                )
                
                
        
        },[])

        const onchangefun=(e)=>{

            setStock_type_id(e.target.value)
        var id = e.nativeEvent.target.selectedIndex;
            setStock_type(e.nativeEvent.target[id].text)
        
        }

        const handleUpdate = async (e) => {
            e.preventDefault();
    
            await fetch(API_URL.url+`/fuel_dispenser`, {
                method: "PUT",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": `${id}`,
                    "machine": machine,
                    "meter": meter,
                    "stock_type_id": `${stock_type_id}`,
                    "stock_type": stock_type,
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
    <Col lg={7} md={7} sm={12}>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Fuel Dispenser</h6>
            </div>
            <div className="card-body">

            <Form className="user" onSubmit={handleUpdate}>
                  

                  <Form.Group  controlId="formBasicPurchase">
                      <Form.Control className="form-control-user" name='machine' value={machine} onChange={e=>
                          setMachine(e.target.value)} type="text" placeholder="Enter machine name" />

                  </Form.Group>


                  <Form.Group  controlId="formBasicInvest">
                      <Form.Control className="form-control-user" name='meter' value={meter} onChange={e=>
                          setMeter(e.target.value)} type="text" placeholder="Enter meter readings" />

                  </Form.Group>

                  <Form.Group>
                  <select name="stocktype" id="gender" className="form-control-user form-control"
                          onChange={onchangefun} value={stock_type_id}>

                         <option defaultValue={stock_type_id}>Select Stock Type</option>
                          {stocktypelist.map((stock,i)=>(<option key={i} value={stock.stock_type.id}>
                              {stock.stock_type.type}</option>))}

                      </select>
                  </Form.Group>

              <Button variant="primary" type="submit" className="btn-user btn-block">
                  Update
              </Button>
          </Form>



            </div>
        </div>

        </Col>
    </Row>


</Layout>

)
}

export default EditStock;