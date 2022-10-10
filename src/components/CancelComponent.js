import React, { Component } from 'react'
import "./css/cancel.css"

export default class CancelComponent extends Component{
    state = {}
    constructor(){
        const queryParams = new URLSearchParams(window.location.search);
        const bookingid = queryParams.get("bookingid") != null ? queryParams.get("bookingid") : '';
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0,
            bookingid: bookingid,
            checkIn: '',
            checkOut: '',
            roomType: '',
            roomPrice: 0,
            dcCode: '',
            usePoint: 0
        };
    }
    

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="column-g">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
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

        fetch('http://localhost:3001/review-cancel-info?bookingid=' + this.state.bookingid, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ "CheckIn": data.CheckIn });
                this.setState({ "CheckOut": data.checkOut });
                this.setState({ "roomType": data.roomType });
                this.setState({ "roomPrice": data.roomPrice });
                this.setState({ "dcCode": data.dcCode });
                this.setState({ "usePoint": data.usePoint });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
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
                    <header>CANCEL BOOKING ORDER</header>
                </div>
                <hr/>       
                <div className='row'>
                    <div className='col-12'>
                        <span className='column-cancel'>Booking ID : {this.state.bookingid}</span>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br/>
                <div className='layout-cancel'>
                    <div className='row-can'>
                        <div className='column-can'>
                            <div className='left-block'>
                                <span className='column-check'>Check-in: {this.state.checkIn}</span>
                                <span>to</span>
                                <span className='column-check'>Check-out: {this.state.checkOut}</span>
                                <br/>
                                <br/>
                                <div className='bg-text-summary-cancel'>{this.state.roomType}</div>
                                <div className='bg-text-summary-cancel'>ราคาห้อง {this.state.roomPrice} บาท</div>
                                <div className='bg-text-summary-cancel'>โค้ดส่วนลด {this.state.dcCode == null ? "None" : this.state.dcCode}</div>
                                <div className='bg-text-summary-cancel'>ใช้คะแนน {this.state.usePoint} คะแนน</div>
                            </div>
                        </div>
                        <div className='column-can'>
                            <div className='right-block'>
                                <div className='column-check'>Reason for cancellation</div>
                                <br/>
                                <div className='comment-box'>
                                    <form className='comment-form'>
                                        <textarea className='coms' type="text"/>
                                    </form>
                                    <button className='cancel-button' type='submit'>CONFIRM CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}