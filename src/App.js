import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Products from './components/cart/Products';
import Mycart from './components/cart/Mycart';
import Myorders from './components/cart/Myorders';
import Checkout from './components/cart/Checkout';
import Orderdetail from './components/cart/Orderdetail';
import Users from './components/admin/Users';

import Notfound from './components/Notfound';

import './assets/css/style.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Header />
        <div className="container">
        <div className="row">
        
        <div className="col-sm-12 content">
        <Switch>
        <Route  exact path="/" component={Products} />
          <Route  path="/products" component={Products} /> 
          <Route  path="/mycart" component={Mycart} /> 
          <Route  path="/register" component={Register} /> 
          <Route  path="/login" component={Login} /> 
          <Route  path="/myorders" component={Myorders} />
          <Route  path="/checkout" component={Checkout} />          
          <Route  path="/order/:id" component={Orderdetail} />
          <Route  path="/admin/" component={Users} /> 
          <Route  path="" component={Notfound} />  

          {/* 
          <Route  path="/products" component={()=><Products sendTitle={this.setTitle}/>} />
           */}

        </Switch> 
        </div>
        </div>
        </div>
<Footer />

      </div>
      </Router>
    );
  }
}

export default App;
