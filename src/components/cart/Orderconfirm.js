import React ,{Component} from 'react';
const orderstatus = require('../../assets/images/checkmark.png');
class Orderconfirm extends Component{
    render(){        
        return (
            <div className="orderconfirm text-center">
                <img height="300" src={orderstatus} alt="Order Placed"/><br/>
            Your order has been placed successfully.Will update shipping status to your mobile or email address.
           </div>
        );
        }   
}
export default Orderconfirm;