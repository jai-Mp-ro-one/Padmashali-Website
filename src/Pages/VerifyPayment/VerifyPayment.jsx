// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import APIServices from "../../APIServices/APIServices";

// const VerifyPayment = () => {
//     const navigate = useNavigate()
//     const location = useLocation();

//     const [transactionStatus, setTransactionStatus] = useState("");

//     const queryParams = new URLSearchParams(location.search);
//     const orderNo = queryParams.get('orderNo');
//     const amount = queryParams.get("amount");
//     const paymentId = queryParams.get("paymentId")
//     const status = queryParams.get("status")
//     const signature = queryParams.get("signature")
//     const donationId = queryParams.get("donationId")
//     console.log("orderNo, amount: ", orderNo, amount, paymentId, status, signature, donationId)

//     // const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
//     // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

//     // Redirect to app
//     // window.location.href = appUrl;

//     // const body = `|1000605|ORD-1740990933669-775|10000`
//     const body = `|1000605|${orderNo}|${amount}`
//     console.log(body)

//     const handleRedirectToApp = async () => {
//         const verifyPaymentBody = {
//             orderNo: orderNo,
//             amount: amount
//         }

//         // APIServices.verifyDonationPayment(verifyPaymentBody)
//         //     .then((response) => {
//         //         console.log("response: ", response)
//         //     })
//         //     .catch((error) => {
//         //         console.log("Getting error while verfying the payment: ", error)
//         //     })

//     }


//     return (
//         <div>
//             <h3>Your payment is successful</h3>

//             <form name="ecom"
//                 method="post"
//                 action="https://test.sbiepay.sbi/payagg/statusQuery/getStatusQuery">
//                 <input type="text" name="queryRequest" value={body} />
//                 <input type="text" name="aggregatorId" value="SBIEPAY" />
//                 <input type="text" name="merchantId" value="1000605" />

//                 <input type="submit" name="submit" value="Go to app"
//                     onClick={handleRedirectToApp}
//                     style={{
//                         padding: '10px 20px',
//                         backgroundColor: '#83214F',
//                         color: '#fff',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                     }} />
//             </form>
//         </div>
//     );
// };

// export default VerifyPayment;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import APIServices from "../../APIServices/APIServices";

const VerifyPayment = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [transactionStatus, setTransactionStatus] = useState("");

    const queryParams = new URLSearchParams(location.search);
    const orderNo = queryParams.get('orderNo');
    const amount = queryParams.get("amount");
    const paymentId = queryParams.get("paymentId")
    const status = queryParams.get("status")
    const signature = queryParams.get("signature")
    const donationId = queryParams.get("donationId")
    const profileId = queryParams.get("profileId")
    const createdAt = queryParams.get("date")
    console.log(donationId)
    console.log("orderNo, amount: ", orderNo, amount, paymentId, status, signature, donationId, profileId)

    // const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
    // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

    // Redirect to app
    // window.location.href = appUrl;

    // const body = `|1000605|ORD-1740990933669-775|10000`
    const body = `|1000605|${orderNo}|${amount}`
    console.log(body)

    const handleRedirectToApp = async () => {
        const donationBody = {
            payment_id: paymentId,
            order_id: orderNo,
            signature: signature,
            amount: amount,
            currency: "INR",
            status: status,
            // payment_method: paymentDetails?.method,
            created_at: createdAt,
            profile_id: profileId,
            donation: donationId !== null,
            membership: donationId === null,
            donation_id: donationId,
        };
        console.log("donationBody: ", donationBody)

        await APIServices.postDonationDataOfPerson(donationBody)
            .then((res) => {

                if (res.data.message === 'Payment created successfully.') {
                    console.log("post donated person details :", res.data)
                }
            })
            .catch((err) => {
                console.log("err in posting :", err)
            })


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
