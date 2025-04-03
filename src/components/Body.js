
import RestaurantCard from "./Restaurantcard"
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom"
const Body=()=>{
    const[listofRestaurants,setlistofRestaurant]=useState([]);
    const [searchtext,setsearchtext]=useState("");
 const [filteredRestaurant,setfilteredRestaurant]=useState([]);
   useEffect(()=>{
   fetchData();
   },[]);
   const fetchData=async()=>{
    const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.9209632&lng=75.8413089&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
const json=await data.json();
console.log(json);
const finalData =
json?.data?.cards?.find(
  (card) => card.card?.card?.gridElements?.infoWithStyle?.restaurants
)?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

setlistofRestaurant(finalData);
setfilteredRestaurant(finalData);
   };
   //Conditional rendering
 
   console.log("Body rendered")
    return listofRestaurants.length===0?<Shimmer/>:
    (<div className="body">
        <div className="filter">
            <div className="search">
                <input type="text" className="search-box" value={searchtext} onChange={(e)=>{
setsearchtext(e.target.value);
                }}/>
                <button onClick={(()=>{
console.log(searchtext);
const filteredRestaurant=listofRestaurants.filter((res)=>res.info.name.toLowerCase().includes(searchtext.toLowerCase()));
setfilteredRestaurant(filteredRestaurant);
                })}>Search</button>
            </div>
            <button className="filter-btn" onClick={()=>{
                console.log("Button Clicked");
                const filteredList=listofRestaurants.filter(
                    (res)=>res.info.avgRating> 4.8
    );
            
                setfilteredRestaurant(filteredList)
            }}
            >Top Rated Restaurants</button>
        </div>
        <div className="res-container">
{
    filteredRestaurant.map((restaurant)=>(
        <Link key={restaurant.info.id}
        to={"/restaurants/"+restaurant.info.id}>
    <RestaurantCard
    resData={restaurant}/>
     </Link>))
}
        </div>
        </div>
        )
}
export default Body;
hi