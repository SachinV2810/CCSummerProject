const express = require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser')
corsOptions ={
    origin:'http://localhost:3000', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
const CookieParser=require('cookie-parser')
const crypto=require('crypto');
const Razorpay =require('razorpay')
const {isLoggedIn,isAdmin} =require('./middlewares/isAuth');
const mongoose = require('mongoose');
const Flight = require('./models/flight');
const admin =require('firebase-admin');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Booking = require('./models/booking');
const Trip = require('./models/trips');
main(
    console.log("connection succeed")
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airline');
}

app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(8000,()=>{
    console.log("App is listening to port 8080");
})

app.post("/gettoken",isLoggedIn)
app.get("/getcities",async (req,res)=>{
    try{
        const response=await Flight.find({}).select('departureAirport arrivalAirport');
        const cities=[];
        response.map((f)=>{
            cities.push(f.departureAirport)
            cities.push(f.arrivalAirport);
        })
        const newcities=cities.filter((item,index)=>cities.indexOf(item)===index);
        res.send(newcities);

    }catch(err){

    }
})

app.get("/getbreview/:id",async (req,res)=>{
    const {id}=req.params;
    const flight=await Flight.findById(id);
    console.log(flight);
    res.send(flight);
})
app.post("/editFlight",async(req,res)=>{
    const {flight2,id}=req.body;
    await Flight.findByIdAndUpdate(id,{airline:flight2.AName,flightNumber:flight2.Fno,departureAirport:flight2.DA,arrivalAirport:flight2.AA,departureDateTime:parseDateTime(flight2.DD,flight2.DT),arrivalDateTime:parseDateTime(flight2.AD,flight2.AT),price:flight2.price,baggage:[flight2.checkInBag,flight2.cabinBag],seatClass:flight2.seatClass,cancel:flight2.cancelCharge,availableSeats:Number(flight2.AS)});

    res.send("updated");
})
app.get("/getbookings",async (req,res)=>{
    Booking.find()
    .then((r)=>res.send(r));
})
app.get("/getupcomingtrips",async(req,res)=>{
    const uid=req.headers.authorization;
    const todaydate=new Date();
    const Trips=await Trip.find({userid:uid,departureDateTime:{$gte:todaydate}}).populate('booking').populate('flightid');
    Trips.sort((a,b)=>a.departureDateTime-b.departureDateTime);
    res.send(Trips);
})
function convertToDateTime(dateString) {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false }); // Get current time in 24-hour format
  const dateTimeString = `${dateString}T${currentTime}`;
  return new Date(dateTimeString);
}
app.post("/searchresults",async (req,res)=>{
    try{
        let {way,from,to,dd,rd,adult,child,Class}=req.body;
        const token=req.headers.authorization;
        const decodeValue=await admin.auth().verifyIdToken(token);
        if(decodeValue){
            if(way==='oneway'){
                const date=convertToDateTime(dd);;
                const resp=await Flight.find({departureAirport:from,arrivalAirport:to,seatClass:Class,availableSeats:{$gte:adult+child},departureDateTime:{$gte:date}});
                res.send(resp)
            }
            else{
                const date1=convertToDateTime(dd);
                const date2=convertToDateTime(rd);
                const r1=await Flight.find({departureAirport:from,arrivalAirport:to,seatClass:Class,availableSeats:{$gte:adult+child},departureDateTime:{$gte:date1}});
                const r2=await Flight.find({departureAirport:to,arrivalAirport:from,seatClass:Class,availableSeats:{$gte:adult+child},departureDateTime:{$gte:date2}});
                r1.sort((a, b) => Number(a.price) - Number(b.price));
                r2.sort((a, b) => Number(a.price) - Number(b.price));
                
                if (r1.length === r2.length) {
                } else if (r1.length > r2.length) {
                    const diff = r1.length - r2.length;
                    for (let i = 0; i < diff; i++) {
                        r1.pop();
                    }
                } else { // r1.length < r2.length
                    const diff = r2.length - r1.length;
                    for (let i = 0; i < diff; i++) {
                        r2.pop();
                    }
                    
                }
                const pairedFlights = [];

                // Assuming r1 and r2 have the same length
                for (let i = 0; i < r1.length; i++) {
                    pairedFlights.push({going:r1[i],return:r2[i]});
                }
                res.send(pairedFlights);
                                
            }
            
        }
        else{
            req.status(403).json({msg:"not authorized"})
        }
    }catch(err){
        res.status(401).json({msg:err.code});
    }
    
})


app.delete("/cancel/:id1/:id2/:id3",async(req,res)=>{
    let uid=req.headers.authorization;
    console.log(uid);
    if(uid){
        let {id1,id2,id3}=req.params;
        let pass=await Booking.findById(id2);
        const seats=pass.adultDetails.length+pass.childDetails.length;
        await Flight.findByIdAndUpdate(id3,{ $inc: { availableSeats:seats  } })
        await Booking.findByIdAndUpdate(id2,{Cancelled:"YES"});
        await Trip.deleteOne({ _id:id1,userid:uid});
        res.send("Succesfully deleted");
    }
    
})
app.post("/addflight",async(req,res)=>{
    try{
    const token=req.headers.authorization;
    const decodeValue=await admin.auth().verifyIdToken(token);
    if(decodeValue.email==='sachinvarmaiitjee@gmail.com'){
        const {AName,Fno,DA,AA,DD,DT,AT,AD,price,checkInBag,cabinBag,cancelCharge,AS,seatClass}=req.body;
        console.log(DD)
        const newFlight = new Flight({airline:AName,flightNumber:Fno,departureAirport:DA,arrivalAirport:AA,departureDateTime:parseDateTime(DD,DT),arrivalDateTime:parseDateTime(AD,AT),price:price,baggage:[checkInBag,cabinBag],seatClass:seatClass,cancel:cancelCharge,availableSeats:Number(AS)});
        newFlight.save()
        .then(()=>console.log("flight saved"))
        // res.status(409).json({msg:"flight validation error or flight already exist"})
        .catch(err=>console.log(err));
    }
    }catch(err){
        res.status(403).json({msg:"some error or not authorized"});   
    }
})



app.get("/allusers",async(req,res)=>{
    try{
        const output=await admin.auth().listUsers(1000);
        res.send(output.users);
    }catch(err){
        console.log(err);
    }
})


app.get('/activeflights',async(req,res)=>{
    try{
        const resp=await Flight.find();
        res.send(resp);
    }catch(err){
        console.log(err);
    }
})



app.post("/getorderid",async(req,res)=>{
    try{
        const razorpay= new Razorpay({
        key_id:'rzp_test_B29wyl4OKbFZhM',
        key_secret:'8Ao5LAATGL0LeQkHHBpEdqcS'
    })
    const options=req.body;
    const order=await razorpay.orders.create(options)
    if(!order){
        return res.status(500).send("Payment cannot completed");
    }
    res.json(order);
    }catch(err){
        return res.status(500).send("Payment cannot completed");
    }
    
})



app.post("/validatePayment",(req,res)=>{
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature}=req.body;
    const sha = crypto.createHmac("sha256",'8Ao5LAATGL0LeQkHHBpEdqcS');
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest= sha.digest("hex");
    if((digest!==razorpay_signature)){
        return res.status(400).json({msg:"Transaction Failed"});
    }
    const token=jwt.sign({id:razorpay_payment_id},"payment456@",{expiresIn:15});
    res.cookie("token",token);
    res.json({
        msg:"success",
        orderId:razorpay_order_id,
        paymentId:razorpay_payment_id,
    })
    
})



function parseDateTime(dateString, timeString) {
  const dateTimeString = `${dateString}T${timeString}:00`;
  const dateTimeObj= new Date(dateTimeString);
  return dateTimeObj.toISOString();
}
app.post("/addbooking",(req,res)=>{
    const token=req.cookies.token;
   let {flightid1,flightid2,paymentId,travellerDetails,currUser}=req.body;
     if(!token){
        res.status(401).json("token not valid");
    }else{
        jwt.verify(token,"payment456@",async(err,decoded)=>{
            if(err)return res.status(401).json("token is wrong");
            else{
                var passengers;
                if(travellerDetails){
                    passengers=travellerDetails[0].length+travellerDetails[1].length;
                }
                const booking=await Booking.find({paymentId:paymentId})        
                if(booking.length===0){
                    const flight=await Flight.findByIdAndUpdate(flightid1,{ $inc: { availableSeats: -passengers } },{new:true});
                    var flight2=null;
                    var departureDatereturn=null;
                    var arrivalDatereturn=null;
                    if(flightid2){
                        console.log(flightid2);
                        flight2=await Flight.findByIdAndUpdate(flightid2,{ $inc: { availableSeats: -passengers } },{new:true});
                        departureDatereturn=flight2.departureDateTime;
                        arrivalDatereturn=flight2.arrivalDateTime;
                    }
                    const departureDate=flight.departureDateTime;
                    const arrivalDate=flight.arrivalDateTime;
                    const newbooking=new Booking({flight:[flightid1,flightid2],paymentId:paymentId,adultDetails:travellerDetails[0],childDetails:travellerDetails[1],contactEmail:travellerDetails[3].email,contactPhone:travellerDetails[3].mobile,totalPrice:travellerDetails[2].amount/100})
                    newbooking.save().then((r)=>{
                        const newtrip1=new Trip({booking:r._id,flightid:flight._id,userid:currUser.uid,departureDateTime:departureDate,arrivalDateTime:arrivalDate});
                        newtrip1.save().then(()=>console.log("trip1 save"));
                        if(flightid2){
                            const newtrip2=new Trip({booking:r._id,flightid:flight2._id,userid:currUser.uid,departureDateTime:departureDatereturn,arrivalDateTime:arrivalDatereturn});
                            newtrip2.save().then(()=>console.log("trip2 save"));
                        }
                        res.send({bookingid:r._id,flight:flight,flight2:flight2});
                    });
                    
                }  
            }
        })
    }
})