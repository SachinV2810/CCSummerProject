import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { signOut } from "firebase/auth";
import FlightHomepage from "./FlightHomepage";
const Admin = () => {
  const firebase=useFirebase();

  return (
    <div>
      <Link to="/admin/addflight" >Add Flight </Link>
      <Link to="/admin/bookedflights"> Booked Flights </Link>
      <Link to="/revenue">Revenue made</Link>
      <Link to="/admin/users"> All Users</Link>
      <Link onClick={()=>{
      signOut(firebase.firebaseAuth)
      firebase.setadmin(false);
      }
      }>sign out</Link>
      <hr></hr>
     <FlightHomepage/>
    </div>
  )
};

export default Admin;
