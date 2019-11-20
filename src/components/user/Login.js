import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
const loginapi="http://172.16.5.51/react_services/api/login.php";
const avatarimg = require('../../assets/images/avatar.png'); 
const mapStateToProps = (state) => {
    return {
      ftitle: state.titleReducer.ftitle,
      cart:state.cart
    };
  };
class Login extends Component{
    constructor(props){
        super(props);        
        if(sessionStorage.getItem("isUserLogged")==="1")
        { 
            //sessionStorage.removeItem("isUserLogged");       
           this.props.history.push('/products');
        }
        this.state={
            errors:{},
            user:{
                userid:0,
                isLoggedin:0 ,
                isSubmitted:'',
                msg:'',
                alertclass:''
                }

        }      
    this.processLogin=this.processLogin.bind(this) ;
    if(sessionStorage.getItem("isUserLogged")===1)
        {
            this.props.history.push('/users');
        }
    }
    changeData(e){      
        
    }
    processLogin(e){
        e.preventDefault();
        const formdata=new FormData(e.target);      
        const requestOptions={
            method:'POST',
            body:formdata
        }
        const user=this.state.user;
        fetch(loginapi,requestOptions)
        .then((response)=> response.json())
        .then((responsedata)=>{
            if(responsedata.actionState===1){
                user['userid']=responsedata.id;
                this.setState({user});
                sessionStorage.setItem("userid", responsedata.id);
                sessionStorage.setItem("isUserLogged", 1); 
                this.props.cart.length ?
                this.props.history.push('/mycart')
                :               
                this.props.history.push('/');               
            }else{
                    user['alertclass']="alert alert-danger";
                    user['isSubmitted']=1;
                    user['msg']=responsedata.msg;
                    this.setState({user});
                sessionStorage.setItem("isUserLogged", 0);
            }
        })

    }
    render(){
        console.log(this.state)
        return(
              <div>   
              <div className="col-sm-3">&nbsp;</div> 
              <div className="col-sm-6 login">                       
                <form  method="post" id="login" onSubmit={this.processLogin}>
                <div className="imgcontainer">
                    <img src={avatarimg} alt="User" className="avatar"/>
                </div>
                <div className="container"> 
                { 
                this.state.user.isSubmitted===1 ? <div className={this.state.user.alertclass}>{this.state.user.msg}</div>:''
               }               
                <input type="text" placeholder="Enter Username" name="username" required onChange={ () => this.changeData(this)}/>
                
                <input type="password" placeholder="Enter Password" name="password" required onChange={ () => this.changeData(this)}/>
                    
                <button type="submit">Login</button>                
                </div>	
				</form>
                </div>  
                <div className="col-sm-3">&nbsp;</div>
                
            </div>
        );
    }
}
export default withRouter(connect(mapStateToProps)(Login));
