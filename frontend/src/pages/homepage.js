import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import { signOut } from "firebase/auth";
const Homepage = (props) => {
    const firebase=useFirebase();
  return (
    <div>
      <h1>Homepage</h1>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <button onClick={()=>signOut(firebase.firebaseAuth)}>signout</button>
    </div>
  )
};

export default Homepage;
