import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link } from "react-router-dom";
import Carttotal from './Carttotal';
import {additem,removeitem,removeallitem} from '../../store/action.js';

const imgPath="http://172.16.5.51/react_services/uploads/products";
const emptycartimg = require('../../assets/images/empty-cart.png');
const sort=(items)=>{
   return items.sort((a,b) => a.id - b.id )
}
/*const sort = items => {
    return items.sort((a, b) => {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
    });
  };*/

class Mycart extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem("isUserLogged")!=="1")
        {
            this.props.history.push('/login');
        }           
        
    }    
    
    render(){   
        const finaltotal=Carttotal(this.props.cart);  
        const cartItems=sort(this.props.cart);     
        return(
        <div className="mycart">
            <div className="page-header">
            <h2>My Cart</h2>
            </div>
            { this.props.cart.length ?
            <table id="cart" className="table table-hover table-condensed">
                <thead>
                <tr>
                    <th>Product (s)</th>
                    <th>Price (RS)</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>                   
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {                       
                    cartItems.map((item,i)=>   
                                    
                    <tr key={i}>
                        <td data-th="Product">
                            <div className="row">
                            <div className="col-sm-4 hidden-xs"><img width="100px" src={imgPath+`/${item.thumb}`} alt={item.name} className="img-responsive"/></div>
                            <div className="col-sm-8">
                            <h4 className="nomargin">{item.name}</h4>
                            <p>{item.description}</p>
                            </div>							
                            </div>
                        </td>
                        <td>{item.price}</td>
                        <td>
                        <div className="row">
                        <div className="col-sm-2 hidden-xs">
                        {item.quantity} 
                        </div>
                        <div className="col-sm-6">
                        <button onClick={()=>this.props.addtoCart(item)}><i className="fa fa-plus" aria-hidden="true"></i></button>&nbsp;
                        <button onClick={()=>this.props.removeFromCart(item)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                        </div>
                        </div>
                        </td>
                        <td>{item.total }</td>
                       
                        <td>
                            <button onClick={()=>this.props.removerAllFromCart(item)}><i className="fa fa-trash-o"></i></button>
                        </td>     
                       
                    </tr>
                    )
                    }
                </tbody>
                <tfoot>
						<tr>
							<td><Link to="/" className="btn btn-warning"><i className="fa fa-angle-left"></i> Continue Shopping</Link></td>
							<td colspan="2" className="hidden-xs"></td>
							<td className="hidden-xs text-center"><strong>Total {finaltotal}</strong></td>
							<td><Link to="/checkout" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></Link></td>
						</tr>
					</tfoot>
            </table>
             :
             <div className="text-center alert"><img src={emptycartimg} alt="empty cart"/></div>
             }

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      cart: state.cart
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
            addtoCart: (item) => {
            dispatch(additem(item))  
            },
            removeFromCart: (item) => {
            dispatch(removeitem(item)) 
            },
            removerAllFromCart:(item)=>{       
            dispatch(removeallitem(item)) 
            }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Mycart)