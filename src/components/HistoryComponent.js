import React, { Component } from 'react';
import "./css/history.css";
import moment from 'moment';

export default class HistoryComponent extends Component{
    state = {}
    constructor(){
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0,
            // bookingID: 0,
            // roomType: '',
            // checkIn: '',
            // checkOut: '',
            // DiscountCode: '',
            // PointUse: 0,
            // TotalPrice: 0,
            // GetPoint: 0,
            // Reason: '',
            // BStatus: '',
            // cancelReview: '',
            room: []
        };
    }
    

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="column-g">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="column-g">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/history?userid='+ this.loginStorage.ctUserId, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'memberPoint': <span className="column-g">Member Point : {data.ctPoint}</span> })
        })

        fetch('http://localhost:3001/history2?userid='+ this.loginStorage.ctUserId, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'room': data });
            console.log(data)
        }) 
        .catch(error => {
        console.error('There was an error!', error);
        });

    }
    showUserId(id) {
        let user = "CT";
        for (let index = 0; index < 5 - id.toString().length; index++) {
            user += "0";
        }
        user += id;
        return user;
    }

    render(){
        return(
            <div className='container'>
                <div className='header-his'>
                    <header>HISTORY</header>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col-12'>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br/>
                <table className="table">   
                    <thead>                
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Booking ID
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Room Type
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Check-in
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Floor
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Check-out
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Discount Code
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Point Use
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Total Price
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Get Point
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Reason
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Status
                            </th>
                            <th scope="col" style={{ textAlign: "center" }}>
                                Cancel/Review
                            </th>
                        </tr>
                    </thead>               
                <tbody>
                {this.state.room.map((room,index)=>(
                    <tr key={index} style={{ "verticalAlign": "middle"}}>
                        <th scope="row">{index+1}</th>
                        <td style={{textAlign: "center"}}>{room.bookingID}</td>
                        <td style={{textAlign: "center"}}>{room.RoomTypeName}</td>
                        <td style={{textAlign: "center"}}>{moment(room.bkCheckInDate).format('DD-MM-YYYY')}</td>
                        <td style={{textAlign: "center"}}>{room.rfloor}</td>
                        <td style={{textAlign: "center"}}>{moment(room.bkLeaveDate).format('DD-MM-YYYY')}</td>
                        <td style={{textAlign: "center"}}>{room.dcCode}</td>
                        <td style={{textAlign: "center"}}>{room.bkpointDiscount}</td>
                        <td style={{textAlign: "center"}}>{room.bkTotalPrice}</td>
                        <td style={{textAlign: "center"}}>{room.bkGetPoint}</td>
                        <td style={{textAlign: "center"}}>{room.bkReason == null ? '-' : room.bkReason}</td>
                        <td style={{textAlign: "center"}}>{room.bkStatus}</td>
                        <td style={{ 'textAlign': 'center' }}>{room.bkStatus === 'NOT PAID' ?
                                        <a href={"/cancelbooking?bookingid=" + room.bookingID}><button className="btn btn-danger">Cancel</button></a> :
                                        room.bkStatus === 'PAID' ? <a href={"/review?bookingid=" + room.bookingID}><button className="btn btn-success">Review</button></a> : '-'}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        )
    }
}