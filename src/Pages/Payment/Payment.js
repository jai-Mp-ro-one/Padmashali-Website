import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import APIServices from '../../APIServices/APIServices';

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    const donationwithId = queryParams.get("donationwithId");
    const profileId = queryParams.get("profile-id");
    const [donationAmount, setDonationAmount] = useState(amount);
    const amountInSubUnit = donationAmount ? parseInt(donationAmount) * 100 : null;
    const currency = 'INR';
    const RAZORPAY_KEY = 'rzp_test_Xje0HJttHA9DVh';
    const [successPay, setSuccessPay] = useState(false)

    useEffect(() => {
        if (amount) {
            handleDonate();
        } else {
            navigate('/');
        }
    }, [amount, navigate]);


    const handleDonate = async () => {
        if (!amountInSubUnit) {
            console.log('Invalid donation amount');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('https://jaimp-api.onelovepc.com/jaiMp/payment/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amountInSubUnit,
                    currency: currency,
                    receipt: 'order_rcptid_11',
                    payment_capture: 1,
                }),
            });

            if (!response.ok) {
                setLoading(false);
                const errorText = await response.text();
                console.log('Server Error:', errorText);
                return;
            }

            const razorpayData = await response.json();
            const options = {
                key: RAZORPAY_KEY,
                amount: amountInSubUnit,
                currency: currency,
                name: 'Acme Corp',
                description: 'Credits towards consultation',
                order_id: razorpayData.order.id,
                handler: (response) => {
                    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

                    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                        console.error('Required fields missing in Razorpay response:', response);
                        alert('Payment verification failed due to missing information.');
                        return;
                    }
                    verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
                },
                prefill: {
                    name: 'Hasan',
                    email: 'hasan@example.com',
                    contact: '9191919191',
                },
                theme: {
                    color: '#83214F',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
            razorpay.on('payment.failed', (response) => {
                console.log('Payment Failed:', response.error);
                setLoading(false);
                setIsPaymentComplete(false);
            });
        } catch (error) {
            setLoading(false);
            console.error('Error in handleDonate:', error);
        }
    };


    const verifyPayment = async (orderId, paymentId, signature) => {
        try {
            const response = await fetch(
                'https://jaimp-api.onelovepc.com/jaiMp/payment/order/validate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        razorpay_order_id: orderId,
                        razorpay_payment_id: paymentId,
                        razorpay_signature: signature,
                    }),
                }
            );
            const data = await response.json();
            console.log("payment res sucess data :", data);

            if (data.msg === 'success') {
                alert('Payment successful!');
                setSuccessPay(true)
                const paymentDetails = data.paymentDetails;
                const donationBody = {
                    payment_id: paymentDetails?.id,
                    order_id: paymentDetails?.order_id,
                    signature: signature,
                    amount: paymentDetails?.amount / 100,
                    currency: paymentDetails?.currency,
                    status: paymentDetails?.status,
                    payment_method: paymentDetails?.method,
                    created_at: paymentDetails?.created_at,
                    profile_id: profileId,
                    donation: true,
                    membership: false,
                    donation_id: donationwithId,
                };
                await APIServices.postDonationDataOfPerson(donationBody)
                    .then((res) => {
                        console.log("post donated person details :", res.data)
                        if (res.data.message === 'Payment created successfully.') {
                            setIsPaymentComplete(true);
                        }
                    })
                    .catch((err) => {
                        console.log("err in posting :", err)
                    })
            } else {
                alert('Payment verification failed.');
            }

            // setIsPaymentComplete(true);
        }
        catch (error) {
            console.error('Error in verifyPayment:', error);
        }
    };

    const handleRedirectToApp = () => {
        const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
        const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

        // Redirect to app
        window.location.href = appUrl;

        // Fallback to Play Store
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 2000);
        window.close();
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {isPaymentComplete ? (
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
            ) : (
                <p>Processing payment, please wait...</p>
            )}
        </div>
    );
};

export default Payment;
