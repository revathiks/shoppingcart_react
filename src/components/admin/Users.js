import React,{Component} from 'react';
var apiRegisterUrl="http://172.16.5.51/react_services/api/register.php";
const apiUserList="http://172.16.5.51/react_services/api/userslist.php";
const apiUserInfo="http://172.16.5.51/react_services/api/userdetail.php";
const apiUserUpdate="http://172.16.5.51/react_services/api/userupdate.php";
const apiUserDelete="http://172.16.5.51/react_services/api/delete.php"
class Users extends Component{
    constructor(props){
        super(props);            
        this.state={ 
        pagetitle:"Users",   
        users:[],
        errors:{},                
        user:{
                fname:'',
                lname:'',
                email:'',
                grade:'',
                password:'',
                isRegistered:0
            },
        edit_user:{
            fname:'',
            lname:'',
            email:'',
            grade:'',              
            isUpdated:0
        },
        delete_user:{
            fname:'',
            lname:'',
            email:'',
            grade:'',              
            isDeleted:0
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
            ],
            userdata:[0]
        }        
        this.changeData=this.changeData.bind(this);
        this.processRegister=this.processRegister.bind(this); 
        this.edituser=this.edituser.bind(this);  
        this.updateUser=this.updateUser.bind(this);
        this.sendTitle=this.sendTitle.bind(this);          
    }
   
    sendTitle=()=>{  
        this.props.sendTitle(this.state.pagetitle);
     }     
    edituser(e){ 
        const requestionOption={
            method:"GET"           
        }
        fetch(apiUserInfo+"?uid="+e,requestionOption)
        .then((response)=> {return response.json()})
        .then((responsedata)=>        
         this.setState( {userdata:responsedata.user})         
        ); 
        console.log(this.state.userdata.fname);   
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
                    document.getElementById('adduser').click();
                    this.props.history.push('/admin');
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
            errors['fname']="Please enter first name";
        }
        if(!fields['lname']){
            formValid=false;
            errors['lname']="Please enter last name";
        }
        if(!fields['email']){
            formValid=false;
            errors['email']="Please enter email";
        }
        if(!fields['grade']){
            formValid=false;
            errors['grade']="Please select grade";
        }
        if(!fields['password']){
            formValid=false;
            errors['password']="Please enter password";
        }
        this.setState({errors:errors});
        return formValid; 

    }
    getUsers(){
               
        const requestionOption={
            method:"GET"
        }
        fetch(apiUserList,requestionOption)
        .then((response)=>response.json())
        .then((responsedata)=>
        this.setState({users:responsedata.users})
        );
      
    }

    updateUser(e){
        e.preventDefault();
         
            const formdata=new FormData(event.target);
            const requestoptions={
                method:'POST',
                body:formdata
            }
           const euser=this.state.edit_user;
            fetch(apiUserUpdate,requestoptions)
            .then( (response) => { return response.json() })
            .then( (responsedata)=> {
                if(responsedata.actionState===1){
                    euser['isUpdated']=1;
                    this.setState({euser});
                    document.getElementById('edituser').click();
                    this.props.history.push('/admin');
                }else{
                    euser['isUpdated']=0;
                    this.setState({euser});
                    console.log(this.state);
                }
            })

         

    }

    deleteuser(uid){ 
        const formdata=new FormData();
        formdata.append('uid',uid);
        const requestoptions={
            method:'POST',
            body:formdata
        }
       const deluser=this.state.delete_user;
        fetch(apiUserDelete,requestoptions)
        .then( (response) => { return response.json() })
        .then( (responsedata)=> {
            if(responsedata.actionState===1){
                deluser['isDeleted']=1;
                this.setState({deluser});                
                this.props.history.push('/admin');
            }else{
                deluser['isDeleted']=0;
                this.setState({deluser});
                   }
        })

     

}
    componentDidMount(){
       // this.setTitle();
        this.getUsers();
       
    }
    test(){
        alert("test")
    }
    render(){
        return(
            <div>
               {/* {this.sendTitle()} */}
                {/* <button type="button" className="btn btn-primary" onClick={this.sendTitle}>
               change title
                </button> */}
 
                <button type="button" className="btn btn-primary" id="adduser" data-toggle="modal" data-target="#myModal">
                Add User
                </button>


                    <div className="modal" id="myModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            <div className="register-form">
                            <div className="login-form">
                            <form onSubmit={this.processRegister}>
                            <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter first name" onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["fname"]}</span>
                            </div>
                            <div className="form-group">
                            <label htmlFor="name">Last Name</label>
                            <input type="text" className="form-control" id="lname" name="lname" placeholder="Enter last name" onChange={this.changeData}/>
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
                            <input type="text" className="form-control" id="email" name="email" placeholder="Enter Email" onChange={this.changeData}/>
                            <span className="error">{this.state.errors["email"]}</span>
                            </div>

                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" name="password" placeholder="Enter password" onChange={this.changeData}/>
                            <span className="error">{this.state.errors["password"]}</span>
                            </div>
                            <button type="submit" className="btn btn-primary login_btn">ADD</button>                   
                            </form>
                            </div>
                            </div>
                        </div>

                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                    </div>

                    

                <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>                        
                        <th>Actions</th>
                    </tr>
                </thead>
                 <tbody>
                    {
                    this.state.users ?
                    this.state.users.map((person,i)=> 
                    <tr key={i}>
                    <td>{person.fname + " "+ person.lname}</td>
                    <td>{person.email}</td>     
                    <td>
                    <span data-toggle="modal" id="edituser" data-target="#myModal2" onClick={()=>this.edituser(person.id)}>Edit | </span>
                    <a className="delete" onClick={()=>{if(window.confirm('Are you sure want to delete user')) {this.deleteuser(person.id)}}} >Delete</a>
                    </td>
                        </tr>
                    )
                    :
                    <tr><td colSpan="3">No users found</td></tr>
                    }
                </tbody>
               </table>

               <div className="modal" id="myModal2">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            <div className="register-form">
                            <div className="login-form">
                            <form onSubmit={this.updateUser}>
                            <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter first name"  defaultValue={this.state.userdata.fname} onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["fname"]}</span>
                            </div>
                            <div className="form-group">
                            <label htmlFor="name">Last Name</label>
                            <input type="text" className="form-control" id="lname" name="lname" placeholder="Enter last name" defaultValue={this.state.userdata.lname} onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["lname"]}</span>
                            </div>  
                            <div className="form-group">
                            <label htmlFor="grade">Grade</label>
                            <select className="form-control" onChange={this.changeData} name="grade" defaultValue={this.state.userdata.grade}>
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
                            <input type="text" className="form-control" id="email" name="email" placeholder="Enter Email" defaultValue={this.state.userdata.email} onChange={this.changeData}/>
                            <span className="error">{this.state.errors["email"]}</span>
                            </div>
                            <input type="hidden" name="id" defaultValue={this.state.userdata.id}/>
                            <button type="submit" className="btn btn-primary login_btn">UPDATE</button>                   
                            </form>
                            </div>
                            </div>
                        </div>

                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                    </div>
                
            </div>
        );
    }
}
/*class Tablerow extends Users{ 
   
    render(){
        return(
        <tr>
            <td>{this.props.userinfo.fname + " "+ this.props.userinfo.lname}</td>
            <td>{this.props.userinfo.email}</td>     
            <td>
            <span data-toggle="modal" id="edituser" data-target="#myModal2" onClick={()=>this.edituser(this.props.userinfo.id)}>Edit | </span>
            <a className="delete" >Delete</a>
            </td>
        </tr>
        );
    }
}*/
export default Users;