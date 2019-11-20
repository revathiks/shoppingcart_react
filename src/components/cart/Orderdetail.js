import React,{Component} from 'react';
const apiOrderDetail="http://172.16.5.51/react_services/api/order_detail.php";
const imgPath="http://172.16.5.51/react_services/uploads/products";

class Orderdetail extends Component{
    constructor(props){
    super(props); 
    this.state={
        order:[],
    }
    }
    getMyOrder(){        
        const order_id= this.props.id ? this.props.id:this.props.match.params.id      
        const requestionOption={
            method:"GET"
        }
        fetch(apiOrderDetail+"?orderid="+order_id,requestionOption)
        .then((response)=>response.json())
        .then((responsedata)=>
        this.setState({order:responsedata.order})
        );
      
    }
    componentDidMount(){
        this.getMyOrder();
    }
   
    render(){            
        return(
            <div>
                  {  this.state.order.map((orderinfo,ind) =>
                  
                       <div key={ind}><h5>Order No:#ExQ{orderinfo.orderid} <small>{orderinfo.createdon}</small></h5>
                       <p></p>
                       
                       <div>
                       <div><h3>Shipping Information</h3></div>
                        <div>{orderinfo.shipping_name}</div>
                        <div>{orderinfo.shipping_email}</div>
                        <div>{orderinfo.shipping_mobile}</div>
                        <div>{orderinfo.shipping_address}</div>
                      </div>
                      <br/>
                      <div>
                       <div><h5>Product summary</h5></div>
                        <div>{orderinfo.total}</div>
                        
                      </div>
                        <p></p>
                       <table id="cart" className="table table-hover table-condensed">
                       <thead>
                       <tr>
                           <th>Product</th>
                           <th>Price (RS)</th>
                           <th>Quantity</th>
                           <th>Subtotal</th>                   
                           <th></th>
                       </tr>
                       </thead>
                       <tbody>
                    {                       
                    orderinfo.items.map((item,i)=>   
                                    
                    <tr key={i}>
                        <td data-th="Product">
                            <div className="row">
                            <div className="col-sm-3 hidden-xs"><img width="100px" src={imgPath+`/${item.thumb}`} alt={item.name} className="img-responsive"/></div>
                            <div className="col-sm-6">
                            <h4 className="nomargin">{item.name}</h4>
                            <p>{item.description}</p>
                            </div>							
                            </div>
                        </td>
                        <td>{item.price}</td>
                        <td>                        
                        {item.quantity}                        
                        </td>
                        <td>{item.price*item.quantity}</td>
                    </tr>
                    )
                    }
                    
                </tbody>  
                <tfoot>
                    <tr>
                    <td colSpan="3" className="hidden-xs">shipping cost</td>
                    <td>{orderinfo.shipping_cost}</td>
                    </tr>
						<tr>
							
							<td colSpan="3" className="hidden-xs">Total</td>
                            
							<td >{parseInt(orderinfo.total,10) + parseInt(orderinfo.shipping_cost,10)} </td>
							
						</tr>
					</tfoot>             
            </table>
                       </div>
                 
               )
                }

           </div>
        )
    }
}
export default Orderdetail;