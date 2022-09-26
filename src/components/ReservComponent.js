import { Component } from "react";
import { Buffer } from 'buffer';

class ReservComponent extends Component {
  // state = {}
  // constructor(){
  //   super();
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const roomType = queryParams.get('roomType') != null ? queryParams.get('roomType') : "";
  //   const checkin = queryParams.get('checkin')!= null ? queryParams.get('checkin') : "";
  //   const checkout = queryParams.get('checkout')!= null ? queryParams.get('checkout') : "";;    
  //   this.state = {
  //     "room": '',
  //     "user": {},
  //     "roomType": roomType,
  //     "checkin": checkin,
  //     "checkout": checkout,
  //     "dcCode": '',
  //     "saveDcCode": '',
  //     "dcCodePrice": 0,
  //     "dcRate": 0,
  //     "point": 0,
  //     "dcPoint": 0,
  //     "saveDcPoint": 0,
  //     "dcPointPrice": 0,
  //     "sumPrice": 0,
  //     "date" : 0
  //   }
  //   this.handleChange = this.handleChange.bind(this);
  //   this.getdiscount = this.getdiscount.bind(this);
  //   this.usepoint = this.usepoint.bind(this);
  //   this.reserveroom = this.reserveroom.bind(this);

  // }


  render() {
    return (
      <div className="container">
        <h1>Reserve</h1>
        <div className="form-group">
          <label htmlFor="dob" className="control-label">
            check-in
          </label>
          <input type="date" name="dob" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="dob" className="control-label">
            check-out
          </label>
          <input type="date" name="dob" className="form-control" />
        </div>
        <button>search</button>
      </div>
    );
  }
}

export default ReservComponent;
