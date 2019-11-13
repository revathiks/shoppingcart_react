import React ,{Component} from 'react';
import AddButton from './Addbtn';
import RemoveButton from './Removebtn'
//var apiProductList="http://172.16.5.51/react_services/api/products.php";
const imgPath="http://172.16.5.51/react_services/uploads/products";
class ProductItem extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        }
    }   
  
    render(){            
        return(            
               <div className="col-md-3">
                   <div className="productdisplay rounded">
                   <h5>{this.props.product.name}</h5>
                   <div><img alt={this.props.product.name} width={150} height={200} src={imgPath+`/${this.props.product.thumb}`}/></div>
                   <div>Rs {this.props.product.price}</div>
                   <div>                      
                        <AddButton 
                        cartItem={this.props.cartItem} 
                        addtoCart={this.props.addtoCart}
                        product={this.props.product}
                        />
                        {
                        this.props.cartItem
                        ?
                        <RemoveButton 
                        cartItem={this.props.cartItem} 
                        removeFromCart={this.props.removeFromCart}
                        product={this.props.product}
                        />
                        :''
                        }
                  </div>
                  </div>
               </div>
        );
    }
}
export default ProductItem;