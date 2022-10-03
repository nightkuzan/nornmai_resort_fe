import React, { Component } from 'react'
import "./css/cancel.css"

export default class CancelComponent extends Component{
    state = {}
    constructor(){
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0
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
                        <span className='column-cancel'>Booking ID :</span>
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
                                <span className='column-check'>Check-in: 27-07-2022</span>
                                <span>to</span>
                                <span className='column-check'>Check-out: 28-07-2022</span>
                                <br/>
                                <br/>
                                <div className='bg-text-summary-cancel'>1</div>
                                <div className='bg-text-summary-cancel'>2</div>
                                <div className='bg-text-summary-cancel'>3</div>
                                <div className='bg-text-summary-cancel'>4</div>
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
                                    <button className='cancel-button'>CONFIRM CANCEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>           
            </div>
        )
    }
}