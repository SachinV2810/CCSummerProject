import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../../firebase";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Avatar } from "@mui/material";
import axios from "../../axios";
import {LinearProgress} from '@mui/material';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notiValue,setValue]=useState(0);
  const [NotificationContent, setContent]=useState([]);
  const firebase=useFirebase();
  const currUser=firebase.user;
  const [hide,sethide]=useState(false);
  const navigate=useNavigate();
  const handleChange=()=>{
    sethide(!hide);
  }
  const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const clearNotification=()=>{
    axios.get("/users/clearNoti",{
       headers:{
          'Authorization':currUser.uid,
          'Content-Type':'application/json'

        }
      })
      .then(res=>{
        setValue(0);
        setContent([]);
    })
  }
  useEffect(()=>{
    axios.get("/users/notifications",{
        headers:{
          'Authorization':currUser.uid,
          'Content-Type':'application/json'

        }
      })
      .then(res=>{
        if(res.data.length==0){
          setValue(0);
          setContent([])
        }
        else{
          setValue(res.data.length)
          setContent(res.data);
        }
      })
  },[]);
  return (
    <>
    
    <header className="w-full bg-white  z-20 shadow-lg pb-8 pt-4 h-20 fixed flex justify-between ">
     
        <div className="flex basis-1/4  items-center justify-between ml-10 pl-2 pr-2">
          <div onClick={()=>navigate("/")}><img src="./goibibo.png" className="w-44"></img></div>
          <Link to="/flights" target="blank" className="text-blue-800 text-xl">Book a Flight now</Link>
        </div>
        <div className="flex basis-1/3 items-center justify-around mr-10 pl-2 pr-2">


          <Link to="/mytrips" target="blank" className="text-blue-800 text-xl">See your trips</Link>
          
          <Tooltip title="See Notifications">
              <Badge badgeContent={notiValue} color="primary" >
              <IconButton
                onClick={handleClick}
                size="medium"
                sx={{ ml: 2 }}
              >
                <NotificationsIcon/>
              </IconButton>
          </Badge>
        </Tooltip>
         <Menu
            anchorEl={anchorEl}
            id="Important Messages"
          PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {NotificationContent.length===0 &&
            <MenuItem onClick={handleClose} sx={{width:"10rem",display:"flex",justifyContent:"center"}}>
               <div>No new notifications</div>
            </MenuItem>
            }
            {NotificationContent.length>0 && NotificationContent.map((content)=>{
              return<div className="w-64 pl-4 pb-4 pr-4 text-red-800">&#x2022;  {content.message}</div>
            })
            }
            {NotificationContent.length>0 &&<div className="w-64 hover:cursor-pointer hover:bg-black/20 -mb-2 mt-2 text-center border-2" onClick={clearNotification}>Clear</div>
            }
      </Menu>

        <Tooltip>
          <IconButton onMouseEnter={()=>sethide(true)}>
          <Avatar alt="profile"  src={currUser.photoURL?currUser.photoURL:'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQ'}/>
          </IconButton>
        </Tooltip>
          {hide && <div onMouseLeave={()=>sethide(false)} onMouseEnter={()=>sethide(true)} className="z-10 flex flex-wrap top-16 absolute right-16 pl-2 pr-2 bg-white shadow-md rounded-b-md h-32 w-40 align-stretch content-start"> 
            <Link onClick={()=>{
              if(currUser.email==='sachinvarmaiitjee@gmail.com'){
                firebase.setadmin(false);
              }
              signOut(firebase.firebaseAuth);
              }
              } className="text-blue-800 text-center w-full h-10 hover:shadow-md shadow-slate-600">Sign out</Link>
            <Link to="/profile" className="text-blue-800 w-full text-center h-10 hover:shadow-md shadow-slate-600" onClick={()=>sethide(false)}>Profile</Link>
            <Link to="/mytrips" target="blank" className="text-blue-800 w-full text-center h-10 hover:shadow-md shadow-slate-600" onClick={()=>sethide(false)}
profile>My trips</Link>
          </div>}
        </div>
    </header>
</>
  )
};

export default Header;
