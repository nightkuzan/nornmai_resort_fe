import React, { Component } from 'react';
import "./css/history.css";

export default class HistoryComponent extends Component{
    render(){
        return(
            <div className='container'>
                <div className='header-his'>
                    <header>HISTORY</header>
                </div>
                <hr className='hr-line'></hr>
                <div className='ht-info'>
                    <div className='column-g'>User ID : </div>
                    <div className='column-g'>Member Type : </div>
                    <div className='column-g'>Member Point : </div>
                </div>
            </div>
        )
    }
}