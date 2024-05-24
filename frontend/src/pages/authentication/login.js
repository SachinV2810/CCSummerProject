import { Link, redirect, useNavigate } from "react-router-dom";
import './authcss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye ,faEyeSlash,faXmarkCircle} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useFirebase } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import LinearProgress from '@mui/material/LinearProgress';
const Login = () => {
  const [show, setshow]=useState(false)
  const [loader,setloader]=useState(false);
  const [err,setErr]=useState("");
  const navigate = useNavigate()
  const [loginData,setLoginData]=useState({email:"",password:""});
   const firebase=useFirebase();

   
  const handleChange=(e)=>{
    setErr("");
    setLoginData((curdata)=>{
        return {...curdata,[e.target.name]:e.target.value};
      })
  }

  const handleSubmit=async (e)=>{
    setloader(true);
    e.preventDefault();
    signInWithEmailAndPassword(firebase.firebaseAuth,loginData.email,loginData.password)
    .then((res)=>{
      setloader(false);
      firebase.SetUser(res.user);
      navigate("/");
    })
    .catch((err)=>{
      setLoginData({email:"",password:""});
      setloader(false)
      setErr(err.code);
    })
  
  }

  return (
    <div className="overflow-hidden">
    {loader && <LinearProgress color="secondary" className="w-full absolute h-2"/>}
    <div style={{backgroundImage:"url('./login.jpg')"}} className="w-full  h-screen bg-cover flex justify-center items-center flex-wrap ">
      {err.length===0?"":<div className="w-96 h-8 bg-red-700 absolute top-20 text-white text-center rounded pt-1"><FontAwesomeIcon icon={faXmarkCircle} className="mr-2"/>{err.split("auth/")[1].toLocaleUpperCase()}</div>}
        <div className="h-2/3 w-96  bg-white/75  text-center flex flex-wrap justify-center items-center">
          <div className="merienda relative top-6 h-20">Login to Make Your Trip</div>
          <form className="h-2/3 flex flex-wrap justify-center items-center" onSubmit={handleSubmit}>
            
            <input 
            placeholder=" email" 
            type="email" 
            name="email"
            required style={ {outline:"none"}} 
            className="w-3/4 h-12 pl-4 rounded-xl"
            value={loginData.email}
            onChange={handleChange}
            autoComplete="off"
            ></input>

            <div className="flex w-3/4 justify-center items-center flex-wrap text-center">
              <input 
              placeholder="password" 
              name="password"
              required type={show? "text":"password"} 
              style={{outline:"none"}} 
              className="w-full h-12 pl-4 rounded-xl"
              value={loginData.password}
              onChange={handleChange}
              autoComplete="off"
              ></input>

              <FontAwesomeIcon 
              icon={!show?faEye:faEyeSlash} 
              onClick={()=>setshow(!show)} 
              className="relative -right-32 -top-8 opacity-40 hover:cursor-pointer" 
              />
            </div>
            <button className="w-3/4 h-12 rounded-xl text-white font-bold text-xl" style={{backgroundColor:"#ff6d38"}}>Log in</button>
            <Link className="w-full text-blue-900 -mb-4" to="/forgotpwd">Forgot password</Link>
            <Link className="w-full text-blue-900 -mb-3" to="/signup">Don't have a account? Sign up</Link>
            <Link className="w-full text-blue-900 -mb-3" to="/adminlogin">Admin?</Link>
          </form>
        </div>
    </div>
    </div>
  )
};

export default Login;
