import React from 'react'
import { useSelector } from 'react-redux'
import { removeFromCart } from '../Reducer'
import { useDispatch } from 'react-redux'
import { ToastContainer,toast } from 'react-toastify';


function Cart() {

  let dispatch = useDispatch();
  
 let cartItems = useSelector((state)=>{
    return state?.cart?.cartItems
  })
 let price = cartItems.reduce((acc,item,i)=>{
    return acc + item.Price
  },0)
  return (
    
      <div> 
        <h1> Cart items = {cartItems.length} </h1>
        <h4> Price = {price} </h4>
        
         <div class="row row-cols-1 row-cols-md-6 g-4"> 

        {cartItems.map((item,i)=>{
             return   <div class="col">
                    <div class="card h-100">
                      <img src={ item?.Img} 
                      style = {{height:"150px"}}
                      class="card-img-top" alt="..."/>
          
                      <div class="card-body">
                        <h5 class="card-title">{item?.Name}</h5>
                        {item?.card?.info?.isVeg == 1 ? <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "green"}}> </div>  </>: 
                       <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "red"}}> </div>  </>
                  }
                  
                        <p> Price = {item?.Price}  rps</p>
                        <button className='btn btn-danger' 
                         onClick={ ( )=>{
                         dispatch(removeFromCart(i));

                          toast("Item removed from  the cart",{
                                         style : {
                                          color : "white",
                                           backgroundColor :"red",
                                        } } )
                        }
                        
                        }> remove from cart</button>
                      
                      </div>
                    </div>
                  </div>
          }) }
         
         
      </div>


      <ToastContainer
      position = 'bottom-right'
      />
    </div>
  )
}

export default Cart
