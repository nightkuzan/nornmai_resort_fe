import React, { Component } from 'react'

export default class AdminAllBooking extends Component{
    render(){
        return(
            <div className='container'>
                <div className='header-his'>
                    <header>ALL BOOKING</header>
                </div>
                <br/>
                <table className="table">   
                    <thead>                
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size' >
                                Customer ID
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Customer Name
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Booking ID
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Room Type
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Check-in
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Check-out
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Discount Code
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Point Use
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Total Price
                            </th>                
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Get Point
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Total Price
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Check-in
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Check-out
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Reason Cancel
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Status
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Review
                            </th>
                            <th scope="col" style={{ textAlign: "center" }} className='t-size'>
                                Score
                            </th>
                        </tr>
                    </thead>               
                </table>
            </div>
        )
    }
}
