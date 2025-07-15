import React from 'react'
import "./app.css"
import RestaurantCard from "./RestaurantCard"

function Restaurants({onlineRestaurants,topRestaurants}) {
  return (
  
    <div className='col-10'>
      <input placeholder = 'Search Restaurants'/> 
      <button>Rating high to low</button> 
      <button>Fast delivery</button>
      <h3>Restaurants with online food delivery in Hyderabad</h3>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        {onlineRestaurants.map( ( item,i)=>{
          return  <RestaurantCard 
          restId = {item.info?.id}
          cloudinaryImageId = {item.info?.cloudinaryImageId}
          name = {item.info?.name}
          locality = {item?.info?.locality}
          avgRating ={item.info.avgRating  ? item.info.avgRating : avgRatingString}  
          deliveryTime = {item.info?.sla?.slaString }

          />
        })}
 
  
</div>

      <h3> Top restaurant chains in Hyderabad</h3>
      <div class="row row-cols-1 row-cols-md-4 g-4">
         {topRestaurants.map( ( item,i)=>{
          return  <RestaurantCard 
          restId= {item.info?.id}
          cloudinaryImageId = {item.info?.cloudinaryImageId}
          name = {item.info?.name}
          locality = {item?.info?.locality}
          avgRating ={item.info.avgRating  ? item.info.avgRating : avgRatingString}  
          deliveryTime = {item.info?.sla?.slaString }
          />
        })}
 
  
</div>

      
    </div>

    
  )
}

export default Restaurants
