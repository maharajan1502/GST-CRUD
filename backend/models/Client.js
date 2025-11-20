const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  clientId:String,
  businessEntity: String,
  businessName: { type: String, required: true },
  contactName: { type: String, required: true },
  contactNumber: String,
  emailId: String,
  currency: String,
  gstin: { type: String, required: true },
  state: { type: String, required: true },
  address: String,
  pincode: String,
  gstRegistrationDate: String,
  gstRegistrationType: String,
});
module.exports = mongoose.model("Client", clientSchema);
