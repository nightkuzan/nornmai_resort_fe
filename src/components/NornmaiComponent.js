import { Component } from "react"
import homepage from '../assets/homepage.jpg';
import RoomComponent from "./RoomComponent";
class NornmaiComponent extends Component {
    state = {}
    render(){
        return (
            <div className="bg-div">
                <h1 className="centered">Welcome to Nornmai Resort</h1>
                <img src={homepage} style={{'width':'100%'}} alt='background'/>
                
                <RoomComponent/>
                {/* <ReservComponent/> */}
            </div>
        )
    }
}
export default NornmaiComponent