import React, { Component } from "react";

export default class BookingInfoComponent extends Component {
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
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
}
