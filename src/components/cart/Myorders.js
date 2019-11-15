import React,{Component} from 'react';
import {Link } from "react-router-dom";
const apiOrderList="http://172.16.5.51/react_services/api/myorders.php";
const imgPath="http://172.16.5.51/react_services/uploads/products";
const emptyorderimg = require('../../assets/images/empty.png');
class Myorders extends Component{
    constructor(props){
        super(props);
        this.state={
            orders:[],
        }
    }
    getMyOrders(){
        const userid=sessionStorage.getItem("userid");
        const requestionOption={
            method:"GET"
        }
        fetch(apiOrderList+"?userid="+userid,requestionOption)
        .then((response)=>response.json())
        .then((responsedata)=>
        this.setState({orders:responsedata.orders})
        );
      
    }
    componentDidMount(){
        this.getMyOrders();
    }
    render(){
        const path="/order";
        console.log(this.state.orders);
        return(
        <div>
            { this.state.orders ?
            <div>
            {
                this.state.orders.map((order,i) => {
                    return <div className="row col-sm-12 orderitem">
                        <div className="col-sm-4">
                        <Link to={path+`/${order.id}`}><h5>Order No:#ExQ{order.id}</h5>  </Link>                      
                        <h6>{order.items.length} Item (s)</h6>
                        <div>{order.createdon}</div>
                        </div>
                            <div className="row col-sm-6">
                           {order.items.map((item,ind)=>{
                               return <div className="col-sm-2"><img alt={item.thumb} width={80} height={80} src={imgPath+`/${item.thumb}`}/></div>
                               })}
                            </div>
                            
                        </div>
                })
            }
            </div>
            :
            <div className="text-center alert"><img src={emptyorderimg} alt="empty cart"/><br/>No orders yet</div>
            }
        </div>
        )
    }

}
export default Myorders;