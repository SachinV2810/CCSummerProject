import { Link } from "react-router-dom";
import { useFirebase } from "../firebase";
import Header from "./extras/Header";
import backgroundImage from './background.jpg';
const Homepage = (props) => {
    const firebase=useFirebase();
  return (
     <div style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh', backgroundSize: 'cover' }}>
    </div>
  )
};

export default Homepage;
