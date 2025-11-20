const axios = require("axios");
exports.verifyGST = async (req, res) => {
  const gstin = (req.body && req.body.gstin) || (req.query && req.query.gstin);
  console.log('verifyGST called', { method: req.method, gstin });
  if (!gstin) return res.status(400).json({ message: "Missing required field: gstin" });
  try {
    const url = `https://commonapi.mastersgst.com/public/search`;
    const params = {
      email: process.env.MG_EMAIL,
      client_id: process.env.MG_CLIENT_ID,
      client_secret: process.env.MG_CLIENT_SECRET,
      gstin: gstin
    };
    // Log outgoing request
    console.log('Outgoing GST API request', {
      url,
      params: {
        client_id: params.client_id ? '***' : undefined,
        client_secret: params.client_secret ? '***' : undefined,
      }
    });
    const response = await axios.get(url, { params, timeout: 10000 });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('GST lookup error:', {
      message: error.message,
      url: error.config && error.config.url,
      method: error.config && error.config.method,
      status: error.response && error.response.status,
      responseData: error.response && error.response.data,
    });
    const status = (error.response && error.response.status) || 500;
    const payload = {
      message: "GST lookup failed",
      error: error.message,
    };
    if (error.response && error.response.data) payload.remote = error.response.data;
    res.status(status).json(payload);
  }
};
