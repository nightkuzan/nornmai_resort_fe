import { Component } from "react";
import { Buffer } from 'buffer';
import moment from 'moment';
class ReservComponent extends Component {
  

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
