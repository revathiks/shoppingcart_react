import React ,{Component} from 'react';
import ProductItem from './ProductItem';
import {connect} from 'react-redux';
var apiProductList="http://172.16.5.51/react_services/api/products.php";
const emptyproductimg = require('../../assets/images/noproduct.png');
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
    };
  };
class Products extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }
    getProducts(){               
        const requestionOption={
            method:"GET"
        }
        fetch(apiProductList,requestionOption)
        .then((response)=>response.json())
        .then((responsedata)=>
        this.setState({products:responsedata.products})
        );
      
    }
    componentDidMount(){       
         this.getProducts();        
     }
    render(){        
        return(
            <div className="row">
                 {
                  this.state.products ?
                   this.state.products.map((product,i) =>   
                 <ProductItem key={product.id} 
                 product={product} 
                 addtoCart={this.props.addtoCart}
                 removeFromCart={this.props.removeFromCart}
                 cartItem={this.props.cart.filter(cartItem=>cartItem.id ===product.id)[0]}
                 />  )
                 :
                 <div className="text-center"><img src={emptyproductimg} alt="empty no Products"/></div>
                }

            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);