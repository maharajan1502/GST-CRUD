const express=require("express");
const {verifyGST}=require("../controllers/gstController");
const router=express.Router();
router.post("/verify",verifyGST);
router.get("/verify",verifyGST);
module.exports=router;
