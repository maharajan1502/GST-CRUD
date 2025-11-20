import React, { useState } from "react";
import axios from "axios";

export default function GSTForm() {
  const [gstin, setGstin] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    address: "",
    state: ""
  });
  const [loading, setLoading] = useState(false);

  const verifyGSTIN = async () => {
    if (!gstin || gstin.length !== 15) {
      alert("Please enter a valid 15-digit GSTIN");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://app.mastergst.com/validate-gstin", {
        gstin
      });

      const data = response.data;

      setForm({
        businessName: data.businessName,
        address: data.address,
        state: data.state
      });

    } catch (error) {
      alert("GSTIN verification failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <h2>GSTIN Verification</h2>

      <label>GSTIN</label>
      <input
        type="text"
        value={gstin}
        onChange={(e) => setGstin(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={verifyGSTIN} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      <hr />

      <label>Business Name</label>
      <input
        type="text"
        value={form.businessName}
        readOnly
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Address</label>
      <textarea
        value={form.address}
        readOnly
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>State</label>
      <input
        type="text"
        value={form.state}
        readOnly
        style={{ width: "100%", marginBottom: 10 }}
      />
    </div>
  );
}
