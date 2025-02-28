import React, { useState } from "react";
import { Base64 } from "js-base64";

const SBIPage = ({ profileId, donationAmount }) => {
    const [loading, setLoading] = useState(false);

    const handleDonate = async () => {
        try {
            setLoading(true);
            const orderNo = `ORD-${Date.now()}`;

            const transactionData = [
                "1000605", // Merchant ID
                "DOM", // Operating Mode
                "IN", // Merchant Country
                "INR", // Merchant Currency
                donationAmount, // Posting Amount
                "Other", // Other Details
                "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
                "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
                "SBIEPAY",
                "SbiPadmasali", // Merchant Order No
                String(profileId), // Merchant Customer ID
                "NB", // Paymode
                "ONLINE", // Access Medium
                "ONLINE", // Transaction Source
            ].join("|");

            console.log("Transaction Data (Plain):", transactionData);

            // Correct Encoding
            const encodedTransactionData = Base64.encode(transactionData);
            console.log("Encoded Transaction Data: ", encodedTransactionData);

            const formData = new FormData();
            formData.append("EncryptTrans", encodedTransactionData);
            formData.append("merchIdVal", "1000605");
            formData.append("EncryptpaymentDetails", "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=");

            console.log("FormData: ", formData);

            const body = {
                EncryptTrans: encodedTransactionData,
                merchIdVal: "1000605",
                EncryptpaymentDetails: "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4="
            }

            const payload = new URLSearchParams();
            payload.append("EncryptTrans", encodedTransactionData);
            payload.append("EncryptbillingDetails", "your-encrypted-billing-details");
            payload.append("merchIdVal", "1000605");
            payload.append("EncryptpaymentDetails", "your-encrypted-payment-details");
            payload.append("neftRtgsMobileNumber", "");

            const response = await fetch("https://test.sbiepay.sbi/secure/AggregatorHostedListener", {
                method: "POST",
                headers: { "Content-Type": "multipart/form-data" },
                body: payload,
            });

            console.log("response: ", response)

            // const formData = new FormData();
            // formData.append("EncryptTrans", encodedTransactionData);
            // // formData.append("EncryptbillingDetails", "your-encrypted-billing-details");
            // formData.append("merchIdVal", "1000605");
            // // formData.append("EncryptpaymentDetails", "your-encrypted-payment-details");
            // formData.append("neftRtgsMobileNumber", "");

            // console.log("formData: ", formData)
            // const response = await fetch("https://dev.padmasaliglobal.com/jaiMp/sbiepay/api/sbiepay", {
            //     method: "POST",
            //     body: formData,
            // });

            // console.log("Response:", response);

        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Payment Error: Failed to initiate payment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleDonate} disabled={loading}>
                {loading ? "Processing..." : "Click here to Donate"}
            </button>
        </div>
    );
};

export default SBIPage;
