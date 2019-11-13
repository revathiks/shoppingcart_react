import React,{Component} from 'react';
import {connect} from 'react-redux';
const sort=(items)=>{
   return items.sort((a,b)=>a.id<b.id)
}
class Mycart extends Component{
    constructor(props){
        super(props);
        if(sessionStorage.getItem("isUserLogged")!=="1")
        {
            this.props.history.push('/login');
        }
    
    }
    render(){
        return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                   <th></th>
                   <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                    sort(this.props.cart).map((item,i)=>
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                        <button onClick={()=>this.props.addtoCart(item)}>+</button>
                        </td>
                        <td>
                        <button onClick={()=>this.props.removeFromCart(item)}>-</button>
                        </td> 
                        <td>
                            <button onClick={()=>this.props.removerAllFromCart(item)}>Remove all</button>
                        </td>     
                    </tr>
                    )
                    }
                </tbody>
            </table>

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
        dispatch( {
            type:'ADD',
            payload:item
        })  
      },
      removeFromCart: (item) => {
        dispatch( {
            type:'REMOVE',
            payload:item
        })  
      },
      removerAllFromCart:(item)=>{
          dispatch(
              {
                  type:'REMOVE_ALL',
                  payload:item
              }
          )
      }
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(Mycart)