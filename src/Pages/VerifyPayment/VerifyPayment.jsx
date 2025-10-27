// import { useState } from "react";
import { useLocation } from "react-router-dom";
// import APIServices from "../../APIServices/APIServices";

const VerifyPayment = () => {
    // const navigate = useNavigate()
    const location = useLocation();

    // const [transactionStatus, setTransactionStatus] = useState("");

    const queryParams = new URLSearchParams(location.search);
    // const orderNo = queryParams.get('orderNo');
    const amount = queryParams.get("amount");
    // const paymentId = queryParams.get("paymentId")
    const status = queryParams.get("status")
    // const signature = queryParams.get("signature")
    const donationId = queryParams.get("donationId")
    const profileId = queryParams.get("profileId")
    // const createdAt = queryParams.get("date")
    // console.log(donationId)
    // console.log("orderNo, amount: ", orderNo, amount, paymentId, status, signature, donationId, profileId)

    // const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
    // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

    // Redirect to app
    // window.location.href = appUrl;

    // const body = `|1000605|ORD-1740990933669-775|10000`
    // const body = `|1000605|${orderNo}|${amount}`
    // console.log(body)

    const handleRedirectToApp = async () => {
        // console.log('got app ')
        // const donationBody = {
        //     payment_id: paymentId,
        //     order_id: orderNo,
        //     signature: signature,
        //     amount: amount,
        //     currency: "INR",
        //     status: status,
        //     // payment_method: paymentDetails?.method,
        //     created_at: createdAt,
        //     profile_id: profileId,
        //     donation: donationId !== "0",
        //     membership: donationId === '0',
        //     donation_id: donationId === '0' ? null : donationId,
        // };
        // console.log("donationBody: ", donationBody)

        if (donationId !== '0') {
            // console.log("post donated person details :", res.data)
            const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${amount}&donationwithId=${donationId}&isPaymentSuccess=${status}`;
            // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';
            window.location.href = appUrl;
        } else {
            // console.log("membership screen")
            const appUrl = `https://padmasaliglobal.com/app/user/${profileId}`;
            // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';
            window.location.href = appUrl;
        }

        // await APIServices.postDonationDataOfPerson(donationBody)
        //     .then((res) => {
        //         if (res.data.message === 'Payment created successfully.') {
        //             if (donationId !== '0') {
        //                 console.log("post donated person details :", res.data)
        //                 const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${amount}&donationwithId=${donationId}&isPaymentSuccess=${status}`;
        //                 const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';
        //                 window.location.href = appUrl;
        //             } else {
        //                 console.log("membership screen")
        //                 const appUrl = `https://padmasaliglobal.com/app/user/${profileId}`;
        //                 const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.padmasali';
        //                 window.location.href = appUrl;
        //             }

        //         }
        //     })
        //     .catch((err) => {
        //         console.log("err in posting :", err)
        //     })

        // const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${amount}&donationwithId=${donationId}&isPaymentSuccess=${status}`;
        // console.log("appUrl: ", appUrl)
        // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';
        // Redirect to app
        // window.location.href = appUrl;

    }

    return (
        <div>
            <h3>Your payment is successful</h3>
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

export default VerifyPayment;
