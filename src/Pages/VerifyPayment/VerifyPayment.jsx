import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyPayment = () => {
    const [searchParams] = useSearchParams();
    const [verificationResponse, setVerificationResponse] = useState(null);
    const orderNo = searchParams.get("orderNo"); // ✅ Extract orderNo from query params

    const DOUBLE_VERIFICATION_URL = "https://test.sbiepay.sbi/payagg/statusQuery/getStatusQuery";

    // useEffect(() => {
    //     if (!orderNo) {
    //         console.error("Order Number not found in URL.");
    //         return;
    //     }

    //     const verifyTransaction = async () => {
    //         try {
    //             const formData = new URLSearchParams({
    //                 queryRequest: `|1000605|${orderNo}|10000`,  // ✅ Required format: |MerchantID|OrderNo|Amount
    //                 aggregatorId: "SBIEPAY",
    //                 merchantId: "1000605"
    //             }).toString();

    //             const response = await fetch(DOUBLE_VERIFICATION_URL, {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //                 body: formData
    //             });

    //             const data = await response.text();
    //             console.log("🔍 Verification Response:", data);
    //             setVerificationResponse(data);
    //         } catch (error) {
    //             console.error("❌ Verification Error:", error);
    //         }
    //     };

    //     verifyTransaction();
    // }, [orderNo]); // ✅ Runs only when orderNo is available

    // Function to format SBIePay's response
    const formatResponse = (response) => {
        if (!response) return null;

        const responseArray = response.split("|");
        return {
            merchantId: responseArray[0],
            transactionId: responseArray[1],
            status: responseArray[2],
            country: responseArray[3],
            currency: responseArray[4],
            orderNo: responseArray[6],
            amount: responseArray[7],
            statusDescription: responseArray[8],
            bankCode: responseArray[9],
            transactionDate: responseArray[11],
            paymentMode: responseArray[12]
        };
    };

    const parsedResponse = formatResponse(verificationResponse);

    return (
        <div>
            <h2>🔍 Payment Verification</h2>
            <p><b>Order No:</b> {orderNo}</p>

            {parsedResponse ? (
                <div>
                    <h3>✅ Verification Details:</h3>
                    <p><b>Status:</b> {parsedResponse.status}</p>
                    <p><b>Transaction ID:</b> {parsedResponse.transactionId}</p>
                    <p><b>Amount:</b> {parsedResponse.amount} {parsedResponse.currency}</p>
                    <p><b>Payment Mode:</b> {parsedResponse.paymentMode}</p>
                    <p><b>Transaction Date:</b> {parsedResponse.transactionDate}</p>
                    <p><b>Status Description:</b> {parsedResponse.statusDescription}</p>
                </div>
            ) : (
                <p>Fetching verification details...</p>
            )}
        </div>
    );
};

export default VerifyPayment;
