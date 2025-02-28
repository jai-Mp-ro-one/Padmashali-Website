import React, { useState } from "react";
import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";

const SBIPage = ({ profileId, donationAmount }) => {
    const [loading, setLoading] = useState(false);

    const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";

    // const encryptAES256 = (data, key) => {
    //     try {
    //         const keyBytes = CryptoJS.enc.Base64.parse(key); // Decode base64 key
    //         const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV

    //         const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
    //             iv: iv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.Pkcs7,
    //         });

    //         // Return Base64 IV + Ciphertext
    //         return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
    //     } catch (error) {
    //         console.error("Encryption Error:", error);
    //         return null;
    //     }
    // };



    // const encryptAES256 = (data, key) => {
    //     try {
    //         const keyBytes = CryptoJS.enc.Base64.parse(key); // Decode Base64 key
    //         const iv = CryptoJS.lib.WordArray.random(16); // Generate random IV

    //         const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
    //             iv: iv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.Pkcs7,
    //         });

    //         // Concatenating IV + Ciphertext and encoding in Base64
    //         return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
    //     } catch (error) {
    //         console.error("Encryption Error:", error);
    //         return null;
    //     }
    // };


    // const handleDonate = async () => {
    //     try {
    //         setLoading(true);
    //         const orderNo = `ORD-${Date.now()}`;

    //         const transactionData = [
    //             "1000605", // Merchant ID
    //             "DOM", // Operating Mode
    //             "IN", // Merchant Country
    //             "INR", // Merchant Currency
    //             100, // Posting Amount
    //             "Other", // Other Details
    //             "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
    //             "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
    //             "SBIEPAY",
    //             "SbiPadmasali", // Merchant Order No
    //             String(19), // Merchant Customer ID
    //             "NB", // Paymode
    //             "ONLINE", // Access Medium
    //             "ONLINE", // Transaction Source
    //         ].join("|");

    //         console.log("Transaction Data (Plain):", transactionData);

    //         // Correct Encoding
    //         // const encodedTransactionData = Base64.encode(transactionData);
    //         // console.log("Encoded Transaction Data: ", encodedTransactionData);

    //         const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
    //         console.log("🔒 Encrypted Transaction Data:", encryptedTransactionData);

    //         const formData = new FormData();
    //         formData.append("EncryptTrans", encryptedTransactionData);
    //         formData.append("merchIdVal", "1000605");
    //         // formData.append("EncryptpaymentDetails", "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=");
    //         // formData.append("neftRtgsMobileNumber", "");


    //         // 🛑 Remove `Content-Type`, let browser set it
    //         const response = await fetch("https://test.sbiepay.sbi/secure/AggregatorHostedListener", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         // const formData = new FormData();
    //         // formData.append("EncryptTrans", encodedTransactionData);
    //         // // formData.append("EncryptbillingDetails", "your-encrypted-billing-details");
    //         // formData.append("merchIdVal", "1000605");
    //         // // formData.append("EncryptpaymentDetails", "your-encrypted-payment-details");
    //         // formData.append("neftRtgsMobileNumber", "");

    //         console.log("formData: ", formData)
    //         // const response = await fetch("http://192.168.10.27:8088/jaiMp/sbiepay/api/sbiepay", {
    //         //     method: "POST",
    //         //     body: formData,
    //         // });

    //         console.log("Response:", response);

    //     } catch (error) {
    //         console.error("Payment initiation error:", error);
    //         alert("Payment Error: Failed to initiate payment. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    // 🔑 Convert Key using the same logic as Java's `readKeyBytes` function
    const deriveKeyAndIV = (keyString) => {
        const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
        const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4)); // First 16 bytes for key
        const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4)); // First 16 bytes for IV
        return { key, iv };
    };

    // 🔒 Encrypt using AES-256-CBC (Matching Java AES256Bit.encrypt)
    const encryptAES256 = (data, secretKey) => {
        try {
            const { key, iv } = deriveKeyAndIV(secretKey);

            const encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            });

            return encrypted.toString(); // Returns Base64 encrypted string
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    };

    // 🔹 Transaction Data
    const handleDonate = async () => {
        try {
            setLoading(true);
            const orderNo = `ORD-${Date.now()}`;

            // 🔹 Transaction Data Format
            const transactionData = [
                "1000605", // Merchant ID
                "DOM", // Operating Mode
                "IN", // Merchant Country
                "INR", // Merchant Currency
                "100", // Posting Amount
                "Other", // Other Details
                "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
                "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
                "SBIEPAY",
                orderNo, // Merchant Order No
                String(19), // Merchant Customer ID
                "NB", // Paymode
                "ONLINE", // Access Medium
                "ONLINE", // Transaction Source
            ].join("|");

            console.log("📄 Transaction Data (Plain):", transactionData);

            // 🔐 Encrypt the transaction data
            const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
            console.log("🔒 Encrypted Transaction Data:", encryptedTransactionData);

            // 🏷️ Prepare FormData for request
            // const formData = new FormData();
            // formData.append("EncryptTrans", encryptedTransactionData);
            // formData.append("merchIdVal", "1000605");
            const formBody = new URLSearchParams({
                EncryptTrans: encryptedTransactionData,
                merchIdVal: "1000605",
            }).toString();

            console.log("📦 FormData to Send:", formBody);

            // 🛠️ Send Request
            const response = await fetch("https://test.sbiepay.sbi/secure/AggregatorHostedListener", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formBody,
            });

            console.log("✅ Response:", await response.text());
        } catch (error) {
            console.error("❌ Payment initiation error:", error);
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
