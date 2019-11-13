import React,{Component} from 'react';
var apiRegisterUrl="http://172.16.5.51/react_services/api/register.php";
class Register extends Component{
   constructor(props){
        super(props);
        this.state={
            pagetitle:"Create Account",
            errors:{},            
            user:{
                fname:'',
                lname:'',
                email:'',
                grade:'',
                password:'',
                isRegistered:0
            },
            gradelist:[
                {
                 id: 1,
                 option:'1st grade'
               },
               {
                id: 2,
                option:'2nd grade'
               },
               {
                id: 3,
                option:'3d grade'
               }               
            ] 
           
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
                    this.setState({user});
                    this.props.history.push('/');
                }else{
                    user['isRegistered']=0;
                    this.setState({user});
                    console.log(this.state);
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
            errors['fname']="Please enter your first name";
        }
        if(!fields['lname']){
            formValid=false;
            errors['lname']="Please enter your last name";
        }
        if(!fields['email']){
            formValid=false;
            errors['email']="Please enter your email";
        }
        if(!fields['grade']){
            formValid=false;
            errors['grade']="Please select your grade";
        }
        if(!fields['password']){
            formValid=false;
            errors['password']="Please enter your password";
        }
        this.setState({errors:errors});
        return formValid; 

    }
    
    render(){
        return(
            <div className="register-form">
                <div className="login-form">
                <form onSubmit={this.processRegister}>
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
                        <label htmlFor="grade">Grade</label>
                        <select className="form-control" onChange={this.changeData} name="grade">
                        <option value="">Select grade</option>
                        { this.state.gradelist.map((e,i) =>  { 
                            return  <option key={e.id} value={e.id}>{e.option}</option>;
                        }
                     )}
                        </select>
                        <span className="error">{this.state.errors["grade"]}</span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Enter your Email" onChange={this.changeData}/>
                        <span className="error">{this.state.errors["email"]}</span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="password" name="password" placeholder="Enter your password" onChange={this.changeData}/>
                        <span className="error">{this.state.errors["password"]}</span>
                    </div>
                    <button type="submit" className="btn btn-primary login_btn">Create Account</button> 
                    <br/><br/>
                    <div className="form-group">Have an account? Log In  </div>
                                    
            </form>
            </div>
            </div>
        );
    }
}
export default Register;