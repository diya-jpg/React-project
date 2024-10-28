// import {useEffect,useState} from "react";
// import Shimmer from "./Shimmer";
// import {useParams} from "react-router-dom";
// import { Menu_APi } from "../utilis/constants";
// const RestaurantMenu=()=>{
//     const [resInfo,setresInfo]=useState(null);
//     const {resId}=useParams();
// useEffect(()=>{
// fetchMenu();
// },[])
// const fetchMenu=async()=>{
//     const data=await fetch(
//         Menu_APi+resId+"&catalog_qa=undefined&submitAction=ENTER"
//     );
//     const json=await data.json();
//     console.log(json);
//     setresInfo(json.data)
// };
// if(resInfo===null) return (<Shimmer/>);
// const {
//     name ,
//     cuisines ,
//     costForTwoMessage 
// } = resInfo?.cards?.[2]?.card?.card?.info;
// //const {itemsCards}=resInfo?.cards[0]?.card?.card?.info
//     return (<div className="menu">
// <h1>{name}</h1>
// <h2>{cuisines.join(",")}</h2>
//  <h3>{costForTwoMessage}</h3>
// <ul>
//     <li>Biryani</li>
//     <li>Burger</li>
//     <li>Diet Coke</li>
// </ul>
//     </div>);
// };
// export default RestaurantMenu;
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { Menu_APi } from "../utilis/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(
       ` ${Menu_APi}${resId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const json = await data.json();
      console.log(json);
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  if (!resInfo) return <Shimmer />;

  // Ensure that the correct card is accessed
  const restaurantInfoCard = resInfo.cards?.find(
    (card) =>
      card.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );

  const {
    name = "Restaurant Name Unavailable",
    cuisines = [],
    costForTwoMessage = "Cost info not available",
  } = restaurantInfoCard?.card?.card?.info || {};

  // Extracting menu items
  const itemCategories = resInfo?.cards?.find(
    (card) =>
      card.groupedCard?.cardGroupMap?.REGULAR?.cards.some(
        (groupCard) =>
          groupCard.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
  )?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const items = itemCategories.flatMap((category) => {
    const card = category.card.card;
    if (card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
      return card.itemCards.map((item) => item.card.info.name);
    }
    return [];
  });

  return (
    <div className="menu">
      <h1>{name}</h1>
      <h2>{cuisines.length > 0 ? cuisines.join(", ") : "Cuisines not available"}</h2>
      <h3>{costForTwoMessage}</h3>
      <ul>
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No items available</li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantMenu;