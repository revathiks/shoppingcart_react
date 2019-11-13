import React from 'react'
export default function romoveButton(props){
    return <button 
    onClick={() => props.removeFromCart(props.cartItem)}>
    Remove
 </button>
}