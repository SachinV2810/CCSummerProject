const express=require('express');
const router=express.Router();
const { adminAuthMiddleware, isauthMiddleware } = require('../middlewares/isAuth');
const AdminController=require("../controllers/AdminController");

router.post("/addflight", adminAuthMiddleware,AdminController.AddFlight);

router.get("/allusers",AdminController.GetUsers);

router.get('/activeflights',AdminController.GetActiveFlights);

router.post("/editFlight",adminAuthMiddleware,AdminController.EditFlight);

router.get("/getbookings",adminAuthMiddleware,AdminController.GetAllBookings);


module.exports=router;