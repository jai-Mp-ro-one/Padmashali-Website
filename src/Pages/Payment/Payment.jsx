
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
        if (!amount || amount < 1) {
            console.log("Invalid donation amount");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("https://dev.padmasaliglobal.com/jaiMp/payment/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount * 100,
                    currency: "INR",
                    receipt: `order_rcpt_${Date.now()}`,
                    payment_capture: 1,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error creating order:", errorText);
                setLoading(false);
                return;
            }

            const razorpayOrder = await response.json();
            console.log("Backend Order Response:", razorpayOrder);

            const { id: order_id, amount: amountInSubUnit } = razorpayOrder;

            const options = {
                key: RAZORPAY_KEY,
                amount: amountInSubUnit,
                currency: "INR",
                order_id: order_id,
                handler: function (response) {
                    console.log(response);
                },
                modal: {
                    ondismiss: function () {
                        console.log("Payment modal closed");
                    },
                },
            };
            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Error during payment initiation:", error);
            setLoading(false);
        }
    };


    const verifyPayment = async (paymentDetails) => {
        try {
            const response = await fetch(
                "https://dev.padmasaliglobal.com/jaiMp/payment/order/validate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentDetails),
                }
            );

            const data = await response.json();
            if (data.msg === "success") {
                console.log("Payment verified successfully:", data);
                alert("Thank you for your donation!");
            } else {
                console.error("Payment verification failed:", data);
                alert("Payment verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("An error occurred during payment verification.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

        </div>
    );
};

export default Payment;
