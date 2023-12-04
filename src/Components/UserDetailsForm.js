// UserDetailsForm.js
import React, { useState } from "react";
import "./UserDetails.css";
// import { createOrder } from "../../backend";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingGif from "../assets/Loading.gif"

function UserDetailsForm({ username, id }) {
  console.log("selectedId", id);
  const [orderDetails, setOrderDetails] = useState({
    productId: 1,
    seller: "",
    quantity: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  if (loading == true) {
    <img src={LoadingGif} />
  }

  const handleSendRequest = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/abc", {
        productId: orderDetails.productId,
        seller: orderDetails.seller,
        quantity: orderDetails.quantity,
        price: orderDetails.price,
      });
      setLoading(false);
      // Additional logic after the request is successful (if needed)
      console.log("Request sent successfully!");
      setOrderDetails({ productId: 1,
        seller: "",
        quantity: "",
        price: ""})
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Transaction Mined Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Handle errors here
      setLoading(false);
      console.error("Error sending request:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Transaction Failed!!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="user-details-form">
      <div className="user-form">
        <h2>Let's Connect With {username}</h2>
      </div>
      <div className="user-address">
        <h4>Enter Address : </h4>
        <input
          type="text"
          name="seller"
          value={orderDetails.seller}
          onChange={handleInputChange}
        />
      </div>
      <div className="user-address">
        <h4>Quantity : </h4>
        <input
          type="text"
          name="quantity"
          value={orderDetails.quantity}
          onChange={handleInputChange}
        />
      </div>
      <div className="user-address">
        <h4>Price : </h4>
        <input
          type="text"
          name="price"
          value={orderDetails.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="user-address">
        <h4>Enter T&C </h4>
        <textarea />
      </div>
      <div className="user-address">
        <h4>Contract Expiry Date </h4>
        <input type="date" />
      </div>
      <div className="user-address">
        <h4>Enter Dispute Condition : </h4>
        <textarea />
      </div>
      <div className="user-address">
        <div style={{ display: "flex" }}>
          <h4>Enter Nominee Address : </h4>
          <input type="text" />
        </div>
        <div style={{ display: "flex" }}>
          <h4>Enter Nominee Name : </h4>
          <input type="text" />
        </div>
      </div>
      {/* <div className="user-address">
        <h4>Enter Nominee Address : </h4>
        <input type="text" />
      </div> */}
      <div>
        <button onClick={handleSendRequest}>Send Request</button>
      </div>
    </div>
  );
}

export default UserDetailsForm;
