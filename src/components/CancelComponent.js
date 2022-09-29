import React, { Component } from 'react'
import "./css/cancel.css"

export default class CancelComponent extends Component{
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
        this.setState({ 'userId': <span className="column-cancel">User ID : {this.loginStorage.ctUserId}</span> });
        this.setState({ 'memberType': <span className="column-cancel">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/history?userid='+ this.loginStorage.ctUserId, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'memberPoint': <span className="column-cancel">Member Point : {data.ctPoint}</span> })
        })
        .catch(error => {
            console.error('There was an error!', error);
            });
    }

    render(){
        return(
            <div className='container'>
                <div className='header-his'>
                    <header>CANCEL BOOKING ORDER</header>
                </div>
                <hr/>       
                <div className='row'>
                    <div className='col-12'>
                        <span className="column-cancel">Booking ID: </span>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br/>
                <br/>   
                <div className='box-cancel'>
                    <div className='row'>
                        <div className='col-12'>
                            <br/>
                            <div className="column-check">Check-in : 27-03-2022</div>
                            <div style={{display: "inline"}}>to</div>
                            <div className="column-check">Check-out : 28-03-2022</div>
                            <br/>
                            <br/>
                            <div className='cancel-info'>noob</div>
                            <div className='cancel-info'>fuck</div>
                            <div className='cancel-info'>gg</div>
                            <div className='cancel-info'>ez</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}