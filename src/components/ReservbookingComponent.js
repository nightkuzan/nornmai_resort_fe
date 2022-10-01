import { Component } from 'react'
import "./css/reservebooking.css";


class ReservbookingComponent extends Component {
    constructor(){
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0,
            //rDescription:'',
            //rCapacity:'',
            //RoomAvailable:0,
            //rDefaultPrice:0
            'room':[]

        };
    }
    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="column-g">User ID : {this.loginStorage.ctUserId}</span> });
        this.setState({ 'memberType': <span className="column-g">Member Type : {this.loginStorage.mbTypeName}</span> })
        //this.setState({ 'ctUserID': <span className="column-g">CT User :{this.loginStorage.ctPoint}</span> })
        
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/history?userid='+ this.loginStorage.ctUserId, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'memberPoint': <span className="column-g">Member Point : {data.ctPoint}</span> })
        })
        //.then(data => {
            //this.setState({ 'room': data })
        //})งงเดียวมาทำต่อ 
        .catch(error => {
            console.error('There was an error!', error);
            });

    };
    
    render() {
        return(
            <div className="container">
               <div>
                <header className='header-resbooking'>Reserve Deluxe Room</header>
               </div>
               <hr/>
               <div className='detail'>
                    <div className='col-12'>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br/>

               
            </div>
        )
    }
}

export default ReservbookingComponent