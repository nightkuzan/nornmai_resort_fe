import { Component } from "react"
import moment from 'moment';

class DiscountAddComponent extends Component {
    state = {}
    constructor() {
        super();
        this.state = {
            dcCode: '',
            dcRate: '',
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            endDate: '',
            min: moment(new Date()).format('YYYY-MM-DD'),
            dcAmount: 0,
            amountOrdate: 'amount',
        };
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeAmountstate = this.handleChangeAmountstate.bind(this);
    }

    componentDidMount() {
        this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
        if (this.loginAdminStorage == null || this.loginAdminStorage.pName !== 'Manager')
            window.location.href = "/";

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ "error": "" });
    }

    handleChangeAmount(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ 'dcAmount': value });
        this.setState({ "error": "" });
    }

    handleChangeAmountstate(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ 'amountOrdate': value });
        this.setState({ "error": "" });
    }

    handleChangeDate(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ 'endDate': value });
        this.setState({ "error": "" });
    }

    add(e) {
        e.preventDefault();
        let raw = '';
        if (this.state.amountOrdate === 'date') {
            raw = JSON.stringify({
                dcCode: this.state.dcCode,
                dcRate: this.state.dcRate,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                // dcAmount: '',
                amountOrdate: this.state.amountOrdate,

            });
        } else if(this.state.amountOrdate === 'amount'){
            raw = JSON.stringify({
                dcCode: this.state.dcCode,
                dcRate: this.state.dcRate,
                // startDate: '',
                // endDate: '',
                dcAmount: this.state.dcAmount,
                amountOrdate: this.state.amountOrdate,
            });
        }else if(this.state.amountOrdate === 'both'){
            raw = JSON.stringify({
                dcCode: this.state.dcCode,
                dcRate: this.state.dcRate,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                dcAmount: this.state.dcAmount,
                amountOrdate: this.state.amountOrdate,
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw
        };

        fetch('http://localhost:3001/discount/add', requestOptions)
            .then(response => response)
            .then(data => {
                alert('เพิ่มโค้ดสำเร็จ');
                window.location.href = "/discount";
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
            });
    }

    render() {
        return (
            <div className="bg-div" style={{ 'paddingLeft': '10%', 'paddingRight': '10%' }}>
                <div className="header-topic">
                    <span className="header-reserve">ADD DISCOUNT</span>
                    <hr />
                </div>
                <br />
                <div>
                    <form onSubmit={this.add}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dcCode" className="control-label">DISCOUNT CODE *</label>
                                    <input type="text" name="dcCode" value={this.state.dcCode} onChange={this.handleChange} className="form-control" placeholder="DISCOUNT CODE *" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="dcRate" className="control-label">DISCOUNT RATE *</label>
                                    <input type="number" min="1" max="100" name="dcRate" value={this.state.dcRate} onChange={this.handleChange} className="form-control" placeholder="DISCOUNT RATE *" required />
                                </div>
                            </div>
                        </div>
                        <label htmlFor="amountOrDate">ประเภทของส่วนลด</label>
                        <br></br>
                        {/* dropdown for select choice */}
                        <select
                            name="amountOrDate"
                            value={this.state.amountOrDate}
                            onChange={this.handleChangeAmountstate}
                            className="form-control"
                            required
                        >
                            <option value="amount">จำนวนครั้ง</option>
                            <option value="date">วันที่</option>
                            <option value="both">ทั้งวันที่และจำนวนครั้ง</option>
                        </select>
                        {
                            this.state.amountOrdate === 'amount' ?
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="amount" className="control-label">AMOUNT</label>
                                            <input type="number" min="1" name="amount" value={this.state.dcAmount} onChange={this.handleChangeAmount} className="form-control" placeholder="AMOUNT" required />
                                        </div>
                                    </div>
                                </div>
                                :
                                this.state.amountOrdate === 'date' ?
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="startDate" className="control-label">START DATE</label>
                                            <input type="date" name="startDate" min={this.state.min} value={this.state.startDate} onChange={this.handleChangeDate} className="form-control" required />
                                        </div>
                                    </div><div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="endDate" className="control-label">END DATE</label>
                                            <input type="date" name="endDate" min={this.state.startDate} value={this.state.endDate} onChange={this.handleChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>:
                                <>
                                <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="amount" className="control-label">AMOUNT</label>
                                        <input type="number" min="1" name="amount" value={this.state.dcAmount} onChange={this.handleChangeAmount} className="form-control" placeholder="AMOUNT" required />
                                    </div>
                                </div>
                            </div>
                             <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="startDate" className="control-label">START DATE</label>
                                            <input type="date" name="startDate" min={this.state.min} value={this.state.startDate} onChange={this.handleChangeDate} className="form-control" required />
                                        </div>
                                    </div><div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="endDate" className="control-label">END DATE</label>
                                            <input type="date" name="endDate" min={this.state.startDate} value={this.state.endDate} onChange={this.handleChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }



                        <div className="row">
                            <div className="form-group" style={{ 'textAlign': 'center' }}>
                                <span style={{ 'color': 'red' }}>{this.state.error}</span>
                                <br />
                                <button type="submit" className="btn btn-primary">ADD</button>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <br />
            </div>
        )
    }
}

export default DiscountAddComponent