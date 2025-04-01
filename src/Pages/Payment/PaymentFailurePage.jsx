import React from 'react'
const PaymentFailure = () => {
    const handleRedirectToApp = () => {
        const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${100}&donationwithId=${10}&isPaymentSuccess=${false}`;
        const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';
        window.location.href = appUrl;
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h4>Please Try again after some time</h4>
            <button
                onClick={handleRedirectToApp}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#83214F',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Go to App
            </button>
        </div>
    );
};

export default PaymentFailure