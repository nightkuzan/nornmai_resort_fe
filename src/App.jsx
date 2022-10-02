import './App.css';
import { Component } from 'react';
import { BrowserRouter , Navigate, Routes,  Route } from 'react-router-dom';

// user
import RegisComponent from './components/RegisComponent';
import NornmaiComponent from './components/NornmaiComponent';
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import RoomComponent from './components/RoomComponent';
import ReservComponent from'./components/ReservComponent';
import ReservbookingComponent from './components/ReservbookingComponent';
import HistoryComponent from './components/HistoryComponent';
import ProfileComponent from './components/ProfileComponent';
import CancelComponent from './components/CancelComponent';

// admin
import AdminLoginComponent from './components/AdminComponents/AdminLoginComnponent';
import StaffComponent from './components/AdminComponents/StaffComponent';
import StaffEditComponent from './components/AdminComponents/StaffEditComponent';
import StaffAddComponent from './components/AdminComponents/StaffAddComponent';
import RoomAdminComponent from './components/AdminComponents/RoomAdminComponent';
import BookingInfoComponent from './components/AdminComponents/BookingInfoComponent';
import AdminAllBooking from './components/AdminComponents/AdminAllBooking';

class App extends Component {
  loginStorage = '';
  state = {};

  componentDidMount() {
    this.loginStorage = JSON.parse(localStorage.getItem('login'));
    this.loginAdminStorage = JSON.parse(localStorage.getItem('login-admin'));
    if (this.loginStorage == null && this.loginAdminStorage == null) {
      this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/login">Login/Register</a></li> });
      this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room">Room</a></li> });
    } else {
      if (this.loginStorage != null) {
        this.setState({ 'history': <li className="nav-item"><a className="nav-link mx-2" href="/history">History</a></li> });
        this.setState({ 'reserve': <li className="nav-item"><a className="nav-link mx-2" href="/reserve">Reserve</a></li> });
        this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/profile">Profile</a></li> });
        this.setState({ 'logout': <li className="nav-item"><a className="nav-link mx-2" href="/logout">Logout</a></li> });
        this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room">Room</a></li> });
      }
      if (this.loginAdminStorage != null) {
        if(this.loginAdminStorage.pName === 'Manager') {
          this.setState({ 'staff': <li className="nav-item"><a className="nav-link mx-2" href="/staff">Staff</a></li> });
          this.setState({ 'discount': <li className="nav-item"><a className="nav-link mx-2" href="/discount">Discount</a></li> });
        }
        this.setState({ 'reserve': <li className="nav-item"><a className="nav-link mx-2" href="/admin">Admin</a></li> });
        this.setState({ 'history': <li className="nav-item"><a className="nav-link mx-2" href="/payment">Payment</a></li> });
        this.setState({ 'login': <li className="nav-item"><a className="nav-link mx-2" href="/check">Checkin/Checkout</a></li> });
        this.setState({ 'logout': <li className="nav-item"><a className="nav-link mx-2" href="/logout">Logout</a></li> });
        this.setState({ 'room': <li className="nav-item"><a className="nav-link mx-2" href="/room-admin">Room</a></li> });
        this.setState({ 'customer': <li className="nav-item"><a className="nav-link mx-2" href="/customer">Customer</a></li> });
      }
    }
    console.log(this.state)
    console.log(localStorage.getItem('login'))
  }
  render() {
    return (
      <div id="context">
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
          <div className="container">
            {/* <a className="navbar-brand" href="/"><img src={logo} height="60" alt='logo' /></a> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <a className="nav-link mx-2" aria-current="page" href="/">Home</a>
                </li>
                {this.state.room}
                {this.state.reserve}
                {this.state.history}
                {this.state.login}
                {this.state.customer}
                {this.state.discount}
                {this.state.staff}
                {this.state.logout}
              </ul>
            </div>
          </div>
        </nav>
        <BrowserRouter>
          <Routes>
            {/* user */}
            <Route exact path="/" element={<NornmaiComponent />}/>
            <Route path="/register" element={<RegisComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="/room" element={<RoomComponent />} />
            <Route path="/reserve" element={<ReservComponent />} />
            <Route path="/reserve-room" element={<ReservbookingComponent />} />
            <Route path="/history" element={<HistoryComponent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/cancelbooking" element={<CancelComponent />} />

            {/* admin */}
            <Route path="/admin/login" element={<AdminLoginComponent />} />
            <Route path="/room-admin" element={<RoomAdminComponent />} />
            <Route path="/payment" element={<BookingInfoComponent />} />
            <Route path="/staff" element={<StaffComponent />} />
            <Route path="/staff-edit" element={<StaffEditComponent />} />
            <Route path="/staff-add" element={<StaffAddComponent />} /> 
            <Route path="/admin" element={<AdminAllBooking />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
