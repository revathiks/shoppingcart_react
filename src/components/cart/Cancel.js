import React,{Component} from 'react';
import Orderdetail from './Orderdetail';
const apiOrderCancel="http://172.16.5.51/react_services/api/cancel.php";
const orderstatus = require('../../assets/images/checkmark.png');

class Cancel extends Component{
       constructor(props){
        super(props);
        this.state={
            order:{ 
                isCancelled:'',
                msg:''
                },
        }
     }
     cancelOrder(id)  {
        const formdata=new FormData();
        formdata.append('id',id);
        const requestoptions={
            method:'POST',
            body:formdata
        }
       const delorder=this.state.order;
        fetch(apiOrderCancel,requestoptions)
        .then( (response) => { return response.json() })
        .then( (responsedata)=> {
            if(responsedata.actionState===1){
                delorder['isCancelled']=1;
                delorder['msg']=responsedata.msg;
                this.setState({delorder}); 
            }else{
                delorder['isDeleted']=0;
                delorder['msg']=responsedata.msg;
                this.setState({delorder});
               
            }
        })  
    
    }
    render(){     
        
        
        return(
        <div>
            {
                this.state.order.isCancelled===1 ?
                <div className="orderconfirm text-center">
                <img height="300" src={orderstatus} alt="Order Placed"/><br/>
                Your order has been cancelled successfully.Will update status to your mobile or email address.
                </div>
            :
            <div>
            <Orderdetail id={this.props.match.params.id}/>
            <div className="text-center">
            <button className="btn btn-warning ml-1 " onClick={() => this.cancelOrder(this.props.match.params.id)}>  Cancel </button>
            </div>
            </div>
            }
        </div>
        )
    }
}
export default Cancel;
