const express =require("express")
const router=express.Router()

const{createRegistration,updateRegistration,rejectedData,approvedData,regionOneData,region2Data,pendingList,getSingleData,viewAllRegistrations,regionTransfer,regionOneGPA,getAllRegion2GPA,fetchAll}=require("../controllers/registrationController")
const{sendOtp,verifyOTP, subsOtp,subsVerify}=require("../controllers/weblimeServices")

router.route("/cors-register").post(createRegistration)
router.route("/cors-updateRegister/:sno").patch(updateRegistration)
router.route("/approvedData").get(approvedData)
router.route("/rejectedData").get(rejectedData)
router.route("/regionOneData").get(regionOneData)
router.route("/region2Data").get(region2Data)
router.route("/pendingList").get(pendingList)
router.route("/viewAllRegistrations").get(viewAllRegistrations)
router.route("/cors-singleRegister/:sno").get(getSingleData)
router.route("/transfer-region").post(regionTransfer)
router.route("/cors-sendOtp").post(sendOtp)
router.route("/cors-verifyOtp").post(verifyOTP) 

router.route("/cors-subsOtp").post(subsOtp) 
router.route("/cors-verfy-subsOtp").post(subsVerify) 




router.route("/regionOneGPA-Data").get(regionOneGPA)  
router.route("/cors-allData").get(fetchAll)   




module.exports=router

