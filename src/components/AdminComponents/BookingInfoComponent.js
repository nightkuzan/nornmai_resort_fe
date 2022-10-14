import React, { Component } from "react";
import moment from "moment";
export default class BookingInfoComponent extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      booking: [],
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
    fetch("http://localhost:3001/payment", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ booking: data }, function () {
          console.log(this.state.booking);
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
      });
  }

  showUserId(id) {
    let user = "CT";
    for (let index = 0; index < 5 - id.toString().length; index++) {
      user += "0";
    }
    user += id;
    return user;
  }

  showBookingId(id) {
    let user = "B";
    for (let index = 0; index < 6 - id.toString().length; index++) {
      user += "0";
    }
    user += id;
    return user;
  }

  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">BOOKING INFO</span>
          <hr />
        </div>
        <div></div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Customer ID
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Customer Name
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Booking ID
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Room Type
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  B-Check-in
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  B-Check-out
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Discount Code
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Point Use
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Total Price
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Get Point
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Check-in
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Check-out
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Status
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  PAID
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.booking.map((booking, index) => (
                <tr key={index} style={{ verticalAlign: "middle" }}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{this.showUserId(booking.cid)}</td>
                  <td style={{ textAlign: "center" }}>
                    {booking.fname + " " + booking.lname}
                  </td>
                  <td style={{ textAlign: "center" }}>{this.showBookingId(booking.bookid)}</td>
                  <td style={{ textAlign: "center" }}>{booking.rtname}</td>
                  <td style={{ textAlign: "center" }}>
                    {moment(booking.bcheckin).format("DD-MM-YYYY")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {moment(booking.bcheckout).format("DD-MM-YYYY")}
                  </td>
                  <td style={{ textAlign: "center" }}>{booking.discount}</td>
                  <td style={{ textAlign: "center" }}>{booking.pdiscount}</td>
                  <td style={{ textAlign: "center" }}>{booking.totalprice}</td>
                  <td style={{ textAlign: "center" }}>{booking.getpoint}</td>
                  <td style={{ textAlign: "center" }}>
                    {booking.checkin !== null
                      ? moment(booking.checkin).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {booking.checkout !== null
                      ? moment(booking.checkout).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>{booking.bkstatus}</td>
                  <td>
                    {booking.bkstatus !== "FULLY PAID" ? (
                      <a href={"/payment-update?bookingid=" + booking.bookid}>
                        <button className="btn btn-success">UPDATE</button>
                      </a>
                    ) : (
                      "-"
                    )}
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
