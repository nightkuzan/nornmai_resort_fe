import { Component } from "react";
import { Buffer } from 'buffer';
import moment from 'moment';
import "./css/reserve.css";

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
    fetch('http://localhost:3001/reserve', requestOptions)
        .then(response => response.json())
        .then(data => {
          this.setState({ 'room':data })
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
      <div className="row">
        {/* {this.state.room.map((room,index)=>(
          <div className="x" key={index}>
          <img src={this.readImage(room.image)} alt="room"/>
          </div>
        ))} */}
        
          <div className='header-reserve'>
              <header>RESERVE</header>
          </div>
        
        <div className="select-date">
          <div className="form-group">
            <label htmlFor="dob" className="control-label">Check-in</label>
            <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} className="form-control" />
            <label htmlFor="dob" className="control-label">Check-out</label>
            <input type="date" name="dob" value={this.state.dob} onChange={this.handleChange} className="form-control" />
          </div>
        </div>
        <div className="asdf"></div>
        <buttom className="button-search">SEARCH</buttom>
        
      </div>
      
    );
  }
}

export default ReservComponent;
