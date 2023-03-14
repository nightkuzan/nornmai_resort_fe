import { Component } from "react";
import moment from "moment";

export default class EditDiscount extends Component {
  state = {};
  constructor() {
    super();
    this.state = {
      dcCode: "",
      dcRate: "",
      dcStartDate: "",
      dcEndDate: "",
      dcAmount: "",
    };
    this.ondcCodeChange = this.ondcCodeChange.bind(this);
    this.ondcRateChange = this.ondcRateChange.bind(this);
    this.ondcStartDateChange = this.ondcStartDateChange.bind(this);
    this.ondcEndDateChange = this.ondcEndDateChange.bind(this);
    this.ondcAmountChange = this.ondcAmountChange.bind(this);
    this.submit = this.submit.bind(this);
    this.ondcRateChange = this.ondcRateChange.bind(this);
  }

  componentDidMount() {
    this.loginAdminStorage = JSON.parse(localStorage.getItem("login-admin"));
    if (
      this.loginAdminStorage == null ||
      this.loginAdminStorage.pName !== "Manager"
    )
      window.location.href = "/";
    let dcCode = localStorage.getItem("dcCode");
    let dcRate = localStorage.getItem("dcRate");
    let dcStartDate = localStorage.getItem("dcStartDate");
    let dcEndDate = localStorage.getItem("dcEndDate");
    let dcAmount = localStorage.getItem("dcAmount");

    // console.log(localStorage);
    // if (dcStartDate === null){
    //     // set to today using moment
    //     dcStartDate = moment().format("YYYY-MM-DD");
    // }
    // if (dcEndDate === null) {
    //     // set to today
    //     dcEndDate = moment().format("YYYY-MM-DD");
    // }
    // if (dcAmount === "null") {
    //   dcAmount = "-";
    // }
    // set date format to yyyy-mm-dd
    dcStartDate = moment(dcStartDate).format("YYYY-MM-DD");
    dcEndDate = moment(dcEndDate).format("YYYY-MM-DD");

    if (dcStartDate ==="1970-01-01"){
        // set to today using moment
        dcStartDate = "Invalid date";
        dcEndDate = "Invalid date";
    }


    this.setState({
      dcCode: dcCode,
      dcRate: dcRate,
      dcStartDate: dcStartDate,
      dcEndDate: dcEndDate,
      dcAmount: dcAmount,
    });

    

  }

  ondcCodeChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.setState({ "error": "" });
    // this.setState({ dcCode: value });
    // this.setState({ error: "" });
  }



  ondcRateChange(event) {
    this.setState({ dcRate: event.target.value });
  }
  ondcStartDateChange(event) {
    this.setState({ dcStartDate: event.target.value });
  }
  ondcEndDateChange(event) {
    this.setState({ dcEndDate: event.target.value });
  }
  ondcAmountChange(event) {
    this.setState({ dcAmount: event.target.value });
  }
  submit() {
    if(this.state.dcStartDate==="Invalid date"){
        // set to yyyy-mm-dd 1999-01-01
        this.setState({dcStartDate: "1999-01-01"});
    }
    if(this.state.dcEndDate==="Invalid date"){
        this.setState({dcEndDate: "2500-01-01"});
    }
    // alert for confirm
    if (window.confirm("ยืนยันการแก้ไขข้อมูล")) {
      let dcCode = this.state.dcCode;
      let dcRate = this.state.dcRate;
      let dcStartDate = this.state.dcStartDate;
      let dcEndDate = this.state.dcEndDate;
      let dcAmount = this.state.dcAmount;

        dcAmount = parseInt(dcAmount);

      let raw = JSON.stringify({
        dcCode: dcCode,
        dcRate: dcRate,
        dcStartDate: dcStartDate,
        dcEndDate: dcEndDate,
        dcAmount: dcAmount,
      });
      console.log(raw);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw,
      };
      fetch("http://localhost:3001/discount-info", requestOptions)
        .then((response) => response)
        .then((result) => {
          alert("แก้ไขข้อมูลสำเร็จ");
          window.location.href = "/discount";
        })

        .catch((error) => {
          console.error("There was an error!", error.toString());
          alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
          
        });
    } else {
      alert("ยกเลิกการแก้ไขข้อมูล");
      window.location.href = "/discount";
    }
  }

  render() {
    return (
      <div className="bg-div" style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="header-topic">
          <span className="header-reserve">EDIT DISCOUNT</span>
          <hr />
        </div>
        <form encType="multipart/form-data" onSubmit={this.submit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dcCode">DISCOUNT CODE</label>
                <input
                  type="text"
                  className="form-control"
                  id="dcCode"
                  name="dcCode"
                  value={this.state.dcCode}
                  // onChange={this.ondcCodeChange.bind(this)}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dcRate">DISCOUNT RATE</label>
      
                <input
                  type="number"
                  min="1"
                  max="100"
                  name="dcRate"
                  value={this.state.dcRate}
                  onChange={this.ondcRateChange}
                  className="form-control"
                  placeholder="DISCOUNT RATE *"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dcStartDate">DISCOUNT START DATE</label>
                <input
                  type="date"
                  className="form-control"
                  min={this.state.dcStartDate!== 'Invalid date'? this.state.dcStartDate: moment(new Date()).format("YYYY-MM-DD")}
                  max={this.state.dcEndDate}
                  id="dcStartDate"
                  name="dcStartDate"
                  value={this.state.dcStartDate}
                  onChange={this.ondcStartDateChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="dcEndDate">DISCOUNT END DATE</label>
                <input
                  type="date"
                  className="form-control"
                  id="dcEndDate"
                  min={this.state.dcStartDate}
                  max="2025-12-31"
                  name="dcEndDate"
                  value={this.state.dcEndDate}
                  onChange={this.ondcEndDateChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="dcAmount">DISCOUNT AMOUNT</label>
              <input
                type="number"
                className="form-control"
                id="dcAmount"
                name="dcAmount"
                value={this.state.dcAmount}
                onChange={this.ondcAmountChange.bind(this)}
                min="1"
              />
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
            >
              EDIT
            </button>
          </div>
        </form>
      </div>
    );
  }
}
