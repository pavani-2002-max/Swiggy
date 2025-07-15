import React from 'react'
import { useNavigate } from 'react-router-dom';

function RestaurantCard({cloudinaryImageId,name,locality,avgRating,deliveryTime,restId}) {
  let navigate = useNavigate();
  return (
    <div class="col" onClick = { ( )=> {
      navigate(`/menu/${restId}`)
    } }>

    <div class="card h-100">
      <img src= {`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`} 
      class="card-img-top restaurant-image" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <b> {locality} </b>
        <p>Rating : {avgRating}</p>
        <p>{deliveryTime}</p>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div>
  )
}

export default RestaurantCard
