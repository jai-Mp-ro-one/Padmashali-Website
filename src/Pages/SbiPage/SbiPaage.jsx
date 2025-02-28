import React, { useState } from "react";
import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";

const SBIPage = ({ profileId, donationAmount }) => {
    const [loading, setLoading] = useState(false);

    const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";

    const encryptAES256 = (data, key) => {
        try {
            const keyBytes = CryptoJS.enc.Base64.parse(key); // Decode base64 key
            const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV

            const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });

            // Return Base64 IV + Ciphertext
            return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    };

    const handleDonate = async () => {
        try {
            setLoading(true);
            const orderNo = `ORD-${Date.now()}`;

            const transactionData = [
                "1000605", // Merchant ID
                "DOM", // Operating Mode
                "IN", // Merchant Country
                "INR", // Merchant Currency
                100, // Posting Amount
                "Other", // Other Details
                "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
                "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
                "SBIEPAY",
                "SbiPadmasali", // Merchant Order No
                String(19), // Merchant Customer ID
                "NB", // Paymode
                "ONLINE", // Access Medium
                "ONLINE", // Transaction Source
            ].join("|");

            console.log("Transaction Data (Plain):", transactionData);

            // Correct Encoding
            // const encodedTransactionData = Base64.encode(transactionData);
            // console.log("Encoded Transaction Data: ", encodedTransactionData);

            const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
            console.log("🔒 Encrypted Transaction Data:", encryptedTransactionData);

            const formData = new FormData();
            formData.append("EncryptTrans", encryptedTransactionData);
            formData.append("merchIdVal", "1000605");
            // formData.append("EncryptpaymentDetails", "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=");
            // formData.append("neftRtgsMobileNumber", "");


            // 🛑 Remove `Content-Type`, let browser set it
            const response = await fetch("https://test.sbiepay.sbi/secure/AggregatorHostedListener", {
                method: "POST",
                body: formData,
            });

            // const formData = new FormData();
            // formData.append("EncryptTrans", encodedTransactionData);
            // // formData.append("EncryptbillingDetails", "your-encrypted-billing-details");
            // formData.append("merchIdVal", "1000605");
            // // formData.append("EncryptpaymentDetails", "your-encrypted-payment-details");
            // formData.append("neftRtgsMobileNumber", "");

            console.log("formData: ", formData)
            // const response = await fetch("http://192.168.10.27:8088/jaiMp/sbiepay/api/sbiepay", {
            //     method: "POST",
            //     body: formData,
            // });

            console.log("Response:", response);

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
