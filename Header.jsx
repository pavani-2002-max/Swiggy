import React from 'react'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'

function Header() {

 let cartItems = useSelector((state)=>{
   return state?.cart?.cartItems;
  });

  return (
    <div id="header">
     <Link to = "/"> <img 
      style ={{width:"100px"}} src = "https://1000logos.net/wp-content/uploads/2021/05/Swiggy-logo.png"/>
      </Link>
     <Link to ="/searchRestaurants"> <b>Search Restaurants</b> </Link>
   <Link to = "/searchDishes"> <b>Search Dishes</b> </Link>
<Link to = "/cart"> <span>Cart - {cartItems.length} </span> </Link>
    </div>
  )
}

export default Header
