//import React,{Component} from 'react';
const carttotal=(cartItems)=>{
    return cartItems.reduce((ftotal,item)=>{
       return ftotal+=item.total },0)
}
export default carttotal;