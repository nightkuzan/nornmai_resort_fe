import { Component } from 'react'
import "./css/reservebooking.css";


class ReservbookingComponent extends Component {
    constructor(){
        super();
        this.state ={
            ctUserID: '',
            mbTypeID: '',
            ctPoint: 0,
        };
    }
    render() {
        return(
            <div className="container">
               <div>
                <header>Reserve Deluxe Room</header>
               </div>
               <div className='userDetail'>
                    <div className='row1'>
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                    <div className='row2'>
                       <p1>โปรโมชั่น</p1>
                        <input type="submit" value="GETDISCOUNT"></input>
                        <p1>ใช้คะแนนเป็นส่วนลด10คะแนน = 1 บาท</p1>
                        <input type="submit" value="๊USEPOINT"></input>
                    </div>
                    <div className='row3'>
                        <header>SUMMARY</header>
                    </div>
               </div>
               
            </div>
        )
    }
}

export default ReservbookingComponent