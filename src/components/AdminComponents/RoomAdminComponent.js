import React, { Component } from "react";
// Got ทำ
//
//
//
//

export default class RoomAdminComponent extends Component {
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
          </table>
        </div>
      </div>
    );
  }
}
