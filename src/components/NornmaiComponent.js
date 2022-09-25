import { Component } from "react"
import RoomComponent from "./RoomComponent";
class NornmaiComponent extends Component {
    state = {}
    render(){
        return (
            <div className="bg-div">
                <h1 className="centered">Welcome to Nornmai Resort</h1>
                <RoomComponent/>

            </div>
        )
    }
}
export default NornmaiComponent