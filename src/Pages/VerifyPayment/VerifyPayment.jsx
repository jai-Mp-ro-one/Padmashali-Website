import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyPayment = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const [transactionStatus, setTransactionStatus] = useState("");

    const queryParams = new URLSearchParams(location.search);
    const orderNo = queryParams.get('orderNo');
    const amount = queryParams.get("amount");
    console.log("orderNo, amount: ", orderNo, amount)

    // const appUrl = `https://padmasaliglobal.com/app/payment-success?amount=${donationAmount}&donationwithId=${donationwithId}&isPaymentSuccess=${successPay}`;
    // const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.yourapp.package';

    // Redirect to app
    // window.location.href = appUrl;

    // const body = `|1000605|ORD-1740990933669-775|10000`
    const body = `|1000605|${orderNo}|${amount}`
    console.log(body)


    return (
        <div>
            <p><b>Verify Payment</b> Enter Order No. to check status.</p>

            <form name="ecom"
                method="post"
                action="https://test.sbiepay.sbi/payagg/statusQuery/getStatusQuery">
                <input type="text" name="queryRequest" value={body} />
                <input type="text" name="aggregatorId" value="SBIEPAY" />
                <input type="text" name="merchantId" value="1000605" />

                <input type="submit" name="submit" value="Check Status" />
            </form>

            {transactionStatus && (
                <div>
                    <h3>Transaction Status:</h3>
                    <p>{transactionStatus}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyPayment;
