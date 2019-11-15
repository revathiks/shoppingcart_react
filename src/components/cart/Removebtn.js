import React from 'react'
export default function romoveButton(props){
    return <button className="btn btn-warning ml-1"
    onClick={() => props.removeFromCart(props.cartItem)}>
    Remove
 </button>
}