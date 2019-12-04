const cartWithoutItem=(cart,item)=>{   
    return cart.filter(cartItem => cartItem.id!==item.id)
}

const itemInCart=(cart,item)=>{   
  return cart.filter(cartItem => cartItem.id===item.id)[0]
}

const addToCart=(cart,item)=>{
    const cartItem=itemInCart(cart,item);    
    return cartItem===undefined
    ? [ ...cartWithoutItem(cart,item),{ ...item,quantity:1,total:item.price*1}]
    : [ ...cartWithoutItem(cart,item),{ ...cartItem,quantity:cartItem.quantity+1,total:item.price*(cartItem.quantity+1)}]

}
const removeFromCart=(cart,item)=>{
    return item.quantity===1
    ?   [...cartWithoutItem(cart,item)]
    :   [...cartWithoutItem(cart,item),{...item,quantity:item.quantity-1,total:item.price*(item.quantity-1)}]
}
const removeAllFromCart=(cart,item)=>{
 return [...cartWithoutItem(cart,item)]
}
const cartreducer = (state=[], action) => {
    switch (action.type) {
        case 'ADD': {
        //return [...state,action.payload]
        console.log(state)
        return addToCart(state,action.payload)
        }

        case 'REMOVE':
        //const firstMatchIndex=state.indexOf(action.payload)
        // return state.filter((item,index)=>index !==firstMatchIndex)
        return removeFromCart(state,action.payload)
        case 'REMOVE_ALL':
        //const firstMatchIndex=state.indexOf(action.payload)
        // return state.filter((item,index)=>index !==firstMatchIndex) 
        return removeAllFromCart(state,action.payload)

        case 'RESET':
        return state = [];

        default: return state
    }
 } 
 export default cartreducer;