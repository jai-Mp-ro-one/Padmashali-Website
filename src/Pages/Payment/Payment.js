
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const Payment = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');
    const [donationAmount, setDonationAmount] = useState(amount);
    const amountInSubUnit = donationAmount ? parseInt(donationAmount) * 100 : null;
    const currency = 'INR';
    const RAZORPAY_KEY = 'rzp_test_Xje0HJttHA9DVh';

    console.log("amount :", amount)
    useEffect(() => {
        if (amount) {
            handleDonate()
        }
        else {
            navigate('/');
        }
    }, [amount])

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
                console.error('Server Error:', errorText);
                return;
            }

            const razorpayData = await response.json();
            const { id: order_id } = razorpayData;

            const options = {
                key: RAZORPAY_KEY,
                amount: amountInSubUnit,
                currency: currency,
                name: 'Acme Corp',
                description: 'Credits towards consultation',
                order_id: order_id,
                handler: (response) => {
                    verifyPayment(
                        response.razorpay_order_id,
                        response.razorpay_payment_id,
                        response.razorpay_signature
                    );
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
                console.log('Payment failed:', response.error);
                setLoading(false);
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

            if (data.msg === 'success') {
                console.log('Payment verified successfully:', data);
                alert('Payment successful!');
            } else {
                console.log('Payment verification failed:', data);
                alert('Payment verification failed.');
            }
        } catch (error) {
            console.error('Error in verifyPayment:', error);
        }
    };

    return (
        <div>

        </div>
    );
};

export default Payment;
