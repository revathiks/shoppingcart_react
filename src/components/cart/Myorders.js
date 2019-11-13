import React,{Component} from 'react';
const apiOrderList="http://172.16.5.51/react_services/api/myorders.php";
const imgPath="http://172.16.5.51/react_services/uploads/products";
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
        
        return(
        <div>
            
            {
                this.state.orders.map((order,i) => {
                    return <div>
                        <h5>Order No:#ExQ{order.id}</h5>
                        <div><h6>{order.items.length} Item (s)</h6>
                            <div className="col-md-12">
                           {order.items.map((item,ind)=>{
                               return <li><img alt={item.thumb} width={80} height={80} src={imgPath+`/${item.thumb}`}/></li>
                               })}
                            </div></div>
                        </div>
                })
            }

        </div>
        )
    }

}
export default Myorders;