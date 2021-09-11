import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import API_URL from '../../utils/api';
import Notifications from '../../utils/notifications';
import Layout from '../../layouts/index';



toast.configure({
autoClose: 8000,
draggable: false,
});


const AddStock =()=>{

const [token,setToken] = useState('');
const [total_stock_purchased,setTotal_stock_purchased] = useState();
const [total_investment,setTotal_investment] = useState();
const [purchase_date,setPurchase_date] = useState('');
const [purchased_from,setPurchase_from] = useState('');
const [delivered_by,setDelivered_by] = useState('');
const [stock_type_id,setStock_type_id] = useState(0);
const [stock_type,setStock_type] = useState('');
const [stocktypelist,setStocktypelist] = useState([]);

useEffect(() => {


setToken(localStorage.getItem('token'));

const fetchStockTypeList = async () => {
const res = await fetch(API_URL.url+'/stock-types', {
method: "GET",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${token}`
}
})
.then(res => res.json())
.then(
(response) => {
    setStocktypelist(response.data);
},
(error) => {

}
)

}

fetchStockTypeList();

},[]);


const onchangefun=(e)=>{

    setStock_type_id(e.target.value)
var id = e.nativeEvent.target.selectedIndex;
    setStock_type(e.nativeEvent.target[id].text)

}


const handleSubmit = async (e) => {
e.preventDefault();

await fetch(API_URL.url+'/stock', {
method: "POST",
headers: {
"Origin": "*",
"Content-Type": "application/json",
"Accept": "application/json",
"Authorization": `Bearer ${token}`

},
body: JSON.stringify({
"total_stock_purchased": total_stock_purchased,
"total_investment": total_investment,
"purchase_date": purchase_date,
"purchased_from": purchased_from,
"delivered_by": delivered_by,
"stock_type_id": stock_type_id,
"stock_type": stock_type,
})
})
.then(res => res.json())
.then(
(result) => {

toast.success(`${Notifications.stockaddsuccess}`, {
position: toast.POSITION.TOP_RIGHT });
},
(error) => {
toast.error(`${Notifications.stockaddfailed}`, {
position: toast.POSITION.TOP_RIGHT });
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
                <h6 className="m-0 font-weight-bold text-primary">Add Stock</h6>
            </div>
            <div className="card-body">

                <Form className="user" onSubmit={handleSubmit}>
                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPurchase">
                            <Form.Control className="form-control-user" name='total_stock_purchased' onChange={e=>
                                setTotal_stock_purchased(e.target.value)} type="number" placeholder="Enter stock (ltr)" />

                        </Form.Group>


                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicInvest">
                            <Form.Control className="form-control-user" name='total_investment' onChange={e=>
                                setTotal_investment(e.target.value)} type="number" placeholder="Enter total investment (Rs)" />

                        </Form.Group>

                    </div>

                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPDate">

                        <Form.Control className="form-control-user" name='purchase_date' onChange={e=>
                                setPurchase_date(e.target.value)} type="date" placeholder="Select purchase date" />

                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicPurfrom">
                            <Form.Control className="form-control-user" name='purchased_from' onChange={e=>
                                setPurchase_from(e.target.value)} type="text" placeholder="Enter purchase from" />

                        </Form.Group>

                    </div>

                    <div className="row">

                        <Form.Group className="mb-3 col-lg-6 col-md-6 col-sm-12 col-12" controlId="formBasicDby">
                            <Form.Control className="form-control-user" name='delivered_by' onChange={e=>
                                setDelivered_by(e.target.value)} type="text" placeholder="Enter Delivered by" />

                        </Form.Group>

                        <div className="form-group col-lg-6 col-md-6 col-sm-12 col-12">
                            <select name="stocktype" id="gender" className="form-control-user form-control"
                                onChange={onchangefun} value={stock_type_id}>

                               <option defaultValue={stock_type_id}>Select Stock Type</option>
                                {stocktypelist.map((stock,i)=>(<option key={i} value={stock.stock_type.id}>
                                    {stock.stock_type.type}</option>))}

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

export default AddStock;