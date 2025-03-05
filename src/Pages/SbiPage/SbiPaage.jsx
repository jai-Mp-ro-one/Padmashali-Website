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



import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

const SBIPage = ({ profileId, donationAmount }) => {
    const [encryptedTransaction, setEncryptedTransaction] = useState("");
    const navigate = useNavigate();

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
        // const successUrl = "https://test.sbiepay.sbi/secure/sucess3.jsp";
        const successUrl = "https://dev.padmasaliglobal.com/jaimp/sbiepay/success-response"
        // const successUrl = `https://padmasaliglobal.com/verifypayment?orderNo=${orderNo}`;

        const transactionData = [
            "1000605",
            "DOM",
            "IN",
            "INR",
            "10000",
            "Other",
            successUrl,
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

