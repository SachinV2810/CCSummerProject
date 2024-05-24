
import { Link, redirect, useNavigate } from "react-router-dom";
import './authcss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye ,faEyeSlash,faXmarkCircle} from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useFirebase } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import LinearProgress from '@mui/material/LinearProgress';
const Signup = () => {
  const [show, setshow]=useState(false)
  const [loader,setloader]=useState(false);
  const [err,setErr]=useState("");
  const navigate = useNavigate()
  const [signup,setsignup]=useState({email:"",password1:"",password2:""});
   const firebase=useFirebase();

   
  const handleChange=(e)=>{
    setErr("");
    if(e.target.name==='password2'){
      if(signup.password1 && e.target.value!==signup.password1){
          setErr("password not match");
      }
      if(e.target.value===''){
        setErr('');
      }
    }
    setsignup((curdata)=>{
        return {...curdata,[e.target.name]:e.target.value};
      })
  }

  const handleSubmit=async (e)=>{
    setloader(true);
    e.preventDefault();
    if(err){
      setloader(false);
    }
    if(err===''){
        createUserWithEmailAndPassword(firebase.firebaseAuth, signup.email, signup.password1)
        .then((res)=>{
          setloader(false);
          console.log("user created");
          navigate("/");
        })
        .catch((err)=>{
          setloader(false);
          const e=err.code.split('/')[1];
          setsignup({password1:"",password2:""});
          setErr(e);
        })
    }
    
  }

  return (
    <div className="overflow-hidden">
    {loader && <LinearProgress color="secondary" className="w-full absolute h-2"/>}
    <div style={{backgroundImage:"url('./login.jpg')"}} className="w-full  h-screen bg-cover flex justify-center items-center flex-wrap ">
      {err.length===0?"":<div className="w-96 h-8 bg-red-700 absolute top-16 text-white text-center rounded pt-1"><FontAwesomeIcon icon={faXmarkCircle} className="mr-2"/>{err}</div>}
        <div className="h-4/5 w-96  bg-white/75  text-center flex flex-wrap justify-center items-center">
          <div className="merienda relative top-10 h-20 w-full">Sign up</div>
          <form className="h-2/3 flex flex-wrap justify-center items-center" onSubmit={handleSubmit}>
            <input 
            placeholder="your email" 
            type="email"
            name="email"
            required style={ {outline:"none"}} 
            className="w-3/4 h-12 pl-4 rounded-xl"
            value={signup.email}
            onChange={handleChange}
            autoComplete="off"
            ></input>
            <div className="flex w-3/4 justify-center items-center flex-wrap text-center">
              
              <input 
              placeholder="create password" 
              name="password1"
              required type={show? "text":"password"} 
              style={{outline:"none"}} 
              
              className="w-full h-12 pl-4 rounded-xl"
              value={signup.password1}
              onChange={handleChange}
              autoComplete="off"
              ></input>
              <FontAwesomeIcon 
              icon={!show?faEye:faEyeSlash} 
              onClick={()=>setshow(!show)} 
              className="relative -right-32 -top-8 opacity-40 hover:cursor-pointer" 
              />
              <input 
              placeholder="confirm password" 
              name="password2"
              required
              type="password"
              style={{outline:"none"}} 
              className="w-full h-12 pl-4 rounded-xl mt-4"
              value={signup.password2}
              onChange={handleChange}
              autoComplete="off"
              ></input>

              
            </div>
            <button className="w-3/4 h-12 rounded-xl text-white font-bold text-xl" style={{backgroundColor:"#ff6d38"}}>Sign up</button>
            <Link className="w-full text-blue-900 -mb-3" to="/login">Already have account? Login</Link>
          </form>
        </div>
    </div>
    </div>
  )
};

export default Signup;

