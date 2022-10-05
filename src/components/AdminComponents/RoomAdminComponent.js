import React, { Component } from "react";
import { Buffer } from 'buffer';
// Got ทำ
//
//
//
//

export default class RoomAdminComponent extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      room: [],
    };
  }

  componentDidMount() {
    this.loginAdminStorage = JSON.parse(localStorage.getItem("login-admin"));
    if (
      this.loginAdminStorage == null ||
      this.loginAdminStorage.pName !== "Manager"
    )
      window.location.href = "/";

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:3001/room-admin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ room: data }, function () {
          console.log(this.state.room);
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      });
  }

  readImage(img) {
    var buffer = new Buffer(img, 'base64');
    return buffer;
  }
  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">ROOM</span>
          <hr />
        </div>

        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Room ID
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Room Name
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Status
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Floor
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Clean Status
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Capacity
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Price
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Image
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Description
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.room.map((room, index) => (
                <tr key={index} style={{ verticalAlign: "middle" }}>
                  <td>{index}</td>
                  <td style={{ textAlign: "center" }}>{room.RoomID}</td>
                  <td style={{ textAlign: "center" }}>{room.RoomName}</td>
                  <td style={{ textAlign: "center" }}>{room.rStatus}</td>
                  <td style={{ textAlign: "center" }}>{room.rfloor}</td>
                  {room.rCleaning == "Y" ? (<td style={{ textAlign: "center" }}>Cleaned</td> ): (<td style={{ textAlign: "center" }}><button className="btn btn-success">Not Clean</button></td>)}
                  <td style={{ textAlign: "center" }}>{room.rCapacity}</td>
                  <td style={{ textAlign: "center" }}>{room.rDefaultPrice}</td>
                  <td style={{ textAlign: "center" }}><img src={this.readImage(room.rImage)} alt="room" style={{ 'width': '4vw' }} /></td>
                  <td style={{ textAlign: "center" }}>{room.rDescription}</td>
                  <td style={{ textAlign: "center" }}>{room.rRating}</td>
                  <td style={{ textAlign: "center" }}>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
