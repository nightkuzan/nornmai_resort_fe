import React, { Component } from 'react'
import "./css/review.css"
import "./css/cancel.css"

export default class ReviewComponent extends Component {
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

  render() {
    return (
        <div className='container'>
        <div className='header-his'>
            <header>REVIEW</header>
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
        <div className='layout-review'>
            <div className='row-can'>
                <div className='column-can'>
                    <div className='left-block'>
                        <span className='column-check'>Check-in: 27-07-2022</span>
                        <span>to</span>
                        <span className='column-check'>Check-out: 28-07-2022</span>
                        <br/>
                        <br/>
                        <div className='bg-text-summary-room'>Room type name</div>
                        <div className='bg-text-summary-cancel'>ราคาห้อง</div>
                        <div className='bg-text-summary-cancel'>โค๊ดส่วนลด</div>
                        <div className='bg-text-summary-cancel'>ใช้คะแนน</div>
                    </div>
                </div>
                <div className='column-can'>
                    <div className='right-block'>
                        <div className='column-check'>Review</div>
                        <br/>
                        <div className='comment-box'>
                            <form className='comment-form'>
                                <textarea className='coms-review' type="text"/>
                            </form>
                            <div className='rev'>Rating :</div>
                            <span>
                                <div className='rate'>
                                    <input type="radio" id="star5" name="rate" value="5" />
                                    <label for="star5" title="text">5 stars</label>
                                    <input type="radio" id="star4" name="rate" value="4" />
                                    <label for="star4" title="text">4 stars</label>
                                    <input type="radio" id="star3" name="rate" value="3" />
                                    <label for="star3" title="text">3 stars</label>
                                    <input type="radio" id="star2" name="rate" value="2" />
                                    <label for="star2" title="text">2 stars</label>
                                    <input type="radio" id="star1" name="rate" value="1" />
                                    <label for="star1" title="text">1 star</label>
                                </div>
                            </span>
                            <button className='review-button'>REVIEW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>           
    </div>
    )
  }
}
