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
        const order_id=this.props.match.params.id  
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
         console.log(this.state.order)
        return(
            <div>
            
            {
                this.state.order.map((orderinfo,i) => {
                    return <div>
                        <h5>Order No:#ExQ{orderinfo.orderid}</h5>
                        <div><h6>{orderinfo.items.length} Item (s)</h6>
                            <div className="col-md-12">
                           {orderinfo.items.map((item,ind)=>{
                               return <div className="col-md-3"><img alt={item.thumb} width={80} height={80} src={imgPath+`/${item.thumb}`}/></div>
                               })}
                            </div></div>
                        </div>
                })
            }

        </div>
        )
    }
}
export default Orderdetail;