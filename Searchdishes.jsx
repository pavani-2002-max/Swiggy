import React,{ useState,useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addCartItem } from '../Reducer';
import {ToastContainer,toast } from 'react-toastify';

function SearchDishes() {
  let dispatch = useDispatch();
    let[dishName,setDishName] = useState("");
    let[dishes,setDishes] = useState([]);

    useEffect(()=>{
        axios.get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4485835&lng=78.39080349999999&str=${dishName}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=55cd2735-1965-0229-3ed5-b051cf99b37d`)

        .then((res)=>{
            if(res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards){
            setDishes(res.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)
            }
        })
    },[dishName]);
  return (
    <div>
        <div  style={{textAlign : "center"}}>
      <h1>Search Dishes</h1>
      <input 
      value = {dishName}
      onChange={(e)=>{
         setDishName(e.target.value);
      
      }}
      placeholder = 'Search Dishes'/>

      </div>
      <div className = 'container mt-4'>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        {dishes.map((item,i)=>{
          return <div class="col">
          <div class="card h-100">
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.card?.info?.imageId}`} 
            style = {{height:"150px"}}
            class="card-img-top" alt="..."/>

            <div class="card-body">
              <h5 class="card-title">{item?.card?.card?.info?.name}</h5>
              {item?.card?.card?.info?.isVeg == 1 ? <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "green"}}> </div>  </>: 
             <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "red"}}> </div>  </>
        }
        
              <p> Price = {item?.card?.card?.info?.price/100} rps</p>
              <button className='btn btn-success'
              
             onClick={()=>{
                            dispatch( addCartItem({   Name: item?.card?.card?.info?.name , 
                             Img : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.card?.info?.imageId}`,
                             Price : item?.card?.card?.info?.price ? item?.card?.card?.info?.price/100 : item?.card?.card?.info?.defaultPrice/100 }))
                           }} 
             

              > Add to cart</button>
              <hr/>
              <b> {item?.card?.card?.restaurant?.info?.name}</b>
              <br/>
              <button className = 'btn btn-primary'> View restaurant menu</button>
            </div>
          </div>
        </div>
      
        })}
  
</div>
    </div>
    </div>
  )
}

export default SearchDishes

