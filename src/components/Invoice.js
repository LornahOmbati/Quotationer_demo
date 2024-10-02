import React, { useState, useRef, useEffect } from 'react';
import './Invoice.css';
import logodemo from '../images/logodemo.png';

import html2pdf from 'html2pdf.js';

function Invoice() {
  const [items, setItems] = useState([]);
  const [currency, setCurrency] = useState('USD'); // State for selected currency
  const [invoiceId, setInvoiceId] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [email, setEmail] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [attentionTo, setAttentionTo] = useState(''); // New State for Attention To
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [additionalNotes, setAdditionalNotes] = useState(''); // State for Additional Notes
  const [editIndex, setEditIndex] = useState(-1); // -1 means no item is being edited



  const [discount, setDiscount] = useState(0); // New: Discount percentage
  const [showModal, setShowModal] = useState(false);
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  const componentRef = useRef();

  // Adjust the layout on component mount for better responsiveness
  useEffect(() => {
    // Adjust elements to ensure consistent viewport width
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 768) {
      document.querySelectorAll('.form-section, .quotation-preview').forEach(el => {
        el.style.marginLeft = '0';
        el.style.marginRight = '0';
      });
    }
  }, []); 

    // Load saved data from localStorage on component mount
    useEffect(() => {
        setInvoiceId(generateInvoiceId());
    
        // Load form data from localStorage
        const savedData = JSON.parse(localStorage.getItem('invoiceData'));
        if (savedData) {
          setClientName(savedData.clientName || '');
          setClientAddress(savedData.clientAddress || '');
          setEmail(savedData.email || '');
          setAttentionTo(savedData.attentionTo || '');
          setItems(savedData.items || []);
          setDate(savedData.date || new Date().toISOString().slice(0, 10));
          setCurrency(savedData.currency || 'USD');
          setDiscount(savedData.discount || 0);
        }
      }, []);
    
      // Save data to localStorage whenever it changes
      useEffect(() => {
        const data = {
          clientName,
          clientAddress,
          email,
          attentionTo,
          items,
          date,
          currency,
          discount,
        };
        localStorage.setItem('invoiceData', JSON.stringify(data));
      }, [clientName, clientAddress, email, attentionTo, items, date, currency, discount]);
    

  const generateInvoiceId = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `IVN${month}${day}${hours}${minutes}${seconds}`;
  };

  useEffect(() => {
    setInvoiceId(generateInvoiceId());
  }, []);

  const handleAddItem = () => {
    if (editIndex === -1) {
      // If no item is being edited, add a new item
      setItems([...items, { description: itemDescription, quantity: itemQuantity, price: itemPrice }]);
    } else {
      // Edit existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = { description: itemDescription, quantity: itemQuantity, price: itemPrice };
      setItems(updatedItems);
      setEditIndex(-1); // Reset editIndex after editing
    }
    setShowModal(false);
    setItemDescription('');
    setItemQuantity(0);
    setItemPrice(0);
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    const itemToEdit = items[index];
    setItemDescription(itemToEdit.description);
    setItemQuantity(itemToEdit.quantity);
    setItemPrice(itemToEdit.price);
    setShowModal(true); // Show modal with populated fields
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

   // Currency symbol based on selection
   const getCurrencySymbol = () => (currency === 'USD' ? '$' : 'Ksh');

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };

  const calculateInsurance = () => {
    return (calculateTotal() * 0.05).toFixed(2); // 5% insurance
  };

  const calculateDiscount = (amount) => {
    return ((amount * discount) / 100).toFixed(2); // Apply selected discount
  };

  const calculateVAT = (amount) => {
    return (amount * 0.16).toFixed(2); // 16% VAT added
  };

  const calculateNetTotal = () => {
    const total = parseFloat(calculateTotal());
    const insurance = parseFloat(calculateInsurance());
    const discountedTotal = total + insurance - parseFloat(calculateDiscount(total + insurance));
    const vat = parseFloat(calculateVAT(discountedTotal));
    return (discountedTotal + vat).toFixed(2); // Net total with VAT added
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'KES',
      minimumFractionDigits: 2,
    }).format(amount);
  };
  

  const downloadInvoiceAsPDF = () => {
    const newInvoiceId = generateInvoiceId();
    setInvoiceId(newInvoiceId);
    const element = componentRef.current;

    const extraContent = document.getElementById('extra-content');
    if (extraContent) extraContent.style.display = 'none';

    const options = {
      filename: `${newInvoiceId}.pdf`,
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      margin: [0, 0, 0, 0]
    };

    html2pdf().set(options).from(element).save();

    if (extraContent) extraContent.style.display = 'block';
  };

  return (
    <div className="App">
      <h1>Invoice Generator</h1>

      <div className="invoice-layout">
        {/* Left Side: Form Inputs */}
        <div className="form-section">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col">
              <label>Enter client Name: </label>
              <input
                name="text"
                id="name"
                placeholder="Enter your name"
                maxLength={56}
                autoComplete="off"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address">Enter client Address: </label>
              <input
                name="address"
                id="address"
                placeholder="Enter client address"
                autoComplete="off"
                maxLength={96}
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Enter client email: </label>
              <input
                name="email"
                id="email"
                datatype="email"
                placeholder="Enter your email"
                maxLength={255}
                autoComplete="off"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* New Attention To field */}
            <div>
              <label>Attention to: </label>
              <input
                name="attentionTo"
                id="attentionTo"
                placeholder="Enter name for Attention"
                autoComplete="off"
                maxLength={56}
                type="text"
                value={attentionTo}
                onChange={(e) => setAttentionTo(e.target.value)}
              />
            </div>
            <div>
              <label>Invoice Date: </label>
              <input
                name="invoiceDate"
                id="invoiceDate"
                placeholder="Quotation Date"
                autoComplete="off"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="bankName">Enter bank name: </label>
              <input
                name="bankName"
                id="bankName"
                placeholder="Enter your bank name"
                maxLength={56}
                autoComplete="off"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div>
              <label>Enter branch name: </label>
              <input
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your branch name"
                maxLength={56}
                autoComplete="off"
                type="text"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
            </div>
            <div>
              <label>Enter account name: </label>
              <input
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your bank account name"
                maxLength={56}
                autoComplete="off"
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div>
              <label>Enter account number: </label>
              <input
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your bank account number"
                maxLength={20}
                autoComplete="off"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div>
              <label>Enter branch code: </label>
              <input
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your branch code"
                maxLength={20}
                autoComplete="off"
                type="text"
                value={branchCode}
                onChange={(e) => setBranchCode(e.target.value)}
              />
            </div>
            <div>
              <label>Enter bank code: </label>
              <input
                name="bankAccount"
                id="bankAccount"
                placeholder="Enter your bank code"
                maxLength={20}
                autoComplete="off"
                type="text"
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
              />
            </div>
            <div>
              <label>Enter postal address: </label>
              <input
                name="address"
                id="address"
                placeholder="Enter postal address"
                autoComplete="off"
                maxLength={96}
                type="text"
                value={postalAddress}
                onChange={(e) => setPostalAddress(e.target.value)}
              />
            </div>

            
            {/* Additional Notes Textarea */}
            <div>
              <label htmlFor="additionalNotes">Additional Notes: </label>
              <textarea
                id="additionalNotes"
                placeholder="Enter any additional notes here"
                rows={4}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                style={{ width: '90%', resize: 'vertical' }} // Keep formatting consistent with other inputs
              />
            </div>

            {/* Items Section */}
            <h3>Items</h3>
            {items.length === 0 && <p>No items added yet</p>}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th> {/* Add an Actions header for the buttons */}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.quantity * item.price)}</td>
                    <td>
                      {/* Smaller Edit and Remove icons */}
                      <button 
                        onClick={() => handleEditItem(index)} 
                        className="icon-button"
                        title="Edit Item"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(index)} 
                        className="icon-button"
                        title="Remove Item"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div style={{ marginTop: '10px' }}>
              <button onClick={() => setShowModal(true)}>Add Item</button>
              {items.length > 0 && (
                <button style={{ marginLeft: '10px' }} onClick={() => handleRemoveItem(items.length - 1)}>
                  Remove Last Item
                </button>
              )}
            </div>

            {/* Discount and currency dropdown */}
            <div className="dropdown-container">
              <div>
                <label htmlFor="discount">Discount:</label>
                <select
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                >
                  {[...Array(51).keys()].map((val) => (
                    <option key={val} value={val}>
                      {val}%
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label>Currency:</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="USD">USD</option>
                  <option value="KSH">KSH</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Invoice Preview */}
        <div ref={componentRef} className="quotation-preview">
          <h2>INVOICE</h2>
          <div className="content">
            <div className="quotation-header">
              <div className="logo-section">
                <img src={logodemo} alt="Company Logo" />
              </div>
              <div className="quotation-details">
                <p><strong>Invoice No:</strong> {invoiceId}</p>
                <p><strong>Attention to:</strong> {attentionTo}</p>
                <p><strong>Invoice Date:</strong> {date}</p>
                <p><strong>Valid For:</strong> 14 days</p>
              </div>
            </div>

            <div className="quotation-top">
              <div className="client-details">
                <h3>Invoice to</h3>
                <p>{clientName}</p>
                <p>{clientAddress}</p>
                <p>{email}</p>
              </div>
              <div className="company-details">
                <h3>Invoice by</h3>
                <p>Company xyz</p>
                <p>Town 234, Nairobi</p>
                <p>client1@gmail.com</p>
                <p>(+259) 700-000-000</p>
              </div>
            </div>

            <h3>Item description</h3>
            <table className="quotation-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                     <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

            </table>

            {/* <div className="total-section">
              <p><strong>Subtotal:</strong> ${calculateTotal()}</p>
              <p><strong>Insurance (5%):</strong> ${calculateInsurance()}</p>
              <p><strong>Discount ({discount}%):</strong> -${calculateDiscount(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()))}</p>
              <p><strong>VAT (16%):</strong> +${calculateVAT(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()) - parseFloat(calculateDiscount(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()))))}</p>
              <h3 className="total">Net Total: ${calculateNetTotal()}</h3>
            </div> */}

            <div className="total-container">
              <div className="total-section">
                <table>
                  <tbody>
                    <tr>
                      <th>Subtotal:</th>
                      <td>{getCurrencySymbol()}{calculateTotal()}</td>
                    </tr>
                    <tr>
                      <th>Insurance (5%):</th>
                      <td>{getCurrencySymbol()}{calculateInsurance()}</td>
                    </tr>
                    <tr>
                      <th>Discount ({discount}%):</th>
                      <td>-{getCurrencySymbol()}{calculateDiscount(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()))}</td>
                    </tr>
                    <tr>
                      <th>VAT (16%):</th>
                      <td>+{getCurrencySymbol()}{calculateVAT(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()) - parseFloat(calculateDiscount(parseFloat(calculateTotal()) + parseFloat(calculateInsurance()))))}</td>
                    </tr>
                    <tr>
                      <th><strong>Net Total:</strong></th>
                      <td><strong>{getCurrencySymbol()}{calculateNetTotal()}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Notes in Preview */}
            <h3>Additional Notes:</h3>
            <div className="additional-notes-preview" style={{ border: '2px solid #c1d8e0', padding: '10px', minHeight: '100px', borderRadius: '4px'  }}>
              {additionalNotes ? additionalNotes : <em>No additional notes provided.</em>}
            </div>
            

            {/* Bank details section */}
            <div className="quotation-footer">
              {currency === 'USD' ? (
                <p>
                  <strong>Bank: bank101, Branch: branch22, Account Name: Company xyz</strong><br />
                  <strong>Account Number: 000008900, Branch Code: 000, Bank Code: 000</strong><br />
                  <strong>Postal Address: PO Box - 00000 - 00000</strong>
                </p>
              ) : (
                <p>
                  <strong>Bank: bank 105, Branch: branch39, Account Name: Company xyz</strong><br />
                  <strong>Account Number: 000003900, Branch Code: 100, Bank Code: 100</strong><br />
                  <strong>Postal Address: PO Box - 00000 - 00000</strong>
                </p>
              )}
            </div>


            <p className="copyright-tag">&copy; {new Date().getFullYear()} primeGearAfrica. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button onClick={downloadInvoiceAsPDF}>Generate Invoice</button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Item</h2>
            <div>
              <label>Description: </label>
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Quantity: </label>
              <input
                type="number"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Price: </label>
              <input
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
              />
            </div>
            <button onClick={handleAddItem}>Add</button>
            <button className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoice;
