import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { signOut } from "firebase/auth";
const Header = () => {
    const firebase=useFirebase();
  return (
<div className="h-12 z-20 w-full fixed bg-blue-400 flex items-center flex-wrap justify-between pl-4 pr-4">
        <Link to="/admin" className="bg-orange-400 px-4 rounded-xl">Homepage</Link>
      <Link to="/admin/addflight" className="bg-orange-400 px-4 rounded-xl">Add Flight </Link>
      <Link to="/admin/bookedflights" className="bg-orange-400 px-4 rounded-xl"> Booked Flights </Link>
      //<Link to="/admin/users" className="bg-orange-400 px-4 rounded-xl"> All Users</Link>
      <Link className="bg-orange-400 px-4 rounded-xl " onClick={()=>{
      signOut(firebase.firebaseAuth)
      firebase.setadmin(false);
      }
      }>sign out</Link>
    </div>
  )
};

export default Header;
