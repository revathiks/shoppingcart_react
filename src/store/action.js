export const settitle = (title) => {
    return {
       type: 'SETTITLE',
       payload: title   
    }
 }
 export const additem = (item) => {
   return {
      type:'ADD',
      payload:item  
   }
}

export const removeitem = (item) => {
   return {
      type:'REMOVE',
      payload:item  
   }
}
export const removeallitem = (item) => {
   return {
      type:'REMOVE_ALL',
      payload:item  
   }
}