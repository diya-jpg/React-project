import React ,{lazy,Suspense}from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Shimmer from "./components/Shimmer";

const Grocery=lazy(()=>import("./components/Grocery"));
const AppLayout=()=>{
    return(
        <div className="app">
<Header/>
<Outlet/>
        </div>
    )
};
const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<AppLayout/>,
        children:[
            {
                path:"/",
                element:<Body/>,
                errorElement:<Error/>
            },
            {
                path:"/about",
                element:<About/>,
                errorElement:<Error/>
            },
            {
                path:"/contact",
                element:<Contact/>,
                errorElement:<Error/>
            }
        ],
        errorElement:<Error/>
    },
    {
        path:"/about",
        element:<About/>,
        errorElement:<Error/>
    },
    {
        path:"/contact",
        element:<Contact/>,
        errorElement:<Error/>
    },
    {
        path:"/grocery",
        element:<Suspense fallback={<Shimmer/>}><Grocery/></Suspense>,
        errorElement:<Error/>
    },
    {
        path:"/restaurants/:resId",
        element:<RestaurantMenu/>
    }
    
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>);