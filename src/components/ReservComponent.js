import { Component } from "react";
import { Buffer } from "buffer";
import moment from "moment";

class ReservComponent extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      room: [],
      checkin: moment(new Date()).format("YYYY-MM-DD"),
      checkout: "",
      saveCheckin: "",
      saveCheckout: "",
      userId: "",
      memberType: "",
      min: moment(new Date()).format("YYYY-MM-DD"),
      rfloor: "all",
      rcapacity: "all",
      rprice: "all",
      rtype: "all",
    };
    // console.log(this.state.min)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.search = this.search.bind(this);
    this.handleChangeCapacity = this.handleChangeCapacity.bind(this);
    this.handleChangeFloor = this.handleChangeFloor.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  componentDidMount() {
    this.loginStorage = JSON.parse(localStorage.getItem("login"));
    this.setState({
      userId: (
        <span className="bg-text-user">
          User ID : {this.showUserId(this.loginStorage.ctUserId)}
        </span>
      ),
    });
    this.setState({
      memberType: (
        <span className="bg-text-user">
          Member Type : {this.loginStorage.mbTypeName}
        </span>
      ),
    });
  }

  search(e) {
    e.preventDefault();
    this.setState({ saveCheckin: this.state.checkin });
    this.setState({ saveCheckout: this.state.checkout });

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      "http://localhost:3001/reserve?checkin=" +
        this.state.checkin +
        "&checkout=" +
        this.state.checkout +
        "&rfloor=" +
        this.state.rfloor +
        "&rcapacity=" +
        this.state.rcapacity +
        "&rprice=" +
        this.state.rprice +
        "&rtype=" +
        this.state.rtype,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ room: data });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("ไม่มีห้อง");
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ error: "" });
  }

  handleChangeDate(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ checkout: value });
    this.setState({ error: "" });
  }

  handleChangeFloor(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ rfloor: value });
    this.setState({ error: "" });
  }

  handleChangeCapacity(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ rcapacity: value });
  }

  handleChangePrice(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ rprice: value });
  }

  handleChangeType(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ rtype: value });
  }

  readImage(img) {
    var buffer = new Buffer(img, "base64");
    return buffer;
  }
  showUserId(id) {
    let user = "CT";
    for (let index = 0; index < 5 - id.toString().length; index++) {
      user += "0";
    }
    user += id;
    return user;
  }

  render() {
    return (
      <div
        className="bg-div"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <div className="header-topic">
          <span>RESERVE</span>
          <hr />
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.userId}
            {this.state.memberType}
          </div>
        </div>
        <br />
        <div>
          <form onSubmit={this.search}>
            <div className="row">
              <div className="col-3">
                <label htmlFor="check">Floor</label>
                <select
                  className="form-control"
                  name="rfloor"
                  onChange={this.handleChangeFloor}
                >
                  <option value="all">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="check">Capacity</label>
                <select
                  className="form-control"
                  name="rcapacity"
                  onChange={this.handleChangeCapacity}
                >
                  <option value="">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="check">Room Type</label>
                <select
                  className="form-control"
                  name="rtype"
                  onChange={this.handleChangeType}
                >
                  <option value="">All</option>
                  <option value="Single">Single Room</option>
                  <option value="Standard">Standard Room</option>
                  <option value="Superior">Superior Room</option>
                  <option value="Presidential">Presidential Room</option>
                </select>
              </div>
              <div className="col-3">
                <label htmlFor="check">Price</label>
                <select
                  className="form-control"
                  name="rprice"
                  onChange={this.handleChangePrice}
                >
                  <option value="">All</option>
                  <option value="0-1000">0-1000</option>
                  <option value="1000-2000">1000-2000</option>
                  <option value="2000-3000">2000-3000</option>
                  <option value="3000-4000">3000-4000</option>
                  <option value="4000-5000">4000-5000</option>
                  <option value="5000-6000">5000-6000</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <span>Check-in</span>
                <input
                  type="date"
                  name="checkin"
                  min={this.state.min}
                  max="2025-12-31"
                  value={this.state.checkin}
                  onChange={this.handleChangeDate}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-6">
                <span>Check-out</span>
                <input
                  type="date"
                  name="checkout"
                  min={this.state.checkin}
                  max="2025-12-31"
                  value={this.state.checkout}
                  onChange={this.handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div style={{ width: "100%", textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className="row" style={{ marginTop: "30px" }}>
            {this.state.room.map((room, index) => (
              <div
                className="col-xl-3 col-lg-6 col-md-6 col-sm-12"
                key={index}
                style={{ marginBottom: "20px" }}
              >
                <div className="card card-reserve">
                  <div className="card-header card-header-reserve">
                    <h4>{room.roomTypeName}</h4>
                  </div>
                  <div className="card-body">
                    <img
                      src={this.readImage(room.image)}
                      alt="room"
                      style={{ width: "100%" }}
                    />
                    <br />
                    <span className="bg-text-reserve">{room.description}</span>
                    <span className="bg-text-reserve">
                      จำนวนคนสูงสุดที่สามารถเข้าพักได้ {room.capacity} คน
                    </span>
                    <span className="bg-text-reserve">
                      จำนวนห้องพักคงเหลือ {room.freeRoom} ห้อง
                    </span>
                    <br />
                    <span className="bg-text-reserve">
                      ราคาห้องพัก {room.price.toLocaleString()} บาท
                    </span>
                    <br />
                    {room.freeRoom > 0 ? (
                      <a
                        href={
                          "/reserve-room?roomType=" +
                          room.roomTypeID +
                          "&checkin=" +
                          this.state.saveCheckin +
                          "&checkout=" +
                          this.state.checkout
                        }
                      >
                        <button
                          className="btn btn-primary"
                          style={{ width: "100%" }}
                        >
                          Reserve this room
                        </button>
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ReservComponent;
