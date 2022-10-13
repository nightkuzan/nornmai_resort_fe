import React, { Component } from 'react'
import "./css/cancel.css"
import moment from 'moment';

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
            // checkIn: [],
            // checkOut: [],
            // roomType: '',
            // roomPrice: 0,
            // dcCode: '',
            // usePoint: 0,
            // reason: ''
            room: [],
            reason: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
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
                this.setState({ "room": data });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetch('http://localhost:3001/reason?userid='+ this.loginStorage.ctUserId, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ "reason": data });
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
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    edit(e) {
        e.preventDefault();
        let loginStorage = JSON.parse(localStorage.getItem('login'));

        let raw = JSON.stringify({
            "userid": loginStorage.ctUserId,
            "bookingid": this.state.bookingid,
            "reason": this.state.reason
        });

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/update-reason-cancel', requestOptions)
            .then(response => response)
            .then(data => {
                alert('อัพเดตข้อมูลสำเร็จ');
                window.location.href = "/history";
            })
            .catch(error => {
                console.log(error)
                alert('มีข้อมูลบางอย่างไม่ถูกต้อง กรุณากรอกลองอีกครั้ง');
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
                                <span className='column-check'>Check-in: {moment(this.state.room.checkin).format('DD-MM-YYYY')}</span>
                                <span>to</span>
                                <span className='column-check'>Check-out: {moment(this.state.room.checkout).format('DD-MM-YYYY')}</span>
                                <br/>
                                <br/>
                                <div className='bg-text-summary-cancel'>{this.state.room.roomType}</div>
                                <div className='bg-text-summary-cancel'>ราคาห้อง {this.state.room.roomPrice} บาท</div>
                                <div className='bg-text-summary-cancel'>โค้ดส่วนลด {this.state.room.dcCode == null ? "None" : this.state.room.dcCode}</div>
                                <div className='bg-text-summary-cancel'>ใช้คะแนน {this.state.room.usePoint} คะแนน</div>
                            </div>
                        </div>
                        <div className='column-can'>
                            <div className='right-block'>                                 
                                <div className='comment-box'>
                                    <form className='comment-form' onSubmit={this.edit}>
                                        <label htmlFor="reason" className="column-check">Reason for cancellation</label>
                                        <textarea className='coms' type="text" name='reason' onChange={this.handleChange}/>
                                        <button className='cancel-button' type='submit'>CONFIRM CANCEL</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}