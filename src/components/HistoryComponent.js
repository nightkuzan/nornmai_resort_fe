import React, { Component } from 'react';
import "./css/history.css";

export default class HistoryComponent extends Component{
    state = {}
    constructor(){
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0,
        };
    }
    

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="column-g">User ID : {this.loginStorage.ctUserId}</span> });
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
        // fetch('http://localhost:3001/booking?userid='+ this.loginStorage.ctUserId, requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({ 'memberPoint': <span className="column-g">Member Point : {data.ctPoint}</span> })
        // }) fetch ข้อมูลในตาราง เดี๋ยวมาทำต่อ ร่างโครงไว้ก่อน
        .catch(error => {
        console.error('There was an error!', error);
        });
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
                </table>
            </div>
        )
    }
}