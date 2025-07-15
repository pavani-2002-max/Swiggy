import React from 'react'
import Header from "./Components/Header.jsx"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./Components/Home.jsx"
import SearchRestaurants from './Components/SearchRestaurants.jsx'
import SearchDishes from './Components/searchDishes.jsx'
import Menu from "./Components/Menu.jsx"
import Cart from "./Components/Cart.jsx"
function App() {
  return (
     <div>
        <BrowserRouter>
        <Header/>
        <div style= {{marginTop:"150px"}}>

        </div>
        <Routes>
          <Route path ='/' element= {<Home/>} />
          <Route path= "/searchRestaurants" element = {<SearchRestaurants/>}/>
          <Route path= "/searchDishes" element = {<SearchDishes/>}/>
          <Route path = '/menu/:restId' element = {<Menu />}/>
          <Route path = '/cart' element = {<Cart/>} />

        </Routes>
        </BrowserRouter>  

  </div>
  )
}

export default App
