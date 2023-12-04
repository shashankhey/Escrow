// UserDetailsForm.js
import React, {useState} from "react";
import "./UserDetails.css";

function UserDetailsForm({ username, id }) {
  console.log("selectedId", id);
  const [order, setOrder] = useState({
    productId: '',
    seller: '',
    quantity: 0,
    price: 0,
  });
  const createOrder = async (productId, seller, quantity, price) => {
    setOrder({
      productId,
      seller,
      quantity,
      price,
    });
  };
  return (
    <div className="user-details-form">
      <div className="user-form">
        <h2>Let's Connect With {username}</h2>
      </div>
      <div className="user-address">
        <h4>Enter Address : </h4>
        <input type="text" value={id} />
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
        <button>Send Request</button>
      </div>
    </div>
  );
}

export default UserDetailsForm;
