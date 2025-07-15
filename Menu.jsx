import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../Reducer';
import { ToastContainer,toast } from 'react-toastify';

function Menu() {
  let {restId} = useParams();
  let [cards,setCards] = useState([])
  let dispatch = useDispatch();

  useEffect(()=>{
   axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4485835&lng=78.39080349999999&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`)
   .then((res)=>{
    setCards(res.data?.data?.cards);
   })
  } ,[]);
  return (

  <div style = {{textAign : "center"}}>
   { cards.length > 0 ? <h1  > {cards[0].card.card.text}'s Menu </h1> : ""}
   <div class="accordion" id="accordionExample" style={{ width : "80%", margin : "0px auto"}}>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       {cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.title} - {cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.length}
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      {cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards ?
      <div class="row row-cols-1 row-cols-md-6 g-4">
      {cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards.map((item,i)=>{
            
        return   <div class="col">
          <div class="card h-100">
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.info?.imageId}`} 
            style = {{height:"150px"}}
            class="card-img-top" alt="..."/>

            <div class="card-body">
              <h5 class="card-title">{item?.card?.info?.name}</h5>
              {item?.card?.info?.isVeg == 1 ? <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "green"}}> </div>  </>: 
             <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "red"}}> </div>  </>
        }
        
              <p> Price = {item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100}  rps</p>
              <button className='btn btn-success'  
              
              onClick={()=>{
               dispatch( addCartItem({   Name: item?.card?.info?.name , 
                Img : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.info?.imageId}`,
                Price : item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100 }))
 toast("Item Added To Cart",{
                style : {
                 color : "white",
                  backgroundColor :"green",
               } } )

                
              }} 
              
              > Add to cart</button>
              
              <br/>
            </div>
          </div>
        </div>
            
      })  } </div> : " "
     }

      </div>
    </div>
  </div>
      {cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.splice(2).map((item,i)=>{
       return  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`#collapse${i}`}>
       {item?.card?.card?.title} - {item?.card?.card?.title?.length}
      </button>
    </h2>
    <div id={`collapse${i}`} class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
             

              {item?.card?.card?.itemCards ? <div class="row row-cols-1 row-cols-md-6 g-4"> 
                {item?.card?.card?.itemCards.map((item,i)=>{
                  return <div class="col">
          <div class="card h-100">
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.info?.imageId}`} 
            style = {{height:"150px"}}
            class="card-img-top" alt="..."/>

            <div class="card-body">
              <h5 class="card-title">{item?.card?.info?.name}</h5>
              {item?.card?.info?.isVeg == 1 ? <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "green"}}> </div>  </>: 
             <> <div style = {{width: "20px", height : "20px" , borderRadius : "10px" , backgroundColor : "red"}}> </div>  </>
        }
        
              <p> Price = {item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100}  rps</p>
              <button className='btn btn-success' 
              

               onClick={
                ()=>{
               dispatch( addCartItem({   Name: item?.card?.info?.name , 
                Img : `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item?.card?.info?.imageId}`,
                Price : item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100 }))
             
                toast("Item Added To Cart",{
                style : {
                 color : "white",
                  backgroundColor :"green",
                  }
             })
             
             }
              
            }
              

              > Add to cart</button>
              <hr/>
              
              <br/>
            </div>
          </div>
        </div>
                })}
              </div> : " " }
            
      </div>
    </div>
  </div> 
      })}

 
 
</div>
<ToastContainer
position = 'bottom-right'
/>

  </div>

)}

export default Menu

