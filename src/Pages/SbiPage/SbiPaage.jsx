// import React from 'react';
// const SBIPage = () => {
//     return (
//         <div>
//             <p><b>Encrypted</b> Encrypting... EncryptTrans.</p>

//             <form
//                 name="ecom"
//                 method="post"
//                 action="https://test.sbiepay.sbi/secure/AggregatorHostedListener"
//             >
//                 <input type="text" name="EncryptTrans" defaultValue="" />
//                 <input type="text" name="merchIdVal" defaultValue="1000605" />
//                 <input type="submit" name="submit" value="Submit" />
//             </form>
//         </div>
//     );
// };

// export default SBIPage



// import React, { useEffect, useState } from "react";
// import CryptoJS from "crypto-js";

// const SBIPage = ({ profileId, donationAmount }) => {
//     const [encryptedTransaction, setEncryptedTransaction] = useState("");
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     console.log("encryptedTransaction: ", encryptedTransaction)

//     const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";

//     const deriveKeyAndIV = (keyString) => {
//         const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
//         const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
//         const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
//         return { key, iv };
//     };

//     // Encrypt using AES-256-CBC 
//     const encryptAES256 = (data, secretKey) => {
//         try {
//             const { key, iv } = deriveKeyAndIV(secretKey);

//             const encrypted = CryptoJS.AES.encrypt(data, key, {
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             });

//             return encrypted.toString();
//         } catch (error) {
//             console.error("Encryption Error:", error);
//             return null;
//         }
//     };



//     useEffect(() => {

//         const orderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // ✅ Always Unique

//         const transactionData = [
//             "1000605",  // Merchant ID
//             "DOM",      // Operating Mode
//             "IN",       // Merchant Country
//             "INR",      // Merchant Currency
//             '10000', // Posting Amount
//             "Other",    // Other Details
//             "https://test.sbiepay.sbi/secure/sucess3.jsp", // Success URL
//             "https://test.sbiepay.sbi/secure/fail3.jsp",   // Fail URL
//             "SBIEPAY",
//             orderNo,     // Merchant Order No
//             "19",   // Merchant Customer ID
//             "NB",        // Paymode
//             "ONLINE",    // Access Medium
//             "ONLINE",    // Transaction Source
//         ].join("|");

//         console.log("Transaction Data:", transactionData);

//         // Encrypt Transaction Data
//         const encryptedData = encryptAES256(transactionData, SECRET_KEY);
//         console.log("Encrypted Transaction Data:", encryptedData);

//         setEncryptedTransaction(encryptedData);
//     }, [])


//     return (
//         <div>
//             <p><b>Encrypted</b> Transaction Data will be generated on button click.</p>

//             <form
//                 id="sbiPaymentForm"
//                 name="ecom"
//                 method="post"
//                 action="https://test.sbiepay.sbi/secure/AggregatorHostedListener"
//             >
//                 <input type="text" name="EncryptTrans" value={encryptedTransaction} />
//                 <input type="text" name="merchIdVal" value="1000605" />
//                 <input
//                     type="submit"
//                     value="Proceed to Payment"
//                 // onClick={handleEncryptAndSubmit}
//                 // disabled={formSubmitted}
//                 />
//             </form>
//         </div>
//     );
// };

// export default SBIPage;



import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate for redirection

const SBIPage = ({ profileId, donationAmount }) => {
    const [encryptedTransaction, setEncryptedTransaction] = useState("");
    const navigate = useNavigate();  // ✅ Initialize navigate function

    console.log("Encrypted Transaction:", encryptedTransaction);

    const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";

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

    useEffect(() => {
        const orderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // ✅ Success URL modified to include orderNo in query params
        // const successUrl = `https://your-frontend.com/verifypayment?orderNo=${orderNo}`;
        const successUrl = `https://padmasaliglobal.com/verifypayment?orderNo=${orderNo}`;

        const transactionData = [
            "1000605",
            "DOM",
            "IN",
            "INR",
            "10000",
            "Other",
            successUrl,  // ✅ Pass orderNo in success URL
            "https://test.sbiepay.sbi/secure/fail3.jsp",
            "SBIEPAY",
            orderNo,
            "19",
            "NB",
            "ONLINE",
            "ONLINE",
        ].join("|");

        console.log("Transaction Data:", transactionData);

        // Encrypt Transaction Data
        const encryptedData = encryptAES256(transactionData, SECRET_KEY);
        console.log("Encrypted Transaction Data:", encryptedData);
        setEncryptedTransaction(encryptedData);
    }, []);

    return (
        <div>
            <p><b>Encrypted</b> Transaction Data will be generated on button click.</p>

            <form
                id="sbiPaymentForm"
                name="ecom"
                method="post"
                action="https://test.sbiepay.sbi/secure/AggregatorHostedListener"
            >
                <input type="hidden" name="EncryptTrans" value={encryptedTransaction} />
                <input type="hidden" name="merchIdVal" value="1000605" />
                <input
                    type="submit"
                    value="Proceed to Payment"
                />
            </form>
        </div>
    );
};

export default SBIPage;





// import React, { useState } from "react";
// import CryptoJS from "crypto-js";

// const SBIPage = ({ profileId, donationAmount }) => {
//     const [encryptedTransaction, setEncryptedTransaction] = useState("");
//     const [orderNo, setOrderNo] = useState(""); // ✅ Store orderNo for verification
//     const [formSubmitted, setFormSubmitted] = useState(false);
//     const [verificationResponse, setVerificationResponse] = useState("");

//     console.log("Verification Response:", verificationResponse);
//     console.log("Encrypted Transaction:", encryptedTransaction);

//     const SECRET_KEY = "pWhMnIEMc4q6hKdi2Fx50Ii8CKAoSIqv9ScSpwuMHM4=";
//     const DOUBLE_VERIFICATION_URL = "https://test.sbiepay.sbi/payagg/statusQuery/getStatusQuery";

//     const deriveKeyAndIV = (keyString) => {
//         const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
//         const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
//         const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
//         return { key, iv };
//     };

//     // Encrypt using AES-256-CBC
//     const encryptAES256 = (data, secretKey) => {
//         try {
//             const { key, iv } = deriveKeyAndIV(secretKey);
//             const encrypted = CryptoJS.AES.encrypt(data, key, {
//                 iv: iv,
//                 mode: CryptoJS.mode.CBC,
//                 padding: CryptoJS.pad.Pkcs7,
//             });

//             return encrypted.toString();
//         } catch (error) {
//             console.error("Encryption Error:", error);
//             return null;
//         }
//     };

//     // Generate encrypted transaction data on button click
//     const handleEncryptAndSubmit = async () => {
//         const uniqueOrderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
//         setOrderNo(uniqueOrderNo); // ✅ Store order number for verification

//         const transactionData = [
//             "1000605",
//             "DOM",
//             "IN",
//             "INR",
//             "10000",
//             "Other",
//             "https://test.sbiepay.sbi/secure/sucess3.jsp",
//             "https://test.sbiepay.sbi/secure/fail3.jsp",
//             "SBIEPAY",
//             uniqueOrderNo,
//             "19",
//             "NB",
//             "ONLINE",
//             "ONLINE",
//         ].join("|");

//         console.log("Transaction Data:", transactionData);

//         const encryptedData = encryptAES256(transactionData, SECRET_KEY);
//         console.log("Encrypted Transaction Data:", encryptedData);

//         setEncryptedTransaction(encryptedData);
//         setFormSubmitted(true);

//         // Auto-submit form
//         setTimeout(() => {
//             document.getElementById("sbiPaymentForm").submit();
//         }, 1000);
//     };

//     // Function to verify transaction after success
//     const verifyTransaction = async () => {
//         if (!orderNo) {
//             alert("Order Number not found. Please complete the payment first.");
//             return;
//         }

//         try {
//             const formData = new URLSearchParams({
//                 queryRequest: `|1000605|${orderNo}|${donationAmount}`, // ✅ Format required by SBIePay
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

//     // Helper function to parse SBIePay's response
//     const parseVerificationResponse = (response) => {
//         if (!response) return null;

//         const responseArray = response.split("|");
//         return {
//             merchantId: responseArray[0],
//             transactionId: responseArray[1],
//             status: responseArray[2],
//             country: responseArray[3],
//             currency: responseArray[4],
//             orderNo: responseArray[6],
//             amount: responseArray[7],
//             statusDescription: responseArray[8],
//             bankCode: responseArray[9],
//             transactionDate: responseArray[11],
//             paymentMode: responseArray[12]
//         };
//     };

//     const parsedResponse = parseVerificationResponse(verificationResponse);

//     return (
//         <div>
//             <p><b>Encrypted</b> Transaction Data will be generated on button click.</p>

//             {/* Transaction Form */}
//             <form
//                 id="sbiPaymentForm"
//                 name="ecom"
//                 method="post"
//                 action="https://test.sbiepay.sbi/secure/AggregatorHostedListener"
//             >
//                 <input type="hidden" name="EncryptTrans" value={encryptedTransaction} />
//                 <input type="hidden" name="merchIdVal" value="1000605" />
//                 <input
//                     type="button"
//                     value="Proceed to Payment"
//                     onClick={handleEncryptAndSubmit}
//                     disabled={formSubmitted}
//                 />
//             </form>

//             {/* Double Verification Button */}
//             <button onClick={verifyTransaction} disabled={!formSubmitted}>
//                 Verify Transaction
//             </button>

//             {/* Show Verification Response */}
//             {parsedResponse && (
//                 <div>
//                     <h3>🔍 Verification Details:</h3>
//                     <p><b>Status:</b> {parsedResponse.status}</p>
//                     <p><b>Order No:</b> {parsedResponse.orderNo}</p>
//                     <p><b>Transaction ID:</b> {parsedResponse.transactionId}</p>
//                     <p><b>Amount:</b> {parsedResponse.amount} {parsedResponse.currency}</p>
//                     <p><b>Payment Mode:</b> {parsedResponse.paymentMode}</p>
//                     <p><b>Transaction Date:</b> {parsedResponse.transactionDate}</p>
//                     <p><b>Status Description:</b> {parsedResponse.statusDescription}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SBIPage;
