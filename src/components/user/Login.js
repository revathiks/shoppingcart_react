import React, { Component } from 'react';
import {
    withRouter
  } from 'react-router-dom'
const loginapi="http://172.16.5.51/react_services/api/login.php"
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
                isLoggedin:0  
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
        console.log(formdata);
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
                this.props.history.push('/');               
            }else{
                sessionStorage.setItem("isUserLogged", 0);
            }
        })

    }
    render(){
        return(
              <div className="login-row">               
                <form  method="post" id="login" onSubmit={this.processLogin}>
					<input id="anchor" type="hidden" name="anchor" />					
					<input type="text" name="email" id="email"  autoComplete="off" placeholder="Email" onChange={ () => this.changeData(this)}/>
				    <input type="password" name="password" id="password" autoComplete="off" placeholder="Password" onChange={ () => this.changeData(this)}/>
	                <button type="submit" className="btn btn-primary btn-block login_btn legitRipple" id="loginbtn">Login</button>					
					
				</form>
                
            </div>
        );
    }
}
export default withRouter(Login);
