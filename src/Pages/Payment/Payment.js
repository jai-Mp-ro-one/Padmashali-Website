// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from "react-router-dom";
// import APIServices from '../../APIServices/APIServices';

// const Payment = () => {
//     const [loading, setLoading] = useState(false);
//     const [isPaymentComplete, setIsPaymentComplete] = useState(false);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const queryParams = new URLSearchParams(location.search);
//     const amount = queryParams.get('amount');
//     const donationwithId = queryParams.get("donationwithId");
//     const profileId = queryParams.get("profile-id");
//     const [donationAmount, setDonationAmount] = useState(amount);
//     const amountInSubUnit = donationAmount ? parseInt(donationAmount) * 100 : null;
//     const currency = 'INR';
//     const RAZORPAY_KEY = 'rzp_test_Xje0HJttHA9DVh';
//     const [successPay, setSuccessPay] = useState(false)


//     useEffect(() => {
//         if (amount) {
//             handleDonate();
//         } else {
//             navigate('/');
//         }
//     }, [amount, navigate]);


//     const handleDonate = async () => {
//         if (!amountInSubUnit) {
//             console.log('Invalid donation amount');
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await fetch('https://dev.padmasaliglobal.com/jaiMp/payment/order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: amountInSubUnit,
//                     currency: currency,
//                     receipt: 'order_rcptid_11',
//                     payment_capture: 1,
//                 }),
//             });

//             if (!response.ok) {
//                 setLoading(false);
//                 const errorText = await response.text();
//                 console.log('Server Error:', errorText);
//                 return;
//             }

//             const razorpayData = await response.json();
//             const options = {
//                 key: RAZORPAY_KEY,
//                 amount: amountInSubUnit,
//                 currency: currency,
//                 name: 'Acme Corp',
//                 description: 'Credits towards consultation',
//                 order_id: razorpayData.order.id,
//                 handler: (response) => {
//                     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

//                     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//                         console.error('Required fields missing in Razorpay response:', response);
//                         alert('Payment verification failed due to missing information.');
//                         return;
//                     }
//                     verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
//                 },
//                 prefill: {
//                     name: 'Hasan',
//                     email: 'hasan@example.com',
//                     contact: '9191919191',
//                 },
//                 theme: {
//                     color: '#83214F',
//                 },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//             razorpay.on('payment.failed', (response) => {
//                 console.log('Payment Failed:', response.error);
//                 setLoading(false);
//                 setIsPaymentComplete(false);
//             });
//         } catch (error) {
//             setLoading(false);
//             console.error('Error in handleDonate:', error);
//         }
//     };


//     const verifyPayment = async (orderId, paymentId, signature) => {
//         try {
//             const response = await fetch(
//                 'https://dev.padmasaliglobal.com/jaiMp/payment/order/validate',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         razorpay_order_id: orderId,
//                         razorpay_payment_id: paymentId,
//                         razorpay_signature: signature,
//                     }),
//                 }
//             );
//             const data = await response.json();
//             console.log("payment res sucess data :", data);

//             if (data.msg === 'success') {
//                 alert('Payment successful!');
//                 setSuccessPay(true)
//                 const paymentDetails = data.paymentDetails;
//                 const donationBody = {
//                     payment_id: paymentDetails?.id,
//                     order_id: paymentDetails?.order_id,
//                     signature: signature,
//                     amount: paymentDetails?.amount / 100,
//                     currency: paymentDetails?.currency,
//                     status: paymentDetails?.status,
//                     payment_method: paymentDetails?.method,
//                     created_at: paymentDetails?.created_at,
//                     profile_id: profileId,
//                     donation: donationwithId === 'membership' ? false : true,
//                     membership: donationwithId === 'membership' ? true : false,
//                     donation_id: donationwithId === 'membership' ? null : donationwithId,
//                 };

//                 await APIServices.postDonationDataOfPerson(donationBody)
//                     .then((res) => {
//                         console.log("post donated person details :", res.data)
//                         if (res.data.message === 'Payment created successfully.') {
//                             setIsPaymentComplete(true);
//                         }
//                     })
//                     .catch((err) => {
//                         console.log("err in posting :", err)
//                     })
//             } else {
//                 alert('Payment verification failed.');
//             }

//             // setIsPaymentComplete(true);
//         }
//         catch (error) {
//             console.error('Error in verifyPayment:', error);
//         }
//     };

//     const handleRedirectToApp = () => {

//         if (donationwithId === 'membership') {
//             console.log("membership screen")
//             const appUrl = `https://padmasaliglobal.com/app/user/${profileId}`;
//             const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';

//             // Redirect to app
//             window.location.href = appUrl;

//             // Fallback to Play Store
//             setTimeout(() => {
//                 window.location.href = fallbackUrl;
//             }, 2000);
//             window.close();
//         } else {
//             const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
//             const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

//             // Redirect to app
//             window.location.href = appUrl;

//             // Fallback to Play Store
//             setTimeout(() => {
//                 window.location.href = fallbackUrl;
//             }, 2000);
//             window.close();
//         }

//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             {isPaymentComplete ? (
//                 <button
//                     onClick={handleRedirectToApp}
//                     style={{
//                         padding: '10px 20px',
//                         backgroundColor: '#83214F',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                     }}
//                 >
//                     Go to App
//                 </button>
//             ) : (
//                 <p>Processing payment, please wait...</p>
//             )}
//         </div>
//     );
// };

// export default Payment;



/////////////////////////SBI PAYMENT GATE WAY CODE   ///////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const donationAmount = queryParams.get('amount');
    const donationwithId = queryParams.get("donationwithId");
    const profileId = queryParams.get("profile-id");
    const [encryptedTransaction, setEncryptedTransaction] = useState("");
    const [successPay, setSuccessPay] = useState(false)
    const othersOption = donationwithId ? `${donationwithId}&${profileId}` : `0&${profileId}`
    useEffect(() => {
        if (donationAmount) {
            const orderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // const successUrl = "https://test.sbiepay.sbi/secure/sucess3.jsp";
            // const successUrl = `https://padmasaliglobal.com/verifypayment?orderNo=${orderNo}&amount=${donationAmount}`;
            const successUrl = "https://dev.padmasaliglobal.com/jaimp/sbiepay/success-response"
            // const failureUrl = "https://padmasaliglobal.com/payment-failed"
            const failureUrl = "https://dev.padmasaliglobal.com/jaimp/sbiepay/failure-response"
            const transactionData = [
                // "1000605", // Test key
                // 1003212,
                process.env.SBI_MERCHANT_KEY,
                "DOM",
                "IN",
                "INR",
                donationAmount,
                othersOption,
                successUrl,
                failureUrl,
                "SBIEPAY",
                orderNo,
                profileId,
                "NB",
                "ONLINE",
                "ONLINE",
            ].join("|");

            console.log("Transaction Data:", transactionData);

            const encryptedData = encryptAES256(transactionData, SECRET_KEY);
            console.log("Encrypted Transaction Data:", encryptedData);
            setEncryptedTransaction(encryptedData);
        } else {
            navigate('/');
        }
    }, [donationAmount, navigate]);


    // const SECRET_KEY = process.env.SBI_MERCHANT_TEST_KEY;  //TEST KEY
    // const SECRET_KEY = "fo9a6QBf4yA26n1RonRI/lDaIlMKJ8lIscxy2yYNdqs=" //PROD KEY
    const SECRET_KEY = process.env.SBI_MERCHANT_KEY
    const deriveKeyAndIV = (keyString) => {
        const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
        const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
        const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
        return { key, iv };
    };

    // Encrypt using AES-256-CBC
    const encryptAES256 = (data, secretKey) => {
        try {
            const { key, iv } = deriveKeyAndIV(secretKey);
            const encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });
            return encrypted.toString();
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    };

    // const verifyPayment = async (orderId, paymentId, signature) => {
    //     try {
    //         const response = await fetch(
    //             'https://dev.padmasaliglobal.com/jaiMp/payment/order/validate',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     razorpay_order_id: orderId,
    //                     razorpay_payment_id: paymentId,
    //                     razorpay_signature: signature,
    //                 }),
    //             }
    //         );
    //         const data = await response.json();
    //         console.log("payment res sucess data :", data);

    //         if (data.msg === 'success') {
    //             alert('Payment successful!');
    //             setSuccessPay(true)
    // const paymentDetails = data.paymentDetails;
    // const donationBody = {
    //     payment_id: paymentDetails?.id,
    //     order_id: paymentDetails?.order_id,
    //     signature: signature,
    //     amount: paymentDetails?.amount / 100,
    //     currency: paymentDetails?.currency,
    //     status: paymentDetails?.status,
    //     payment_method: paymentDetails?.method,
    //     created_at: paymentDetails?.created_at,
    //     profile_id: profileId,
    //     donation: true,
    //     membership: false,
    //     donation_id: donationwithId,
    // };
    // await APIServices.postDonationDataOfPerson(donationBody)
    //     .then((res) => {
    //         console.log("post donated person details :", res.data)
    //         if (res.data.message === 'Payment created successfully.') {
    //             setIsPaymentComplete(true);
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("err in posting :", err)
    //     })
    //         } else {
    //             alert('Payment verification failed.');
    //         }

    //         // setIsPaymentComplete(true);
    //     }
    //     catch (error) {
    //         console.error('Error in verifyPayment:', error);
    //     }
    // };

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
            <form
                id="sbiPaymentForm"
                name="ecom"
                method="post"
                // action="https://test.sbiepay.sbi/secure/AggregatorHostedListener"
                action='https://www.sbiepay.sbi/secure/AggregatorHostedListener'
            >
                <input type="hidden" name="EncryptTrans" value={encryptedTransaction} />
                {/* <input type="hidden" name="merchIdVal" value="1000605" />1003212 */}
                <input type="hidden" name="merchIdVal" value="1003212" />
                <input
                    type="submit"
                    value="Proceed to Payment"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#83214F',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                />
            </form>
        </div>
    );
};

export default Payment;





/////////////////////////////TO GET THE SECERT KEY /////////////////////////

// import React, { useEffect, useState } from 'react';
// import CryptoJS from "crypto-js";

// const Payment = () => {

//     const encryptedKey = "qtiJwE6COQLUbo2IivnofLgupaJ19x55e5ZxaMh2hSA4JZ1mHXenRbnpKHyvapAT";
//     const kek = "/oUM/2XEVSQX4a0AlMsurQ=="; // Base64 encoded KEK

//     const decryptMerchantKey = (encryptedKey, kek) => {
//         try {
//             const key = CryptoJS.enc.Base64.parse(kek);
//             const decrypted = CryptoJS.AES.decrypt(
//                 { ciphertext: CryptoJS.enc.Base64.parse(encryptedKey) },
//                 key,
//                 { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
//             );

//             return decrypted.toString(CryptoJS.enc.Utf8);
//         } catch (error) {
//             console.error("Decryption Error:", error);
//             return null;
//         }
//     };

//     const merchantKey = decryptMerchantKey(encryptedKey, kek);
//     console.log("Decrypted Merchant Encryption Key:", merchantKey);

//     return (
//         <button>Get the key</button>
//     )
// }

// export default Payment;