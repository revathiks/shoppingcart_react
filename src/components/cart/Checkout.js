import React,{Component} from 'react';
//import Mycart from './Mycart';
import {connect} from 'react-redux';
import Carttotal from './Carttotal';
var apiConfirmOrderUrl="http://172.16.5.51/react_services/api/confirmorder.php";
const mapStateToProps = (state) => {
    return {
      ftitle: state.titleReducer.ftitle,
      cart:state.cart
    };
  };
class Checkout extends Component{
    constructor(props){    
        super(props);            
        this.state={         
        errors:{},                
        order:{
                isOrderConfirmed:0,
                isSubmitted:0
            }
        }        
        this.changeData=this.changeData.bind(this);
        this.processOrder=this.processOrder.bind(this); 
    }
    changeData(e){
        const fieldvalue=e.target.value;
        const fieldname=e.target.name;
        const order=this.state.order;
        order[fieldname]=fieldvalue;
        this.setState({order});

    }
    processOrder(e){
        e.preventDefault();
         if(this.validateForm()){
            const formdata=new FormData(event.target);           
            this.props.cart.map((item ,i)=> 
              {                 
                formdata.append('order_item['+i+'][produc_id]',item.id)
                formdata.append('order_item['+i+'][quantity]',item.quantity)
                formdata.append('order_item['+i+'][price]',item.price)
                formdata.append('order_item['+i+'][product_code]',item.code)
                return 1;
                //formdata.append('quantity',item.quantity)
            }
            )
            if(sessionStorage.getItem("isUserLogged")==="1")
            {
                const uid=sessionStorage.getItem("userid");
                formdata.append('userid',uid)
            }
            
            
            const requestoptions={
                method:'POST',
                body:formdata
            }            
            const order=this.state.order;
            fetch(apiConfirmOrderUrl,requestoptions)
            .then( (response) => { return response.json() })
            .then( (responsedata)=> {
                if(responsedata.actionState===1){
                    order['isOrderConfirmed']=1;
                    order['alertclass']="alert alert-success";
                    order['isSubmitted']=1;
                    order['msg']=responsedata.msg;
                    this.setState({order});                   
                    this.props.history.push('/Orderconfirm');
                }else{
                    order['isOrderConfirmed']=0;
                    order['alertclass']="alert alert-danger";
                    order['isSubmitted']=1;
                    order['msg']=responsedata.msg;
                    this.setState({order});                   
                }
            })

         }else{
            console.log(0);
         }

    }
    validateForm(){        
        let fields=this.state.order;
        let errors={};
        let formValid=true;
        /*if(!fields['billing_name']){
            formValid=false;
            errors['billing_name']="Please enter billing name ";
        }
        if(!fields['billing_email']){
            formValid=false;
            errors['billing_email']="Please enter billing email";
        }*/
        if(!fields['shipping_name']){
            formValid=false;
            errors['shipping_name']="Please enter name";
        }
        if(!fields['shipping_email']){
            formValid=false;
            errors['shipping_email']="Please enter email";
        }

        if(!fields['shipping_address']){
            formValid=false;
            errors['shipping_address']="Please enter address";
        }

        if(!fields['shipping_mobile']){
            formValid=false;
            errors['shipping_mobile']="Please enter mobile number";
        }
        
        
        this.setState({errors:errors});
        return formValid; 

    }
    render(){  
        const finaltotal=Carttotal(this.props.cart);   
        const shippingcost=50;    
        return(
        <div>
         
         {/*  
        <CheckoutForm  onSubmit={()=>submitOrder()}/> */}
         <div className="checkout">
         { this.props.cart.length ?         
            <div className="">   
            <table id="cart" className="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price (RS)</th>   
                    <th>Quantity</th>                 
                    <th>Subtotal</th>  
                </tr>
                </thead>
                <tbody>
                    {                       
                    this.props.cart.map((item,i)=>   
                                    
                    <tr key={i}>
                        <td>{item.name}   </td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.total }</td>
                    </tr>
                    )
                    }
                    <tr>
                    <td></td>
                    <td></td>                    
                    <td>shipping cost</td>
				<td className="">{shippingcost}</td>
				</tr>
                </tbody>
                <tfoot>
				<tr>
                    <td></td>
                    <td></td>
                    <td>Total (Rs)</td>                  
				<td className=""><strong> {finaltotal+shippingcost}</strong></td>
				</tr>
				</tfoot>               
            </table>

             { 
                this.state.order.isSubmitted===1 ? <div className={this.state.order.alertclass}>{this.state.order.msg}</div>:''
             }        
            <form onSubmit={this.processOrder}>
            <fieldset>
            <legend>Shipping Information</legend>            

            <div className="form-group">
            <label htmlFor="Shipping_name"> Name</label>
            <input type="text" className="form-control" id="shipping_name" name="shipping_name" placeholder="Enter Shipping name" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["shipping_name"]}</span>
            </div>
            

            <div className="form-group">
            <label htmlFor="shipping_email"> Email</label>
            <input type="text" className="form-control" id="shipping_email" name="shipping_email" placeholder="Enter Shipping Email" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["shipping_email"]}</span>
            </div>

            <div className="form-group">
            <label htmlFor="shipping_mobile">Mobile</label>
            <input type="text" className="form-control" id="shipping_mobile" name="shipping_mobile" placeholder="Enter Shipping Mobile Number" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["shipping_mobile"]}</span>
            </div>

            <div className="form-group">
            <label htmlFor="shipping_address">Address</label>            
            <input type="text" className="form-control" id="shipping_address" name="shipping_address" placeholder="Enter Shipping Address" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["shipping_address"]}</span>
            </div>

           
            <button type="submit" className="btn btn-primary login_btn">Place Order</button>                   
            </fieldset>
            </form>
            </div>
            
            :
            <div className="text-center alert">Your cart is empty</div>
            }
            </div>
            
        </div>
        )
    }
}
export default connect(mapStateToProps)(Checkout)