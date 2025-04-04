import React from "react";
class UserClass extends React.Component{
    constructor(props){
        super(props);
        this.state={
         userInfo:{
            name:"Dummy",
            location:"Default",
            avatar_url:"https://hips.hearstapps.com/hmg-prod/images/dahlia-1508785047.jpg?crop=1.00xw:0.669xh;0,0.0136xh&resize=980:*"
         },
        
        };
       // console.log("child constructor");
    }
   async componentDidMount(){
       // console.log("Child Component Did Mount");

       const data=await fetch("https://api.github.com/users/diya-jpg");
const json= await data.json();
this.setState({
    userInfo:json,
})
    }
    render(){
        // const{name,location}=this.props;
        // const{count}=this.state;
        //console.log("child render");
        const {name,location,avatar_url}=this.state.userInfo;
        return(
            <div className="user-card">
               {/* <h1>Count:{count}</h1>
               <button onClick={()=>{this.setState({
                count:this.state.count+1,
               });
               }}>
                Count Increases
               </button> */}
               <img src={avatar_url}/>
            <h2>Name:{name}</h2>
            <h3>Location:{location}</h3>
            
          <h4>Contact:@diyabari</h4>
        </div>
        )
    }
}
export default UserClass;