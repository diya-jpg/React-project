import {Component} from "react";
import UserClass from "./UserClass";
class About extends Component{
    constructor(props){
        super(props);
       // console.log("Parent Constructor")
    }
   componentDidMount(){
//console.log("component did mount");

    }
    render(){
        //console.log("Parent Render")
        return(
           
            <div >
          
            <h1>About Us</h1>
            <h2>This is Namaste React Web Series</h2>
              <UserClass name={"Diya Bari(class)"} location={"Jaipur"}/>
        </div>
        );
    }
}




export default About;