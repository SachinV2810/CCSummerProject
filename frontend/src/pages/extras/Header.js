import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase";
import { useState } from "react";
import { signOut } from "firebase/auth";
const Header = () => {
  const firebase=useFirebase();
  const currUser=firebase.user;
  const [hide,sethide]=useState(false);
  const navigate=useNavigate();
  const handleChange=()=>{
    sethide(!hide);
  }
  return (
    <header className="w-full bg-white  z-10 shadow-lg pb-8 pt-4 h-20 fixed flex justify-between ">
        <div className="flex basis-1/4  items-center justify-between ml-10 pl-2 pr-2">
          <div onClick={()=>navigate("/")}><img src="./goibibo.png" className="w-44"></img></div>
          <Link to="/flights" className="text-blue-800 text-xl">Book a Flight now</Link>
        </div>
        <div className="flex basis-1/3 items-center justify-around mr-10 pl-2 pr-2">
          <Link to="/mytrips" className="text-blue-800 text-xl">See your upcoming trips</Link>
          <div className="border-2 border-blue-400 rounded-full hover:cursor-pointer hover:opacity-70" onClick={handleChange}><img  className="w-10 h-10 rounded-full" src={currUser.photoURL?currUser.photoURL:'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg='}></img>
          </div>
          {hide && <div className="z-10 flex flex-wrap top-16 absolute right-16 pl-2 pr-2 bg-white shadow-md rounded-b-md h-32 w-40 align-stretch content-start"> 
            <Link onClick={()=>{
              if(currUser.email==='sachinvarmaiitjee@gmail.com'){
                firebase.setadmin(false);
              }
              signOut(firebase.firebaseAuth);
              }
              } className="text-blue-800 text-center w-full h-10 hover:shadow-md shadow-slate-600">Sign out</Link>
            <Link to="/profile" className="text-blue-800 w-full text-center h-10 hover:shadow-md shadow-slate-600" onClick={()=>sethide(false)}>Profile</Link>
            <Link to="/mytrips" className="text-blue-800 w-full text-center h-10 hover:shadow-md shadow-slate-600" onClick={()=>sethide(false)}
profile>My trips</Link>
          </div>}
        </div>
    </header>
  )
};

export default Header;
