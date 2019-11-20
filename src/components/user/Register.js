import React,{Component} from 'react';
var apiRegisterUrl="http://172.16.5.51/react_services/api/register.php";
//const regtatus = require('../../assets/images/checkmark.png');
class Register extends Component{
   constructor(props){
        super(props);
        this.state={
            pagetitle:"Create Account",
            errors:{},            
            user:{               
                isRegistered:0,
                isSubmitted:'',
                msg:'',
                alertclass:''
            },
           
        }
        this.changeData=this.changeData.bind(this);
        this.processRegister=this.processRegister.bind(this);   
    }
    sendtitle = () => {
        this.props.sendTitle(this.state.pagetitle);
    }
    changeData(e){
        const fieldvalue=e.target.value;
        const fieldname=e.target.name;
        const user=this.state.user;
        user[fieldname]=fieldvalue;
        this.setState({user});

    }
    processRegister(e){
        e.preventDefault();
         if(this.validateForm()){
            const formdata=new FormData(event.target);
            const requestoptions={
                method:'POST',
                body:formdata
            }
            const user=this.state.user;
            fetch(apiRegisterUrl,requestoptions)
            .then( (response) => { return response.json() })
            .then( (responsedata)=> {
                if(responsedata.actionState===1){
                    user['isRegistered']=1;
                    user['isSubmitted']=1;
                    user['msg']=responsedata.msg;
                    user['alertclass']="alert alert-success";
                    this.setState({user});
                   // this.refs.regform.reset();
                    //this.props.history.push('/register');
                   
                }else{
                    user['isRegistered']=0;
                    user['alertclass']="alert alert-danger";
                    user['isSubmitted']=1;
                    user['msg']=responsedata.msg;
                    this.setState({user});
                   
                }
            })

         }else{
            console.log(0);
         }

    }
    validateForm(){
        let fields=this.state.user;
        let errors={};
        let formValid=true;
        if(!fields['fname']){
            formValid=false;
            errors['fname']="Please enter first name";
        }
        if(!fields['lname']){
            formValid=false;
            errors['lname']="Please enter last name";
        }
        if(!fields['username']){
            formValid=false;
            errors['username']="Please enter username";
        }
        if(!fields['email']){
            formValid=false;
            errors['email']="Please enter email";
        }
        if(!fields['mobile']){
            formValid=false;
            errors['mobile']="Please enter mobile";
        }
        if(!fields['password']){
            formValid=false;
            errors['password']="Please enter password";
        }
        if(!fields['city']){
            formValid=false;
            errors['city']="Please enter city";
        }
        this.setState({errors:errors});
        return formValid; 

    }
    
    render(){
        //console.log(this.state.user);
        return(
            <div className="login">  
            <div className="page-header">
            <h2>Create your account !</h2>
            </div>
            { 
                this.state.user.isSubmitted===1 ? <div className={this.state.user.alertclass}>{this.state.user.msg}</div>:''
            }   
            {
                this.state.user.isRegistered===0 ?          
                <form onSubmit={this.processRegister} ref="regform">
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter your first name" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["fname"]}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Last Name</label>
                        <input type="text" className="form-control" id="lname" name="lname" placeholder="Enter your last name" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["lname"]}</span>
                    </div>  
                    
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["username"]}</span>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Enter your Email" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["email"]}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["mobile"]}</span>
                    </div> 
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" className="form-control" id="city" name="city" placeholder="Enter your city" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["city"]}</span>
                    </div> 

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={this.changeData}/>
                        <span className="invalid">{this.state.errors["password"]}</span>
                    </div>
                    <button type="submit" className="btn btn-primary login_btn">Create Account</button>                    
            </form>
            : ''
            }
            
            </div>
        );
    }
}
export default Register;