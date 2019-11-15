import React,{Component} from 'react';
import {connect} from 'react-redux';
import { settitle } from '../store/action.js';
const paymentimg = require('../assets/images/payment.png'); 
const mapStateToProps = (state) => {
  return {
    ftitle: state.titleReducer.ftitle,
    cart:state.cart
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    settitle: (title) => {
      dispatch( settitle(title))  
    }
  };
};

class Footer extends Component{
  /*constructor(props){
    super(props);
    
  }*/
    render(){        
        return (
            <footer>            
            <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="copyright">           
              Copyright @ SRM Technology. All Rights Reserved
              </div>            
              </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="payment text-right">
            <img src={paymentimg} alt=""></img>
            </div>
            </div>
            </div>
            </div>
           
            </footer>
        );
        }   
}
//export default Footer;
export default connect(mapStateToProps, mapDispatchToProps)(Footer);