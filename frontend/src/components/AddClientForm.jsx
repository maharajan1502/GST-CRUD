import React, { useState } from 'react';
import axios from 'axios';
import './AddClientForm.css';
export default function AddClientForm() {
  const [form, setForm] = useState({
    businessEntity: '',
    businessName: '',
    contactName: '',
    contactNumber: '',
    emailId: '',
    clientId: '',
    currency: 'INR',
    clientCreationDate: '',
    gstin: '',
    gstRegistrationType: '',
    state: '',
    pincode: '',
    address: '',
    addressLine2: '',
    gstRegistrationDate: ''
  });
  const [activeTab, setActiveTab] = useState('otherDetails');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  
  const verify = async () => {
    try {
      setError("");
      const r = await verifyGST(form.gstin);
      console.log(r.data);
      setForm(prev => ({
        ...prev,
        businessName: r.data.data.lgnm || prev.businessName,
        state: r.data.data.pradr.addr.st || prev.state,
        pincode: r.data.data.pradr.addr.pncd || prev.pincode
      }));
      setSuccess("GSTIN verified successfully!");
    } catch (err) {
      setError("Failed to verify GSTIN: " + (err.response?.data?.message || err.message));
    }
  };

const baseURL='http://localhost:5000/api';
const verifyGST=(gstin)=>axios.post(`${baseURL}/gst/verify`,{gstin});
const saveClient=(data)=>axios.post(`${baseURL}/clients`,data);

  const save = async () => {
    try {
      setError("");
      setSuccess("");
      
      // Validate required fields
      if (!form.businessEntity || !form.businessName || !form.contactName) {
        setError("Please fill in all required fields (Business Entity, Business Name, Contact Name)");
        return;
      }
      
      console.log("Sending form data:", form);
      await saveClient(form);
      setSuccess("Client saved successfully!");
      setForm({
        businessEntity: '',
        businessName: '',
        contactName: '',
        contactNumber: '',
        emailId: '',
        clientId: '',
        currency: 'INR',
        clientCreationDate: '',
        gstin: '',
        gstRegistrationType: '',
        state: '',
        pincode: '',
        address: '',
        addressLine2: '',
        gstRegistrationDate: ''
      });
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
      setError("Failed to save client: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="add-client-container">
      {/* Header */}
      <div className="header">
        <div className="breadcrumb">
          <span className="back-arrow">←</span>
          <span className="breadcrumb-link">Clients</span>
          <span>›</span>
          <span>Add Client</span>
        </div>
        <div className="header-content">
          <h2>Add Client</h2>
          <button className="settings-btn">⚙</button>
        </div>
      </div>

      {/* Form */}
      <div className="form-wrapper">
        <div className="form-card">
          {/* Error/Success Messages */}
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          {/* Basic Details */}
          <div className="form-section">
            <div className="form-grid">
              {/* Business Entity */}
              <div className="form-group">
                <label htmlFor="businessEntity">Business Entity <span className="required">*</span></label>
                <select
                  id="businessEntity"
                  name="businessEntity"
                  value={form.businessEntity || ''}
                  onChange={handleChange}
                >
                  <option value="">Select Business Entity</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">LLP</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Public Limited">Public Limited</option>
                </select>
              </div>

              {/* Business Name */}
              <div className="form-group">
                <label htmlFor="businessName">Business Name <span className="required">*</span></label>
                <input
                  id="businessName"
                  type="text"
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Business Name"
                />
              </div>

              {/* Contact Name */}
              <div className="form-group">
                <label htmlFor="contactName">Contact Name <span className="required">*</span></label>
                <input
                  id="contactName"
                  type="text"
                  name="contactName"
                  value={form.contactName || ''}
                  onChange={handleChange}
                  placeholder="Contact Name"
                />
              </div>

              {/* Contact Number */}
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input
                  id="contactNumber"
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber || ''}
                  onChange={handleChange}
                  placeholder="Contact Number"
                />
              </div>

              {/* Email ID */}
              <div className="form-group">
                <label htmlFor="emailId">Email ID</label>
                <input
                  id="emailId"
                  type="email"
                  name="emailId"
                  value={form.emailId || ''}
                  onChange={handleChange}
                  placeholder="Email ID"
                />
              </div>

              {/* Client ID */}
              <div className="form-group">
                <label htmlFor="clientId">Client ID</label>
                <input
                  id="clientId"
                  type="text"
                  name="clientId"
                  value={form.clientId || ''}
                  onChange={handleChange}
                  placeholder="Client ID"
                />
              </div>

              {/* Currency */}
              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={form.currency || 'INR'}
                  onChange={handleChange}
                >
                  <option value="INR">Rupees INR ₹</option>
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                </select>
              </div>

              {/* Client Creation Date */}
              <div className="form-group">
                <label htmlFor="clientCreationDate">Client Creation Date</label>
                <input
                  id="clientCreationDate"
                  type="date"
                  name="clientCreationDate"
                  value={form.clientCreationDate || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              type="button"
              onClick={() => setActiveTab('otherDetails')}
              className={activeTab === 'otherDetails' ? 'tab-active' : 'tab-inactive'}
            >
              Other Details
            </button>
          </div>

          {/* Other Details Section */}
          {activeTab === 'otherDetails' && (
            <div className="form-section">
              <div className="form-grid">
                {/* GSTIN */}
                <div className="form-group">
                  <label htmlFor="gstin">GSTIN</label>
                  <div className="input-with-button">
                    <input
                      id="gstin"
                      type="text"
                      name="gstin"
                      value={form.gstin || ''}
                      onChange={handleChange}
                      placeholder="GSTIN"
                    />
                    <button
                      type="button"
                      onClick={verify}
                      className="verify-btn"
                    >
                      <span>✓</span> Verify
                    </button>
                  </div>
                </div>

                {/* State */}
                <div className="form-group">
                  <label htmlFor="state">State <span className="required">*</span></label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>

                {/* GST Registration Type */}
                <div className="form-group">
                  <label htmlFor="gstRegistrationType">GST Registration Type</label>
                  <input
                    id="gstRegistrationType"
                    type="text"
                    name="gstRegistrationType"
                    value={form.gstRegistrationType || ''}
                    onChange={handleChange}
                    placeholder="Regular"
                  />
                </div>

                {/* Pincode */}
                <div className="form-group">
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    id="pincode"
                    type="number"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                  />
                </div>

                {/* Address */}
                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={form.address || ''}
                    onChange={handleChange}
                    placeholder="Address"
                    rows="3"
                  />
                </div>

                {/* Address Line 2 */}
                <div className="form-group">
                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input
                    id="addressLine2"
                    type="text"
                    name="addressLine2"
                    value={form.addressLine2 || ''}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                  />
                </div>

                {/* GST Registration Date */}
                <div className="form-group">
                  <label htmlFor="gstRegistrationDate">GST Registration Date</label>
                  <input
                    id="gstRegistrationDate"
                    type="date"
                    name="gstRegistrationDate"
                    value={form.gstRegistrationDate || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel">Cancel</button>
            <button type="button" onClick={save} className="btn-save">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}