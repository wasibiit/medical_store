import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';
import { useParams, Link } from "react-router-dom";


toast.configure({
autoClose: 8000,
draggable: false,
});

const EditStock =()=>{

    const params = useParams();

    const [id,setId] = useState('');
    const [total_stock_purchased,setTotal_stock_purchased] = useState('');
    const [total_investment,setTotal_investment] = useState('');
    const [purchase_date,setPurchase_date] = useState('');
    const [purchased_from,setPurchased_from] = useState('');
    const [delivered_by,setDelivered_by] = useState('');
    const [stock_type_id,setStock_type_id] = useState(0);
    const [stock_type,setStock_type] = useState('');
    const [stock_typelist,setStocktypelist] = useState([]);

    useEffect(() => {
        
        fetch(API_URL.url+`/stock/${params.id}`, {
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
                   
                    setId(result.id);
                    setTotal_stock_purchased(result.total_stock_purchased);
                    setTotal_investment(result.total_investment);
                    setPurchase_date(result.purchase_date);
                    setPurchased_from(result.purchased_from);
                    setDelivered_by(result.delivered_by);
                    setStock_type_id(result.stock_type_id);
                    setStock_type(result.stock_type);
                    
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
    
            await fetch(API_URL.url+`/stock`, {
                method: "PUT",
                headers: {
                    "Origin": "*",               
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Notifications.token}`             
                   
                },
                body: JSON.stringify({
                    "id": `${id}`,
                    "total_stock_purchased": `${total_stock_purchased}`,
                    "total_investment": `${total_investment}`,
                    "purchase_date": purchase_date,
                    "purchased_from": purchased_from,
                    "delivered_by": delivered_by,
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
    <Link to={process.env.PUBLIC_URL + "/stock" } className="btn btn-secondary btn-icon-split mb-3">
        <span className="icon text-white-50">
            <i className="fas fa-arrow-left"></i>
        </span>
        <span className="text">Back</span>
        </Link>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Edit Stock</h6>
            </div>
            <div className="card-body">

                <Form className="user" onSubmit={handleUpdate}>
                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPurchase">
                        <Form.Label>Purchased Stock (ltr)</Form.Label>
                            <Form.Control className="form-control-user" name='total_stock_purchased' value={total_stock_purchased} onChange={e=>
                                setTotal_stock_purchased(e.target.value)} type="number"  />

                        </Form.Group>


                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicInvest">
                        <Form.Label>Investment (Rs)</Form.Label>
                            <Form.Control className="form-control-user" name='total_investment' value={total_investment} onChange={e=>
                                setTotal_investment(e.target.value)} type="number"  />

                        </Form.Group>

                    </div>

                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPDate">
                        <Form.Label>Purchased Date</Form.Label>
                        <Form.Control className="form-control-user" name='purchase_date' value={purchase_date} onChange={e=>
                                setPurchase_date(e.target.value)} type="date" />

                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12"  controlId="formBasicPurfrom">
                        <Form.Label>Purchase From</Form.Label>
                            <Form.Control className="form-control-user" value={purchased_from} name='purchased_from' onChange={e=>
                                setPurchased_from(e.target.value)} type="text"  />

                        </Form.Group>

                    </div>

                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicDby">
                        <Form.Label>Delivered By</Form.Label>
                            <Form.Control className="form-control-user" name='delivered_by' value={delivered_by} onChange={e=>
                                setDelivered_by(e.target.value)} type="text"  />

                        </Form.Group>

                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                        <Form.Label>Stock Type</Form.Label>
                            <select name="stocktype" id="stocktype" className="form-control-user form-control"
                                onChange={onchangefun} value={stock_type_id}>

                               <option defaultValue={stock_type_id}>Select Stock Type</option>
                                {stock_typelist.map((stock,i)=>(<option key={i} value={stock.id}>
                                    {stock.type}</option>))}

                            </select>
                        </div>
                    </div>

                    <Button variant="primary" type="submit" className="btn-user btn-block">
                        Submit
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