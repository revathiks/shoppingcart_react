const initialstate={
    ftitle:'Welcome to ExQ'
}
const reducer = (state=initialstate, action) => {
    switch (action.type) {
       case 'SETTITLE': 
       return {
           ...state, 
           ftitle:action.payload  
       }   
       default: return state
    }
 } 
 export default reducer;