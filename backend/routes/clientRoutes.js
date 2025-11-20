const express=require("express");
const {addClient,getClient,updateClient,deleteClient}=require("../controllers/clientController");
const router=express.Router();
router.post("/",addClient);
router.get("/:id",getClient);
router.put("/:id",updateClient);
router.delete("/:id",deleteClient);
module.exports=router;
