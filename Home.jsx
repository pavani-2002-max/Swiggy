import React,{useState,useEffect} from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Restaurants from "./Restaurants.jsx"
import LocationSection from "./LocationSection.jsx"
import Shimmer from "./Shimmer.jsx"
function Home() {

  let[onlineRestaurants,setOnlineRestaurants] = useState([]);
  let [topRestaurants,setTopRestaurants] = useState([]);
  let [location,setLocation] = useState({  lat :"17.38430",lng : "78.45830"});

  useEffect(()=>{
    axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.lat}&lng=${location.lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
    .then((res)=>{
      setTopRestaurants(res.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      setOnlineRestaurants(res.data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    })
    
  },[location]);

  
  return (
    <div>
        <div className='container-flid'>
          <div className='row'>
            <LocationSection 
            setLocation = {setLocation} 
            setOnlineRestaurants = {setOnlineRestaurants}
            setTopRestaurants = {setTopRestaurants}
            />

            {onlineRestaurants.length == 0 && topRestaurants.length == 0 ? <Shimmer/> : ""}
            {onlineRestaurants.length !=0 || topRestaurants.length != 0 ? <Restaurants 
            topRestaurants = {topRestaurants }
            onlineRestaurants = {onlineRestaurants}  /> : ""}

          </div>

        </div>
      
    </div>
  )
}

export default Home
