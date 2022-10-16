import { Component } from "react"
import { Buffer } from 'buffer';

class ReservbookingCompenent extends Component {
    state = {}
    constructor() {
        super();
        const queryParams = new URLSearchParams(window.location.search);
        const roomType = queryParams.get("roomType") != null ? queryParams.get("roomType") : '';
        const checkin = queryParams.get("checkin") != null ? queryParams.get("checkin") : '';
        const checkout = queryParams.get("checkout") != null ? queryParams.get("checkout") : '';
        this.state = {
            "room": '',
            "user": {},
            "roomType": roomType,
            "checkin": checkin,
            "checkout": checkout,
            "dcCode": '',
            "saveDcCode": '',
            "dcCodePrice": 0,
            "dcRate": 0,
            "point": 0,
            "dcPoint": 0,
            "saveDcPoint": 0,
            "dcPointPrice": 0,
            "sumPrice": 0,
            "date" : 0,
            "image": '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.getdiscount = this.getdiscount.bind(this);
        this.usepoint = this.usepoint.bind(this);
        this.reserveroom = this.reserveroom.bind(this);
    }

    componentDidMount() {
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        this.setState({ 'userId': <span className="bg-text-user">User ID : {this.showUserId(this.loginStorage.ctUserId)}</span> });
        this.setState({ 'memberType': <span className="bg-text-user">Member Type : {this.loginStorage.mbTypeName}</span> })
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        var from = new Date(this.state.checkin);
        var to = new Date(this.state.checkout); 
        let date = 0;
        for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
            date++;
        }
        this.setState({ 'date': date });

        fetch('http://localhost:3001/reserve-room?checkin=' + this.state.checkin + '&checkout=' + this.state.checkout + '&type=' + this.state.roomType, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'room': data });
                this.setState({ 'sumPrice': data.price*date });
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
            });

        fetch('http://localhost:3001/user-point?userid=' + this.loginStorage.ctUserId, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'point': data.ctPoint });
                this.setState({ 'memberPoint': <span className="bg-text-user">Member Point : {data.ctPoint}</span> })
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
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

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    readImage(img) {
        var buffer = new Buffer(img, 'base64');
        return buffer;
    }

    getdiscount(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch('http://localhost:3001/discount?dcCode=' + this.state.dcCode, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'dcRate': data.dcRate });
                this.setState({ 'saveDcCode': this.state.dcCode })
                this.setState({ 'dcCodePrice' : this.state.sumPrice*data.dcRate/100 });
            })
            .catch(error => {
                alert('ไม่พบรหัสส่วนลด');
                this.setState({ 'dcCode': '' });
                this.setState({ 'dcRate': 0 });
                this.setState({ 'saveDcCode': '' })
                this.setState({ 'dcCodePrice' : 0 });
            });
    }

    usepoint(e) {
        e.preventDefault();
        this.setState({  "saveDcPoint": this.state.dcPoint,
        "dcPointPrice": this.state.dcPoint/10 });
    }

    reserveroom(e) {
        e.preventDefault();
        this.loginStorage = JSON.parse(localStorage.getItem('login'));
        let raw = JSON.stringify({
            "checkin" : this.state.checkin,
            "checkout" : this.state.checkout,
            "userid" : this.loginStorage.ctUserId,
            "numPeople" : this.state.room.capacity,
            "pointDiscount" : this.state.saveDcPoint,
            "totalPrice" : this.state.sumPrice - this.state.dcCodePrice - this.state.dcPointPrice,
            "dcCode" : this.state.saveDcCode !== '' ? this.state.saveDcCode : 'NONE',
            "roomType" : this.state.room.roomTypeID
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/reserve', requestOptions)
            .then(response => response)
            .then(data => {
                alert('จองห้องพักสำเร็จ');
                window.location.href = "/history";
            })
            .catch(error => {
                alert('มีข้อมูลบางอย่างไม่ถูกต้อง กรุณาทำการจองใหม่อีกครั้ง');
                window.location.href = "/reserve";
            });
    }
    uploadImage(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {
            response.json().then((body) => {
                this.setState({ 'image': body.file });
            });
        });
    }


    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">RESERVE {this.state.room.roomTypeName}</span>
                    <hr />
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.userId}
                        {this.state.memberType}
                        {this.state.memberPoint}
                    </div>
                </div>
                <br />
                {this.state.room !== '' ? <div className="row">
                    <div className="col-xl-6 col-lg-12">
                        <img src={this.readImage(this.state.room.image)} alt="room" style={{ 'width': '100%' }} />
                    </div>
                    <div className="col-xl-6 col-lg-12">
                        <span className="bg-text-reserve">{this.state.room.description}</span>
                        <span className="bg-text-reserve">จำนวนคนสูงสุดที่สามารถเข้าพักได้ {this.state.room.capacity} คน</span>
                        <span className="bg-text-reserve">จำนวนห้องพักคงเหลือ {this.state.room.freeRoom} ห้อง</span>
                        <span className="bg-text-reserve">ราคาห้องพัก {this.state.room.price.toLocaleString()} บาท</span>
                        <span className="bg-text-reserve">โปรโมชั่น
                            <form onSubmit={this.getdiscount}>
                                <input type="text" className="form-control" style={{ 'width': '40%', 'display': 'inline' }} value={this.state.dcCode} onChange={this.handleChange} name="dcCode" />
                                <button className="btn form-control dc-btn">GET DISCOUNT</button>
                            </form>
                        </span>
                        <span className="bg-text-reserve">ใช้คะแนนเป็นส่วนลด 10 คะแนน = 1 บาท
                            <form onSubmit={this.usepoint}>
                                <input type="number" className="form-control" min="0" max={this.state.point} style={{ 'width': '40%', 'display': 'inline' }} value={this.state.dcPoint} onChange={this.handleChange} name="dcPoint" />
                                <button className="btn form-control dc-btn">USE POINT</button>
                            </form>
                        </span>
                            
                    </div>
                </div> : ''}

                <hr />
                <br />
                <span className="header-reserve" style={{ 'fontSize': '30px' }}>SUMMARY</span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">ช่วงเวลาที่เข้าพัก Check-in : {this.state.checkin}, Check-out : {this.state.checkout}</div>
                        <div className="col-6 bg-text-summary-right">รวมจำนวน {this.state.date} วัน</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">ราคาห้อง</div>
                        <div className="col-6 bg-text-summary-right">{this.state.sumPrice} บาท</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">โค้ดส่วนลด {this.state.saveDcCode}</div>
                        <div className="col-6 bg-text-summary-right">{this.state.dcCodePrice} บาท</div>
                    </div>
                </span>
                <span className="bg-text-summary">
                    <div className="row">
                        <div className="col-6 bg-text-summary-left">ใช้คะแนน {this.state.saveDcPoint} คะแนน เป็นส่วนลด</div>
                        <div className="col-6 bg-text-summary-right">{this.state.dcPointPrice} บาท</div>
                    </div>
                </span>
                <span className="bg-text-summary-final">
                    <div className="row">
                        <div className="col-6 bg-text-summa ry-left">รวมทั้งสิ้น</div>
                        <div className="col-6 bg-text-summary-right">{this.state.sumPrice - this.state.dcCodePrice - this.state.dcPointPrice} บาท</div>
                    </div>
                </span>
                <span className="bg-text-summary-final">
                    <div className="row">
                        <div className="col-6 bg-text-summa ry-left">ธนาคาร ไทยพาณิชย์เลขบัญชี 667-440-6414  ชื่อบัญชี เอกฤทธิ์ สุฤทธิ์</div>
                        {/* input image */}
                        <div className="col-6 bg-text-summary-right">
                            <form onSubmit={this.uploadImage}>
                                <p>อัพโหลดหลักฐานการโอนเงิน</p>
                                <input type="file" className="form-control" style={{ 'width': '40%', 'display': 'inline' }} onChange={this.handleImage} />
                            </form>
                        </div>
                    </div>
                </span>
                <button className="btn form-control dc-btn-summary" onClick={this.reserveroom}>RESERVE</button>
                <br />
                <br />
                <br />
            </div>
        )
    }
}

export default ReservbookingCompenent