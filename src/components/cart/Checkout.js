import React,{Component} from 'react';
import Mycart from './Mycart';
import {connect} from 'react-redux';

//import CheckoutForm from '../features/checkout/CheckoutForm';
var apiConfirmOrderUrl="http://172.16.5.51/react_services/api/confirmorder.php";
 /* const submitOrder=(values,cart)=>{   
  const requestoptions={
        method:'POST',
        body:{
            name,
            email,
            order_items:cart.map(item => ({
                    product_id:item.id,
                    quantity:item.quantity
                })
            )
        }
    }

}*/
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
                isOrderConfirmed:0
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
            console.log(requestoptions)
            const order=this.state.order;
            fetch(apiConfirmOrderUrl,requestoptions)
            .then( (response) => { return response.json() })
            .then( (responsedata)=> {
                if(responsedata.actionState===1){
                    order['isOrderConfirmed']=1;
                    this.setState({order});                   
                    this.props.history.push('/users');
                }else{
                    order['isOrderConfirmed']=0;
                    this.setState({order});
                    console.log(this.state);
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
            errors['shipping_name']="Please enter shipping name";
        }
        if(!fields['shipping_email']){
            formValid=false;
            errors['shipping_email']="Please enter shipping email";
        }

        if(!fields['shipping_address']){
            formValid=false;
            errors['shipping_address']="Please enter shipping address";
        }

        if(!fields['shipping_mobile']){
            formValid=false;
            errors['shipping_mobile']="Please enter shipping contact number";
        }
        
        
        this.setState({errors:errors});
        return formValid; 

    }
    render(){       
        return(
        <div>
         <Mycart/>
         {/* <CheckoutForm  onSubmit={()=>submitOrder()}/> */}
         <div className="">
            <div className="">
            <form onSubmit={this.processOrder}>
            {/* <div className="form-group">
            <label htmlFor="billing_name">Billing Name</label>
            <input type="text" className="form-control" id="billing_name" name="billing_name" placeholder="Enter billing name" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["billing_name"]}</span>
            </div>
            

            <div className="form-group">
            <label htmlFor="billing_email">Billing Email</label>
            <input type="text" className="form-control" id="billing_email" name="billing_email" placeholder="Enter Billing Email" onChange={this.changeData}/>
            <span className="error">{this.state.errors["billing_email"]}</span>
            </div> */}

            <div className="form-group">
            <label htmlFor="Shipping_name">Shipping Name</label>
            <input type="text" className="form-control" id="shipping_name" name="shipping_name" placeholder="Enter Shipping name" onChange={this.changeData}/>
            <span className="invalid">{this.state.errors["shipping_name"]}</span>
            </div>
            

            <div className="form-group">
            <label htmlFor="shipping_email">Shipping Email</label>
            <input type="text" className="form-control" id="shipping_email" name="shipping_email" placeholder="Enter Shipping Email" onChange={this.changeData}/>
            <span className="error">{this.state.errors["shipping_email"]}</span>
            </div>

            <div className="form-group">
            <label htmlFor="shipping_mobile">Shipping contact Number</label>
            <input type="text" className="form-control" id="shipping_mobile" name="shipping_mobile" placeholder="Enter Shipping Contact Number" onChange={this.changeData}/>
            <span className="error">{this.state.errors["shipping_mobile"]}</span>
            </div>

            <div className="form-group">
            <label htmlFor="shipping_address">Shipping Address</label>            
            <input type="text" className="form-control" id="shipping_address" name="shipping_address" placeholder="Enter Shipping Address" onChange={this.changeData}/>
            <span className="error">{this.state.errors["shipping_address"]}</span>
            </div>

           
            <button type="submit" className="btn btn-primary login_btn">Confirm Order</button>                   
            </form>
            </div>
            </div>
        </div>
        )
    }
}
export default connect(mapStateToProps)(Checkout)