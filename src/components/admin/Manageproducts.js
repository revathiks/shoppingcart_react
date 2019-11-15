import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
var apiProductList="http://172.16.5.51/react_services/api/products.php";
var addProductapi="http://172.16.5.51/react_services/api/addproduct.php";
const apiProductInfo="http://172.16.5.51/react_services/api/productdetail.php";
const apiProductUpdate="http://172.16.5.51/react_services/api/productupdate.php";
const imgPath="http://172.16.5.51/react_services/uploads/products";
class Manageproducts extends Component{
    constructor(props){
        super(props);
        this.state={
            products:[],
            errors:{}, 
            selectedfile:null,
            product:{               
                isAdded:0,
                isSubmitted:'',
                msg:'',
                alertclass:''
            },

            edit_product:{               
                isAdded:0,
                isSubmitted:'',
                msg:'',
                alertclass:''
            },
            productdata:[0]
        }
        this.processProduct=this.processProduct.bind(this);
        this.fileselector=this.fileselector.bind(this);
        this.changeData=this.changeData.bind(this);
        this.productinfo=this.productinfo.bind(this);
        this.updateProduct=this.updateProduct.bind(this);
    }
    updateProduct(e){
        e.preventDefault();         
            const formdata=new FormData(event.target);
            const requestoptions={
                method:'POST',
                body:formdata
            }
           const eproduct=this.state.edit_product;
            fetch(apiProductUpdate,requestoptions)
            .then( (response) => { return response.json() })
            .then( (responsedata)=> {
                if(responsedata.actionState===1){
                    eproduct['isUpdated']=1;
                    this.setState({eproduct});
                    document.getElementById('editproduct').click();
                    this.props.history.push('/admin/products');
                }else{
                    eproduct['isUpdated']=0;
                    this.setState({eproduct});
                    console.log(this.state);
                }
            })

         

    }
    productinfo(id){ 
        const requestionOption={
            method:"GET"           
        }
        fetch(apiProductInfo+"?id="+id,requestionOption)
        .then((response)=> {return response.json()})
        .then((responsedata)=>        
         this.setState( {productdata:responsedata.product})         
        ); 
        
    }
    fileselector(e){        
        this.setState({
            selectedfile:e.target.files[0]
        });

    }
    validateForm(){        
       let fields=this.state.product;
        let errors={};
        let formValid=true; 
        if(!fields['name']){
            formValid=false;
            errors['name']="Please enter product name";
        }
        if(!fields['code']){
            formValid=false;
            errors['code']="Please enter product code";
        }
        if(!fields['description']){
            formValid=false;
            errors['description']="Please enter description";
        }
        if(!fields['price']){
            formValid=false;
            errors['price']="Please enter price";
        }
        
        this.setState({errors:errors});       
        return formValid; 

    }
    changeData(e){
        const fieldvalue=e.target.value;
        const fieldname=e.target.name;
        const product=this.state.product;
        product[fieldname]=fieldvalue;
        this.setState({product});

    }
    processProduct(e){
        e.preventDefault();
        if(this.validateForm()){
           const formdata=new FormData(event.target);
           formdata.append('image',this.state.selectedfile,this.state.selectedfile.name)
           const requestoptions={
               method:'POST',
               body:formdata
           }
           const product=this.state.product;
           fetch(addProductapi,requestoptions)
           .then( (response) => { return response.json() })
           .then( (responsedata)=> {
               if(responsedata.actionState===1){
                product['isAdded']=1;
                product['alertclass']="alert alert-success";
                product['isSubmitted']=1;
                product['msg']=responsedata.msg;
                this.setState({product});
                document.getElementById('adduser').click();
                this.setState({product:{}});
                console.log(this.state.product)
                this.props.history.push('/admin/products');
               }else{
                   console.log(responsedata);
                product['isAdded']=0;
                product['alertclass']="alert alert-danger";
                product['isSubmitted']=1;
                product['msg']=responsedata.msg;
                this.setState({product});                   
               }
           })

        }else{
           console.log(0);
        }        
                 

    }
    getProducts(){               
        const requestionOption={
            method:"GET"
        }
        fetch(apiProductList,requestionOption)
        .then((response)=>response.json())
        .then((responsedata)=>
        this.setState({products:responsedata.products})
        );
      
    }

    componentDidMount(){       
        this.getProducts();        
    }
    render(){            
        return(
            <div>
            <button type="button" className="btn btn-primary" id="adduser" data-toggle="modal" data-target="#myModal">
            Add User
            </button>
                     <div className="modal" id="myModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Product</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            <div className="register-form">
                            <div className="login-form">
                            { 
                            this.state.product.isSubmitted===1 ? <div className={this.state.product.alertclass}>{this.state.product.msg}</div>:''
                            }
                            <form onSubmit={this.processProduct} encType="multipart/form-data">

                            <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter product name" onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["name"]}</span>
                            </div>

                            <div className="form-group">
                            <label htmlFor="name">Product code</label>
                            <input type="text" className="form-control" id="code" name="code" placeholder="Enter product code" onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["code"]}</span>
                            </div>  
                            <div className="form-group">
                            <label htmlFor="name">Product Price</label>
                            <input type="text" className="form-control" id="price" name="price" placeholder="Enter product price" onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["price"]}</span>
                            </div>  

                            <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" id="description" name="description" placeholder="Enter product description" onChange={this.changeData}/>
                           <span className="invalid">{this.state.errors["description"]}</span>
                            </div> 

                           

                            <div className="form-group">
                            <label htmlFor="name">Upload image</label>
                            <input type="file" className="form-control" id="thumb" name="thumb"  onChange={this.fileselector}/>
                            
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
                 <div className="table-responsive">
                <table className="table table-bordered">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>   
                    <th></th>      
                    </tr>
                </thead>
                <tbody>
                   {
                    this.state.products ?
                    this.state.products.map((item,i)=> 
                    <tr key={i}>
                        <td>{i+1}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td> 
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td><img alt={item.name} width={150} height={100} src={imgPath+`/${item.thumb}`}/></td>  
                    <td>
                    <span data-toggle="modal" id="editproduct" data-target="#myModal2" onClick={()=>this.productinfo(item.id)}>Edit | </span>
                    <a className="delete" onClick={()=>{if(window.confirm('Are you sure want to delete product')) {this.deleteproduct(item.id)}}} >Delete</a>
                    </td>
                     </tr>
                    )
                    :
                    <tr><td colSpan="3">No Product(s) found</td></tr>
                    }
                    </tbody>
               </table>
               </div>
               <div className="modal" id="myModal2">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Product</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body">
                            <div className="register-form">
                            <div className="login-form">
                            {/* { 
                            this.state.editproduct.isSubmitted===1 ? <div className={this.state.editproduct.alertclass}>{this.state.editproduct.msg}</div>:''
                            } */}
                            <form onSubmit={this.updateProduct} encType="multipart/form-data">

                            <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder="Enter product name"  defaultValue={this.state.productdata.name} onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["name"]}</span>
                            </div>

                            <div className="form-group">
                            <label htmlFor="name">Product code</label>
                            <input type="text" className="form-control" id="code" name="code" placeholder="Enter product code" defaultValue={this.state.productdata.code} onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["code"]}</span>
                            </div>  
                            <div className="form-group">
                            <label htmlFor="name">Product Price</label>
                            <input type="text" className="form-control" id="price" name="price" placeholder="Enter product price" defaultValue={this.state.productdata.price} onChange={this.changeData}/>
                            <span className="invalid">{this.state.errors["price"]}</span>
                            </div>  

                            <div className="form-group">
                            <label htmlFor="username">Description</label>
                            <input type="text" className="form-control" id="description" name="description" placeholder="Enter product description" defaultValue={this.state.productdata.description} onChange={this.changeData}/>
                           <span className="invalid">{this.state.errors["description"]}</span>
                            </div> 

                           

                            <div className="form-group">
                            <label htmlFor="name">Upload image</label>
                            <input type="file" className="form-control" id="thumb" name="thumb"  onChange={this.fileselector}/>
                            
                            </div>
                            <input type="hidden" name="id" defaultValue={this.state.productdata.id}/>
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
        )
    }
}
export default withRouter(Manageproducts);