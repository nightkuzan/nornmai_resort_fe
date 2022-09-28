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
        this.setState({ 'userId': <div className="column-g">User ID : {this.loginStorage.ctUserId}</div> });
        this.setState({ 'memberType': <div className="column-g">Member Type : {this.loginStorage.mbTypeName}</div> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:3001/history?userid='+ this.loginStorage.ctUserId, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'memberPoint': <div className="column-g">Member Point : {data.ctPoint}</div> })
        })
        .catch(error => {
        console.error('There was an error!', error);
        alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
        });
    }
    render(){
        return(
            <div className='container'>
                <div className='header-his'>
                    <header>HISTORY</header>
                </div>
                <hr className='hr-line'></hr>
                <div className='ht-info'>
                    {this.state.userId}
                    {this.state.memberType}
                    {this.state.memberPoint}
                </div>
            </div>
        )
    }
}