import React,{Component} from 'react';
import {Link } from "react-router-dom";
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
      ftitle: state.titleReducer.ftitle
    };
  };
class Header extends Component{
    constructor(props){
        super(props);
        this.state={}         
    }      
   
    render(){        
        return(
        <header className="bg-dark">
        <div className="container">
        <div className="row">
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">  
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
        <li className="nav-item">        
        <Link to="/" className="nav-link" >Home</Link>
        </li>
        <li className="nav-item">        
        <Link to="/products" className="nav-link" >Products</Link>
        </li>
        <li className="nav-item">        
        <Link to="/register" className="nav-link">Create Account</Link>
        </li>
        <li className="nav-item">        
        <Link to="/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">        
        <Link to="/mycart" className="nav-link">My Carts</Link>
        </li>

        <li className="nav-item">        
        <Link to="/myorders" className="nav-link">My Orders</Link>
        </li>
        <li className="nav-item">        
        <Link to="/checkout" className="nav-link">Checkout</Link>
        </li>
        <li className="nav-item">        
        <Link to="/admin" className="nav-link">ADMIN</Link>
        </li>
        
           
        </ul>
        </div>  
        </nav>
        </div>
        </div>
        </header>
        );
    }
}
export default connect(mapStateToProps, null)(Header);