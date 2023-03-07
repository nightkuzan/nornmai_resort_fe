import { Component } from "react";

import { Buffer } from "buffer";

import imageicon from "../../assets/icon-image-512.webp";

export default class CrudRoom extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      RoomID: "",
      RoomTypeName: "",
      RoomPrice: "",
      RoomFloor: "",
      RoomDescription: "",
      RoomImage: imageicon,
      RoomBed: "",
      RoomCapacity: "",
    };

    this.create = this.create.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentDidMount() {
    this.loginAdminStorage = JSON.parse(localStorage.getItem("login-admin"));
    if (
      this.loginAdminStorage == null ||
      this.loginAdminStorage.pName !== "Manager"
    )
      window.location.href = "/";
  }

  onImageChange(e) {
    // this.setState({ RoomImage: e.target.files[0] });
    // console.log(this.state.RoomImage);

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.addEventListener( "load", () => {
      this.setState({ RoomImage: reader.result });
      console.log(this.state.RoomImage);
    });
    reader.readAsDataURL(file);


  
    
  }

  create(e) {
    e.preventDefault();
    let raw = JSON.stringify({
      RoomID: this.state.RoomID,
      RoomTypeName: this.state.RoomTypeName,
      RoomPrice: this.state.RoomPrice,
      RoomFloor: this.state.RoomFloor,
      RoomDetail: this.state.RoomDetail,
      RoomImage: this.state.RoomImage,
      RoomBed: this.state.RoomBed,
      RoomCapacity: this.state.RoomCapacity,
      RoomDescription: this.state.RoomDescription,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };
    fetch("http://localhost:3001/room-admin/create", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("เพิ่มข้อมูลสำเร็จ");
        window.location.href = "/admin/room";
      });
    // .catch((error) => {
    //   console.error("There was an error!", error);
    //   alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    // });
  }

  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">Create Room</span>
          <hr />
        </div>
        {/* <div className="container"> */}
        {/* <div className="col-xl-6 col-lg-12"> */}
        <form onSubmit={this.create} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Room ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room ID: RMxxxx"
                  onChange={(e) => {
                    this.setState({ RoomID: e.target.value });
                  }}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Room Type</label>
                <select
                  className="form-control"
                  id="roomtype"
                  onChange={(e) => {
                    this.setState({ RoomTypeName: e.target.value });
                  }}
                  required
                >
                  <option value="0">Select Room Type</option>
                  <option value="Single">Single Room</option>
                  <option value="Standard">Standard Room</option>
                  <option value="Superior">Superior Room</option>
                  <option value="Presidentail">Presidentail Room</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Room Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Price"
                  onChange={(e) => {
                    this.setState({ RoomPrice: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Room Floor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Floor"
                  onChange={(e) => {
                    this.setState({ RoomFloor: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Room Bed </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Bed: ex. 1 King Bed"
                  onChange={(e) => {
                    this.setState({ RoomBed: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Room Capacity </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Room Capacity: ex. 2 "
                  onChange={(e) => {
                    this.setState({ RoomCapacity: e.target.value });
                  }}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Room Image</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={this.onImageChange}
                  required
                />
              </div>
              <img className="img-fluid preview" src={this.state.RoomImage} alt="preview room" style={{width:"300px",height:"auto"}} />
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Room Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Room Description"
                  onChange={(e) => {
                    this.setState({ RoomDescription: e.target.value });
                  }}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group" style={{ textAlign: "center" }}>
              <span style={{ color: "red" }}>{this.state.error}</span>
              <br />
              <button type="submit" className="btn btn-primary">
                Create
              </button>
              <br />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
