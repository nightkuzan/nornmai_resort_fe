import { Component } from "react";
import { Buffer } from 'buffer';
import moment from 'moment';
import "./css/reserve.css";
import userEvent from "@testing-library/user-event";

class ReservComponent extends Component {
  state = {}
  constructor(){
    super()
    this.state ={
      'room':[]
    };
  }
  componentDidMount() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('http://localhost:3001/room', requestOptions)
        .then(response => response.json())
        .then(data => {
            this.setState({ 'room': data });
            console.log(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        

}
  readImage(img){
    var buffer = new Buffer(img,'base64');
    return buffer
  }

  

  render() {
    return (
      <div className='row'>
        
          <div className='container'>
                <div className='header-reserv'>
                    <header>RESERVE</header>
                </div>
          </div>
        <div className="row abs">
          <div className="col-md-6">
            <div className="form-group">
        <div className="select-date">
          <div className="form-group">
            <label htmlFor="dob" className="control-label">Check-in</label>
            <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} className="form-control" />
            </div>
          </div>
  

          <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="dob" className="control-label">Check-out</label>
            <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} className="form-control" />
          </div>
          </div>
        </div>
        
        
        
        <div className="row">
          <div className="form-group" style={{ 'textAlign': 'center' }}>
          <br />
          <button type="submit" className="btn btn-primary">SEARCH</button>
          <br />
          </div>
        </div>

        <div>
          <div className="row">
            {this.state.room.map((room, index) => (
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12" key={index} style={{'marginBottom' : '20px'}}>
                <div className="card">
                  <div className="card-header">
                    <h4>{room.roomTypeName}</h4>
                    </div>
                      <div className="card-body">
                      <img src={this.readImage(room.image)} alt="room" style={{'width': '100%'}}/><br />
                      <span>{room.description}</span><br />
                      <span>จำนวนคนสูงสุดที่สามารถเข้าพักได้ {room.capacity} คน</span><br /><br />
                      <span>ราคาห้องพัก {room.price.toLocaleString()} บาท</span><br />
                    </div>
                  </div>
                </div>
              ))}
              </div>
              </div>
              <br />
              <br />
              <br />

        
        <button className="button-search">SEARCH</button>
        
      </div>
      </div>
      </div>
      
      
      
    );
  }
}

export default ReservComponent;
