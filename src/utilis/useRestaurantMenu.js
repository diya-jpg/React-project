import { useEffect ,useState} from "react";
import { Menu_APi } from "../utilis/constants";

const useRestaurantMenu=(resId)=>{
    const[resInfo,setResInfo]=useState(null);
useEffect(()=>{
    fetchData();
},[]);
const fetchData=async()=>{
    const data=await fetch(
        ` ${Menu_APi}${resId}&catalog_qa=undefined&submitAction=ENTER`
       );
    const json=await data.json();
    setResInfo(json.data);
}
    return resInfo;
}
export default useRestaurantMenu;




