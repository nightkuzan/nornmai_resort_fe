import { Component } from "react";
import { Buffer } from "buffer";

export default class EditRoom extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      room: "",
    };
  }

  componentDidMount() {
    this.loginAdminStorage = JSON.parse(localStorage.getItem("login-admin"));
    if (
      this.loginAdminStorage == null ||
      this.loginAdminStorage.pName !== "Manager"
    )
      window.location.href = "/";
    let roomId = localStorage.getItem("room-id");
    const params = new URLSearchParams({ roomId: roomId });
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:3001/room-admin/roomid?" + params.toString(),
      requestOptions
    )
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
    var buffer = new Buffer(img, "base64");
    return buffer;
  }

  onImageChange(e) {
    this.setState({ rImage: e.target.files[0] });
    console.log(this.state.rImage);
  }

  editRoom() {
    let raw = JSON.stringify({
      RoomID: this.state.RoomID,
      RoomTypeName: this.state.RoomTypeName,
      RoomStatus: this.state.RoomStatus,
      RoomPrice: this.state.RoomPrice,
      RoomFloor: this.state.RoomFloor,
      RoomDetail: this.state.RoomDetail,
    });
    console.log(raw);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };
    fetch("http://localhost:3001/room-admin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("แก้ไขข้อมูลเรียบร้อย");
        window.location.href = "/admin/room";
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      });
  }



  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">EDIT ROOM</span>
          <hr />
        </div>
        <div>
          {this.state.room !== "" ? (
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <label>Room Image</label>
                <input type="file" className="form-control"  accept="image/*" onChange={this.onImageChange}/>
                <img
                src={this.readImage(this.state.room[0].rImage)}
                className="img-fluid"
                alt="room"
                style={{ width: "100%" }}
              />
              {/* {this.state.rImage ? (
                <img
                  src={URL.createObjectURL(this.state.rImage)}
                    className="img-fluid"   
                    alt="room"
                    style={{ width: "100%" }}
                />
                ) : ''} */}
              </div>
            
         
              <div className="col-xl-6 col-lg-12">
                <div className="row">
                  <div className="col-12">
                    <form>
                      <div className="form-group">
                        <label>Room ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room ID"
                          defaultValue={this.state.room[0].RoomID}
                          onChange={(e) => {
                            this.setState({ RoomID: e.target.value });
                          }}
                        />
                        <label>Room Type</label>
                        <select
                          className="form-control"
                          id="roomtype"
                          defaultValue={this.state.room[0].RoomTypeName}
                          onChange={(e) => {
                            this.setState({ RoomTypeName: e.target.value });
                          }}
                        >
                          {this.state.room[0].RoomTypeName === "Single Room" ? (
                            <>
                              <option value="Single" selected>
                                Single Room
                              </option>
                              <option value="Standard">Standard Room</option>
                              <option value="Superior">Superior Room</option>
                              <option value="Presidentail">
                                Presidentail Room
                              </option>
                            </>
                          ) : this.state.room[0].RoomTypeName ===
                            "Standard Room" ? (
                            <>
                              <option value="Standard" selected>
                                Standard Room
                              </option>
                              <option value="Single">Single Room</option>
                              <option value="Superior">Superior Room</option>
                              <option value="Presidentail">
                                Presidentail Room
                              </option>
                            </>
                          ) : this.state.room[0].RoomTypeName ===
                            "Superior Room" ? (
                            <>
                              <option value="Superior" selected>
                                Superior Room
                              </option>
                              <option value="Single">Single Room</option>
                              <option value="Standard">Standard Room</option>
                              <option value="Presidentail">
                                Presidentail Room
                              </option>
                            </>
                          ) : this.state.room[0].RoomTypeName ===
                            "Presidentail Room" ? (
                            <>
                              <option value="Presidentail" selected>
                                Presidentail Room
                              </option>
                              <option value="Single">Single Room</option>
                              <option value="Standard">Standard Room</option>
                              <option value="Superior">Superior Room</option>
                            </>
                          ) : (
                            ""
                          )}
                        </select>
                        <label>Room Floor</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Floor"
                          defaultValue={this.state.room[0].rfloor}
                          onChange={(e) => {
                            this.setState({ rfloor: e.target.value });
                          }}
                        />

                        <label>Room Capacity</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Capacity"
                          defaultValue={this.state.room[0].rCapacity}
                          onChange={(e) => {
                            this.setState({ rCapacity: e.target.value });
                          }}
                        />

                        <label>Room Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Room Description"
                          defaultValue={this.state.room[0].rDescription}
                          onChange={(e) => {
                            this.setState({ rDescription: e.target.value });
                          }}
                        ></textarea>

                        <label>Room Bed</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Bed"
                          defaultValue={this.state.room[0].rNumBed}
                          onChange={(e) => {
                            this.setState({ rNumBed: e.target.value });
                          }}
                        />

                        <label>Room Price</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Price"
                          defaultValue={this.state.room[0].rDefaultPrice}
                          onChange={(e) => {
                            this.setState({ RoomPrice: e.target.value });
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          this.editRoom();
                        }}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
