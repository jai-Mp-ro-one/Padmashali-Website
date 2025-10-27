// import React from 'react';
import './Refund.css';

const Refund = () => {
  return (
    <div className="refund-container">
      <h1 className="refund-title">No Refund Policy</h1>

      <p className="refund-text">
        At <strong>Padmashali Global</strong>, we deeply appreciate your contributions and support
        towards our community initiatives. Please note that all payments made for account creation,
        donations, or any other contributions within the <strong>Padmashali Global</strong> application
        are <strong>non-refundable</strong>.
      </p>

      <p className="refund-text">
        Once a payment is successfully processed, it <strong>cannot</strong> be canceled, refunded,
        or reversed under any circumstances. We encourage users to review their transactions carefully
        before proceeding with payments.
      </p>

      <p className="refund-text">
        However, if a transaction fails or is in pending and the amount is debited from your account, please contact <strong>padmashaliglobaltrust@gmail.com</strong> for assistance.
      </p>


      <p className="refund-text">
        If you have any concerns or require assistance, please feel free to contact our support team <strong>padmashaliglobaltrust@gmail.com</strong>.
      </p>

      <p className="refund-text" style={{ fontWeight: 'bold', marginTop: '20px' }}>
        Thank you for your understanding and support.
      </p>
    </div>
  );
};

export default Refund;
