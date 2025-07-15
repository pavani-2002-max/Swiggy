import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    cartItems : []
    
}
const cartReducer = createSlice({

    name : "cart",
    initialState,
    reducers : {
        addCartItem : (state,action)=>{
            console.log("calledd...")
            state.cartItems.push( action.payload)  
        },

        removeFromCart : (state,action)=>{
           state.cartItems.splice(action.payload,1); 
        }
    }
    
})
export const { addCartItem,removeFromCart} = cartReducer.actions;
export default cartReducer.reducer;
     
