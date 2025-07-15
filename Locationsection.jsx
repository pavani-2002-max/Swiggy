import React,{useState,useEffect} from 'react'
import axios from "axios"

function LocationSection({setLocation,setOnlineRestaurants,setTopRestaurants}) {
  let [locationName,setLocationName] = useState("")
  let [locationSuggestions,setLocationSuggestions] = useState([]);

  useEffect(()=>{
    
   axios.get(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`)
   .then((res)=>{
    if(res?.data?.data){
    setLocationSuggestions(res?.data?.data);
    }
   })
  },[locationName])

  let fetchLocation =(id)=>{
   axios.get(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
   .then((res)=>{
    setOnlineRestaurants([])
    setTopRestaurants([])
    let location = res.data?.data[0]?.geometry?.location
    setLocation(location);
    setLocationName("")
    setLocationSuggestions([])
   })
   .catch((err)=>{
    console.log(err)
   })
  }
  return (
    
      <div className='col-2'>
             col 2
             <input 
             value= {locationName}
             onChange = {(e)=>{
              setLocationName(e.target.value)
             }}
             placeholder='Search Location'/>
             {locationName.length >= 3 ? <ol>
             {locationSuggestions.map((item,i)=>{
              return <li onClick={()=>{ 
                fetchLocation(item.place_id)
              }}>{item.description}</li>
             })}
             </ol> : " " }
            </div>
    
  )
}

export default LocationSection
