import React, { Component } from "react";
import { Buffer } from "buffer";
import EditRoom from "./EditRoom";
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
          // console.log(this.state.room);
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      });
  }

  readImage(img) {
    var buffer = new Buffer(img, "base64");
    console.log(buffer);
    return buffer;
  }

  clean(roomId) {
    if (window.confirm("clean room id : " + roomId)) {
      let raw = JSON.stringify({
        RoomID: roomId,
      });
      console.log(raw);
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: raw,
      };

      fetch("http://localhost:3001/room/clean", requestOptions)
        .then((response) => response)
        .then((data) => {
          window.location.href = "/room-admin";
        })
        .catch((error) => {
          console.error("There was an error!", error);
          alert("เกิดข้อผิดพลาด");
        });
    }
  }

  setRoomID(roomId) {
    localStorage.setItem("room-id", roomId);
  }

  deleteRoom(roomId) {
    if (window.confirm("delete room id : " + roomId)) {
      let raw = JSON.stringify({
        RoomID: roomId,
      });
      console.log(raw);
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: raw,
      };
      
      fetch("http://localhost:3001/room", requestOptions)
        .then((response) => response)
        .then((data) => {
          window.location.href = "/room-admin";
        })
        .catch((error) => {
          console.error("There was an error!", error);
          alert("เกิดข้อผิดพลาด");
        });
    }
  }


  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">ROOM</span>
          <hr />
        </div>
        <div>
          <a href="/create-room">
            <button className="btn btn-success">Create Room</button>
          </a>
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
                <th scope="col" style={{ textAlign: "center" }}>
                  Edit

                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.room.map((room, index) => (
                <tr key={index} style={{ verticalAlign: "middle" }}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{room.RoomID}</td>
                  <td style={{ textAlign: "center" }}>{room.RoomName}</td>
                  <td style={{ textAlign: "center" }}>{room.rStatus}</td>
                  <td style={{ textAlign: "center" }}>{room.rfloor}</td>
                  {room.rCleaning === "Y" ? (
                    <td style={{ textAlign: "center" }}>Cleaned</td>
                  ) : (
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={(e) => this.clean(room.RoomID)}
                        className="btn btn-success"
                      >
                        Not Clean
                      </button>
                    </td>
                  )}
                  <td style={{ textAlign: "center" }}>{room.rCapacity}</td>
                  <td style={{ textAlign: "center" }}>{room.rDefaultPrice}</td>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={this.readImage(room.rImage)}
                      alt="room"
                      style={{ width: "4vw" }}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>{room.rDescription}</td>
                  <td style={{ textAlign: "center" }}>{room.rRating}</td>
                  <td style={{ textAlign: "center" }}>
                  <a href={"/edit-room?/roomid="+room.RoomID}>
                    <button
                      onClick={(e) => this.setRoomID(room.RoomID)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                  </a>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={(e) => this.deleteRoom(room.RoomID)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
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
