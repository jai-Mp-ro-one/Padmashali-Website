import React, { useState } from "react";
import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";

const SBIPage = ({ profileId, donationAmount }) => {
    const [loading, setLoading] = useState(false);

    const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";


    // const deriveKeyAndIV = (keyString) => {
    //     const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
    //     const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
    //     const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
    //     return { key, iv };
    // };

    // // Encrypt using AES-256-CBC 
    // const encryptAES256 = (data, secretKey) => {
    //     try {
    //         const { key, iv } = deriveKeyAndIV(secretKey);

    //         const encrypted = CryptoJS.AES.encrypt(data, key, {
    //             iv: iv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.Pkcs7,
    //         });

    //         return encrypted.toString();
    //     } catch (error) {
    //         console.error("Encryption Error:", error);
    //         return null;
    //     }
    // };

    const encryptAES256ECB = (data, secretKey) => {
        try {
            const key = CryptoJS.enc.Utf8.parse(secretKey); // 32-byte key for AES-256
            const encrypted = CryptoJS.AES.encrypt(data, key, {
                mode: CryptoJS.mode.ECB, // ECB Mode (No IV required)
                padding: CryptoJS.pad.Pkcs7, // PKCS5/PKCS7 Padding
            });

            return encrypted.toString();
        } catch (error) {
            console.error("Encryption Error:", error);
            return null;
        }
    };

    // const handleDonate = async () => {
    //     try {
    //         setLoading(true);
    //         const orderNo = `ORD-${Date.now()}`;

    //         const transactionData = [
    //             "1000605", // Merchant ID
    //             "DOM", // Operating Mode
    //             "IN", // Merchant Country
    //             "INR", // Merchant Currency
    //             "100", // Posting Amount
    //             "Other", // Other Details
    //             "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
    //             "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
    //             "SBIEPAY",
    //             orderNo, // Merchant Order No
    //             String(19), // Merchant Customer ID
    //             "NB", // Paymode
    //             "ONLINE", // Access Medium
    //             "ONLINE", // Transaction Source
    //         ].join("|");

    //         console.log("Transaction Data:", transactionData);

    //         const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
    //         console.log("Encrypted Transaction Data:", encryptedTransactionData);
    //         const formBody = new URLSearchParams({
    //             EncryptTrans: encryptedTransactionData,
    //             merchIdVal: "1000605",
    //         }).toString();

    //         console.log("FormData to Send:", formBody);

    //         const response = await fetch("https://test.sbiepay.sbi/secure/AggregatorHostedListener", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //             },
    //             body: formBody,
    //         });

    //         console.log("Response:", await response);
    //     } catch (error) {
    //         console.error("Payment initiation error:", error);
    //         alert("Payment Error: Failed to initiate payment. Please try again.");
    //     } finally {
    //         setLoading(false);
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
    //             "100", // Posting Amount
    //             "Other", // Other Details
    //             "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
    //             "https://test.sbiepay.sbi/secure/fail3.jsp", // Fail URL
    //             "SBIEPAY",
    //             orderNo, // Merchant Order No
    //             String(19), // Merchant Customer ID
    //             "NB", // Paymode
    //             "ONLINE", // Access Medium
    //             "ONLINE", // Transaction Source
    //         ].join("|");

    //         console.log("Transaction Data:", transactionData);

    //         const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
    //         console.log("Encrypted Transaction Data:", encryptedTransactionData);

    //         // Convert data to x-www-form-urlencoded format
    //         const formBody = new URLSearchParams({
    //             EncryptTrans: encryptedTransactionData,
    //             merchIdVal: "1000605",
    //         }).toString();

    //         console.log("FormData to Send:", formBody);


    //         // Call the backend proxy instead of SBI directly
    //         const response = await fetch("http://192.168.10.20:8088/jaiMp/sbiepay/proxy-payment", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //             },
    //             body: formBody,
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const responseData = await response.text();
    //         console.log("Payment Gateway Response:", responseData);

    //         // Handle redirect to payment page if necessary
    //         document.body.innerHTML += responseData; // Injects the form response (if HTML is returned)

    //     } catch (error) {
    //         console.error("Payment initiation error:", error);
    //         alert("Payment Error: Failed to initiate payment. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };



    // const handleDonate = async () => {
    //     try {
    //         setLoading(true);
    //         const orderNo = `ORD-${Date.now()}`;

    //         const transactionData = [
    //             "1000605", "DOM", "IN", "INR", "100", "Other",
    //             "https://test.sbiepay.sbi/secure/sucess3.jsp",
    //             "https://test.sbiepay.sbi/secure/fail3.jsp",
    //             "SBIEPAY", orderNo, String(19), "NB", "ONLINE", "ONLINE"
    //         ].join("|");

    //         console.log("Transaction Data:", transactionData);

    //         const encryptedTransactionData = encryptAES256(transactionData, SECRET_KEY);
    //         console.log("Encrypted Transaction Data:", encryptedTransactionData);

    //         const formBody = new URLSearchParams({
    //             EncryptTrans: encryptedTransactionData,
    //             merchIdVal: "1000605",
    //         }).toString();

    //         console.log("FormData to Send:", formBody);

    //         const response = await fetch("http://192.168.10.20:8088/jaiMp/sbiepay/proxy-payment", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //             body: formBody,
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const responseData = await response.text();
    //         console.log("Payment Gateway Response:", responseData);

    //         // Properly inject the SBI payment page
    //         document.open();
    //         document.write(responseData);
    //         document.close();

    //     } catch (error) {
    //         console.error("Payment initiation error:", error);
    //         alert("Payment Error: Failed to initiate payment. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleDonate = async () => {
        try {
            setLoading(true);
            const orderNo = `ORD-${Date.now()}`;

            const transactionData = [
                "1000605",  // Merchant ID
                "DOM",      // Operating Mode
                "IN",       // Merchant Country
                "INR",      // Merchant Currency
                "100",      // Posting Amount
                "Other",    // Other Details
                "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
                "https://test.sbiepay.sbi/secure/fail3.jsp",   // Fail URL
                "SBIEPAY",
                orderNo,     // Merchant Order No
                "19",        // Merchant Customer ID
                "NB",        // Paymode
                "ONLINE",    // Access Medium
                "ONLINE",    // Transaction Source
            ].join("|");

            console.log("Transaction Data:", transactionData);

            const encryptedTransactionData = encryptAES256ECB(transactionData, SECRET_KEY);
            console.log("Encrypted Transaction Data:", encryptedTransactionData);

            // Convert data to x-www-form-urlencoded format
            const formBody = new URLSearchParams({
                EncryptTrans: encryptedTransactionData,
                merchIdVal: "1000605",
            }).toString();

            console.log("FormData to Send:", formBody);

            // Call backend proxy API
            const response = await fetch("https://dev.padmasaliglobal.com/jaiMp/sbiepay/proxy-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Get HTML response from backend
            const responseData = await response.text();
            console.log("Payment Gateway Response:", responseData);

            // Inject the received HTML into the document and execute it
            const newWindow = window.open("", "_self"); // Open in same tab (use "_blank" for new tab)
            newWindow.document.write(responseData);
            newWindow.document.close();

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
