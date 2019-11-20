import React,{Component} from 'react';
import {Link } from "react-router-dom";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
      ftitle: state.titleReducer.ftitle
    };
  };
class Header extends Component{
    constructor(props){
        super(props);
        this.state={}     
        this.logout=this.logout.bind(this);    
    }      
    logout(){     
      sessionStorage.setItem('isUserLogged',0);
      this.props.history.push('/');
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
        <li key="1" className="nav-item">        
        <Link to="/mycart" className="nav-link">My Cart</Link>
        </li>
        { 
        sessionStorage.getItem("isUserLogged")==="1" ? 
        [
        <li  key="2" className="nav-item">        
        <Link to="/myorders" className="nav-link">My Orders</Link>
        </li>,
         <li  key="3" className="nav-item">        
         <Link to="/admin/products" className="nav-link">ADMIN</Link>
         </li>,
        <li  key="4" className="nav-item">        
        <Link to="/" className="nav-link" onClick={this.logout}>Logout</Link>
        </li>
        ]
       
        : [
        <li  key="5" className="nav-item">        
        <Link to="/register" className="nav-link">Create Account</Link>
        </li>,
        <li  key="6" className="nav-item">        
        <Link to="/login" className="nav-link">Login</Link>
        </li>
        ]
      }
           
        </ul>
        </div>  
        </nav>
        </div>
        </div>
        </header>
        );
    }
}
export default withRouter(connect(mapStateToProps, null)(Header));