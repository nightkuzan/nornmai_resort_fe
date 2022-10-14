import React, { Component } from "react";
import moment from "moment";
import { Buffer } from "buffer";

export default class PaymentUpdateComponent extends Component {
  state = {};
  constructor() {
    super();
    const queryParams = new URLSearchParams(window.location.search);
    const bookingid =
      queryParams.get("bookingid") != null ? queryParams.get("bookingid") : "";
    this.state = {
      booking: {},
      bookingid: bookingid,
      status: "",
      statusList: ["NOT PAID", "DEPOSIT PAID", "FULLY PAID"],
      min: moment(new Date()).format("YYYY-MM-DD"),
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
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

    fetch(
      "http://localhost:3001/payment-update?bookingid=" + this.state.bookingid,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ booking: data }, function () {
          console.log(this.state.booking);
        });
        this.setState({ image: this.readImage(data.image) }, function () {
          console.log(this.state);
        });
        this.setState({ status: data.status });
        if(data.status === "DEPOSIT PAID") {
            this.setState({ statusList : ["DEPOSIT PAID", "FULLY PAID"]})
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      });
  }

  readImage(img) {
    console.log(img);
    var buffer = new Buffer(img, "base64");
    return buffer;
  }

  showBookingId(id) {
    let user = "B";
    for (let index = 0; index < 6 - id.toString().length; index++) {
      user += "0";
    }
    user += id;
    return user;
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ error: "" });
    console.log(this.state);
  }

  update(e) {
    e.preventDefault();
    // let login = JSON.parse(localStorage.getItem("login-admin"));
    let raw = JSON.stringify({
      bkStatus: this.state.status,
      bookingid: this.state.bookingid,
    });
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: raw,
    };

    fetch("http://localhost:3001/payment/update", requestOptions)
      .then((response) => response)
      .then((data) => {
        alert("อัพเดตข้อมูลสำเร็จ");
        console.log(raw);
        window.location.href = "/payment";
      })
      .catch((error) => {
        console.log(error);
        alert("มีข้อมูลบางอย่างไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง");
      });
  }

  render() {
    return (
      <div
        className="bg-div"
        style={{ paddingLeft: "10%", paddingRight: "10%" }}
      >
        <div className="header-topic">
          <span className="header-reserve">PAYMENT</span>
          <hr />
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body" style={{ width: "100%" }}>
              <div className="row">
                <span className="bg-text-info-2">
                  BOOKING ID : {this.showBookingId(this.state.bookingid)}
                </span>
              </div>
              <div className="row">
                <span className="bg-text-info">
                  Check-in :{" "}
                  {moment(this.state.booking.bcheckin).format("DD-MM-YYYY")}{" "}
                </span>
                <span
                  className="bg-text-info"
                  style={{ backgroundColor: "transparent" }}
                >
                  to{" "}
                </span>
                <span className="bg-text-info">
                  {" "}
                  Check-out :{" "}
                  {moment(this.state.booking.bcheckout).format("DD-MM-YYYY")}
                </span>
              </div>
              <br />
              {this.state.book !== "" || this.state.book != null ? (
                <div className="row">
                  <div className="col-xl-6 col-lg-12">
                    <img
                      src={this.state.image}
                      alt="room"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-xl-6 col-lg-12">
                    <div
                      className="bg-text-summary-cancel"
                      style={{ fontSize: "100%", width: "100%" }}
                    >
                      <span>PRICE:</span>
                      <span>&nbsp;</span>
                      <span>{this.state.booking.price + " BAHT"}</span>
                    </div>
                    <div
                      className="bg-text-summary-cancel"
                      style={{ fontSize: "100%" }}
                    >
                      <span>DEPOSIT:</span>
                      <span>&nbsp;</span>
                      <span>{this.state.booking.price / 2 + " BAHT"}</span>
                    </div>
                    <div
                      className="bg-text-summary-cancel"
                      style={{ fontSize: "100%" }}
                    >
                      <span>STATUS:</span>
                      <span>&nbsp;</span>
                      <span>{this.state.booking.status}</span>
                    </div>
                    <br />
                    <form onSubmit={this.update}>
                      <span>PAYMENT STATUS:</span>
                      <select
                        className="form-select"
                        name="status"
                        value={this.state.status}
                        onChange={this.handleChange}
                      >
                        {this.state.statusList.map((stat, index) => (
                          <option value={stat} key={index}>
                            {stat}
                          </option>
                        ))}
                      </select>
                      <span>PAYMENT DATE:</span>
                      <input
                        type="date"
                        name="date"
                        min={this.state.min}
                        max="2025-12-31"
                        value={this.state.date}
                        onChange={this.handleChange}
                        className="form-control"
                        required
                      />
                      <br />
                      <button
                        type="submit"
                        style={{ marginTop: "10px" }}
                        className="btn btn-success form-control"
                      >
                        ACCEPT
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
