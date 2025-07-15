import React ,{useState,useEffect} from 'react'
import axios from "axios"
import RestaurantCard from './RestaurantCard';

function SearchRestaurants() {
 let [restaurantName,setRestaurantName] = useState("");
 let[moreRestaurants,setMoreRestaurants] = useState([]);
 let[exactRestaurant,setExactRestaurant] = useState(null);
 useEffect(()=>{
    axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4485835&lng=78.39080349999999&str=${restaurantName}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=ec9f92a3-06bc-bef2-eb83-9a8f61084b0e`)
    .then((res)=>{
      if(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT.cards.length > 2){
             setExactRestaurant(null);
             if(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT.cards){
        setMoreRestaurants(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT.cards)
        }
      }else if(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT.cards.length == 2){
        setExactRestaurant(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[0]?.card?.card?.info)
        if(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants){
        setMoreRestaurants(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards[1]?.card?.card?.restaurants)
        }
      }
    })
 },[restaurantName]);

  return (
    <div>
        <div  style={{textAlign : "center"}}>
      <h1>SearchRestaurants</h1>
      <input 
      value = {restaurantName}
      onChange={(e)=>{
         setRestaurantName(e.target.value);
      }}
      placeholder='Search Restaurants'/>
      </div>
      <div className ='container mt-3'>
     { exactRestaurant != null ?
          <>
          <h4>Exact Restaurants</h4>
          <div class="row row-cols-1 row-cols-md-4 g-4">

          <RestaurantCard
           cloudinaryImageId = {exactRestaurant?.cloudinaryImageId}
          name = {exactRestaurant?.name}
          locality = {exactRestaurant?.locality}
          avgRating ={exactRestaurant?.avgRating }  
          deliveryTime = {exactRestaurant?.sla.slaString }/>
          </div>
          <br />
           </> : ""} 
        
        { restaurantName != "" ? <> 
        <h3> More Restaurants like this</h3>
        <div class="row row-cols-1 row-cols-md-4 g-4">
        
         {exactRestaurant == null ? moreRestaurants.map( ( item,i)=>{
          return  <RestaurantCard 
          cloudinaryImageId = {item?.card?.card?.info?.cloudinaryImageId}
          name = {item?.card?.card?.info?.name}
          locality = {item?.card?.card?.info?.locality}
          avgRating ={item?.card?.card?.info?.avgRating }  
          deliveryTime = {item?.card?.card?.info?.sla?.slaString }
          />
        }) : moreRestaurants.map( ( item,i)=>{
          return  <RestaurantCard 
          cloudinaryImageId = {item?.info?.cloudinaryImageId}
          name = {item?.info?.name}
          locality = {item?.info?.locality}
          avgRating ={item?.info?.avgRating }  
          deliveryTime = {item?.info?.sla?.slaString }
          />
        })}
      
  
</div> </>: ""}
    </div>
    </div>
          
  )
}

export default SearchRestaurants
