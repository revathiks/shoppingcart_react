import React from 'react'
export default function AddButton(props){
    return <button className="btn btn-info"
    onClick={(e) => props.addtoCart(props.product)}>
    AddtoCart{
        (props.cartItem && props.cartItem.quantity) ?
        ` (${props.cartItem.quantity}) `
        :
        ''
    }
 </button>
}