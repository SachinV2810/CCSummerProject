import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { signOut } from "firebase/auth";
import FlightHomepage from "./FlightHomepage";
const Admin = () => {
  const firebase=useFirebase();

  return (
    <>
    <div>
      <FlightHomepage/>
    </div>
   </>
  )
};

export default Admin;
