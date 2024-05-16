import Login from "./pages/authentication/login";
import Signup from "./pages/authentication/signup";
import Homepage from "./pages/homepage";
import { Routes ,Route, Navigate} from "react-router-dom";
import { useFirebase } from "./firebase.js";
import HandlePass from "./pages/authentication/handlePassword.js";
import CircularProgress from '@mui/material/CircularProgress'
import { Pagination } from "@mui/material";
function App() {
const firebase=useFirebase()
  if(firebase.user===null){
    return(
      <div className="w-full h-screen bg-orange-400/30 flex items-center justify-center">
        <CircularProgress size={60}></CircularProgress>
      </div>
      
    )
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={firebase.user===0?<Navigate to="/login"/>:<Homepage/>}></Route>
        <Route path="/login" element={firebase.user===0?<Login/>:<Homepage/>}></Route>
         <Route path="/forgotpwd" element={firebase.user===0?<HandlePass/>:<Homepage/>}></Route>
        <Route path="/signup" element={firebase.user===0?<Signup/>:<Homepage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
