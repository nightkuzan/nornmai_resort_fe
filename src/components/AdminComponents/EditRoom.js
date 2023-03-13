import { Component } from "react";
import { Buffer } from "buffer";

export default class EditRoom extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      // room: "",
      RoomID: "",
      RoomTypeName: "",
      rCapacity: "",
      rCleaningState: "",
      rDefaultPrice: "",
      rDescription: "",
      rImage:"",
      rNumBed: "",
      rRating: "",
      rSize:"",
      rStatus: "",
      rfloor: "",
      RoomTypeID: "",
    };
    this.readImage = this.readImage.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.editRoom = this.editRoom.bind(this);
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
          this.setState({
            RoomID: data[0].RoomID,
            RoomTypeName: data[0].RoomTypeName,
            rCapacity: data[0].rCapacity,
            rCleaningState: data[0].rCleaningState,
            rDefaultPrice: data[0].rDefaultPrice,
            rDescription: data[0].rDescription,
            rImage: this.readImage(data[0].rImage),
            rNumBed: data[0].rNumBed,
            rRating: data[0].rRating,
            rSize: data[0].rSize,
            rStatus: data[0].rStatus,
            rfloor: data[0].rfloor,
            rDefaultRoomID: data[0].RoomID,
            RoomTypeID: data[0].RoomTypeID,
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
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({ rImage: reader.result });
      console.log(this.state.rImage);
    });
    reader.readAsDataURL(file);

  }

  editRoom() {
    console.log(this.state.RoomTypeID);
    console.log(this.state.rDefaultPrice);
    let raw = JSON.stringify({
      "RoomID": this.state.RoomID,
      // "RoomTypeName": this.state.RoomTypeName,
      "rCapacity": this.state.rCapacity,
      "rCleaningState": this.state.rCleaningState,
      "rDefaultPrice": this.state.rDefaultPrice,
      "rDescription": this.state.rDescription,
      "rImage": this.state.rImage,
      "rNumBed": this.state.rNumBed,
      "rRating": this.state.rRating,
      "rSize": this.state.rSize,
      "rStatus": this.state.rStatus,
      "rfloor": this.state.rfloor,
      "rDefaultRoomID": this.state.rDefaultRoomID,
      "RoomTypeID": this.state.RoomTypeID,
      "rPrice": this.state.RoomPrice,
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };
    fetch("http://localhost:3001/room-admin/edit", requestOptions)
      .then((response) => response)
      .then((data) => {
        console.log(data);
        alert("แก้ไขข้อมูลเรียบร้อย");
        window.location.href = "/room-admin";
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
        <form encType="multipart/form-data">

        <div>
          {this.state.room !== "" ? (
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <label>Room Image</label>
                <input 
                type="file" 
                className="form-control"
                accept="image/*" 
                onChange={this.onImageChange} 
                />
                <img
                  src={(this.state.rImage)}
                  className="img-fluid preview"
                  alt="room preview"
                  style={{ width: "100%" }}
                />
              </div>


              <div className="col-xl-6 col-lg-12">
                <div className="row">
                  <div className="col-12">
                      <div className="form-group">
                        <label>Room ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room ID"
                          defaultValue={this.state.RoomID}
                          onChange={(e) => {
                            this.setState({ RoomID: e.target.value });
                          }}
                        />
                        <label>Room Type</label>
                        {/* select of room type */}
                        <select
                          className="form-control"
                          value={this.state.RoomTypeName}
                          // placeholder={this.state.RoomTypeName}
                          onChange={(e) => {
                            this.setState({ RoomTypeID: e.target.value.split("-")[0] ,
                            RoomTypeName: e.target.value.split("-")[1]+" Room"});
                          }}
                        >
                          <option value={this.state.RoomTypeID}>{this.state.RoomTypeName}</option>
                          <option value="R00001-Single">Single Room</option>
                           <option value="R00002-Standard">Standard Room</option>
                              <option value="R00003-Superior">Superior Room</option>
                              <option value="R00004-Presidentail">
                                Presidentail Room
                              </option>
                        </select>
                        <label>Room Floor</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Floor"
                          defaultValue={this.state.rfloor}
                          onChange={(e) => {
                            this.setState({ rfloor: e.target.value });
                          }}
                        />

                        <label>Room Capacity</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Capacity"
                          defaultValue={this.state.rCapacity}
                          onChange={(e) => {
                            this.setState({ rCapacity: e.target.value });
                          }}
                        />

                        <label>Room Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Room Description"
                          defaultValue={this.state.rDescription}
                          onChange={(e) => {
                            this.setState({ rDescription: e.target.value });
                          }}
                        ></textarea>

                        <label>Room Bed</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Bed"
                          defaultValue={this.state.rNumBed}
                          onChange={(e) => {
                            this.setState({ rNumBed: e.target.value });
                          }}
                        />

                        <label>Room Price</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Room Price"
                          defaultValue={this.state.rDefaultPrice}
                          onChange={(e) => {
                            this.setState({ RoomPrice: e.target.value });
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.editRoom}
                      >
                        Save
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        </form>
      </div>
    );
  }
}
