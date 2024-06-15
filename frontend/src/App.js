import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Homepage from "./pages/homepage";
import { Routes ,Route, Navigate} from "react-router-dom";
import { useFirebase } from "./firebase.js";
import HandlePass from "./pages/authentication/handlePassword.js";
import CircularProgress from '@mui/material/CircularProgress'
import Profile from "./pages/profile/Profile.js";
import Flight from "./pages/flight/flight.js";
import Admin from "./admin/Admin.js";
import AddFlight from "./admin/AddFlight.js";
import GetUser from "./admin/GetUser.js";
import Adminlogin from "./pages/authentication/Adminlogin.js";
import Search from "./pages/SearchFlight/Search.js";
import ResultsPage from "./pages/SearchFlight/ResultsPage.js";
import Booking from "./pages/Booking/Booking.js";
import BookingSuccess from "./pages/Booking/BookingSuccess.js";
import BookingPart2 from "./pages/Booking/BookinPart2.js";
import Upcoming from "./pages/My Trips/Upcoming.js";
import Header from "./pages/extras/Header.js";
import EditFlight from "./admin/EditFlight.js";
import BookFlights from "./admin/BookFlights.js";
import TripsPage from "./pages/My Trips/TripsPage.js";
import { Avatar, LinearProgress } from "@mui/material";
import Animatedloader from "./Animatedloader.js";
function App() {
const firebase=useFirebase()
const admin=firebase.admin;
  if(firebase.user===null){
    return(
      <div className="w-full h-screen flex items-center justify-center">
        <Animatedloader src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" alt="...loading"/>
      </div>
      
    )
  }
  return (
    <div className="App">
     {firebase.loader && <div className="w-full h-screen flex items-center justify-center">
        <Animatedloader src="https://cdn.dribbble.com/users/1186261/screenshots/3718681/_______.gif" alt="...loading"/>
      </div>}
      {firebase.user!==0 && admin==false && <Header/>}
      <Routes>
        <Route path="/admin" element={admin?<Admin/>:<Navigate to="/adminlogin"/>}/>
        <Route path="/adminlogin" element={admin?<Navigate to="/admin"/>:<Adminlogin/>}/>
        <Route path="/admin/addflight" element={admin?<AddFlight/>:<Navigate to="/adminlogin"/>}/>
        <Route path="/admin/bookedflights" element={admin?<BookFlights/>:<Navigate to="/adminlogin"/>}/>
        <Route path="/admin/users" element={admin?<GetUser/>:<Navigate to="/adminlogin"/>}/>
        <Route path="/"  element={firebase.user===0?<Navigate to="/login"/>:<Homepage/>}/>
        <Route path="/login" element={firebase.user===0?<Login/>:<Homepage/>}/>
        <Route path="/flights" element={firebase.user===0?<Navigate to="/login"/>:<Search/>}/>
        <Route path="/flights/result" element={firebase.user===0?<Navigate to="/login"/>:<ResultsPage/>}/>
        <Route path="/forgotpwd" element={firebase.user===0?<HandlePass/>:<Homepage/>}/>
        <Route path="/profile" element={firebase.user===0?<Navigate to="/login"/>:<Profile/>}/>
        <Route path="/flight" element={firebase.user===0?<Navigate to="/login"/>:<Flight/>}/>
        <Route path="/signup" element={firebase.user===0?<Signup/>:<Homepage/>}/>
        <Route  path="/flights/review/:id/:adult/:child" element={firebase.user===0?<Navigate to="/login"/>:<Booking/>}></Route>
        <Route path="/mytrips" element={firebase.user===0?<Navigate to="/login"/>:<TripsPage/>}></Route>
        <Route  path="/flights/review/:id1/:id2/:adult/:child" element={firebase.user===0?<Navigate to="/login"/>:<BookingPart2/>}></Route>
        <Route target="blank" path="/booking/:flightid1/:orderId/:paymentId" element={firebase.user===0?<Navigate to="/login"/>:<BookingSuccess/>}></Route>
        <Route target="blank" path="/booking/:flightid1/:flightid2/:orderId/:paymentId" element={firebase.user===0?<Navigate to="/login"/>:<BookingSuccess/>}></Route>
        <Route path="/modifyflight/:id"element={admin?<EditFlight/>:<Navigate to="/adminlogin"/>}/>
      </Routes>
    </div>
  );
}

export default App;
