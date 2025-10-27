import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const merchantID = process.env.REACT_APP_SBI_MERCHANT_ID

    const queryParams = new URLSearchParams(location.search);
    const donationAmount = queryParams.get('amount');
    const donationwithId = queryParams.get("donationwithId");
    const profileId = queryParams.get("profile-id");
    const [encryptedTransaction, setEncryptedTransaction] = useState("");
    const othersOption = donationwithId ? `${donationwithId}&${profileId}` : `0&${profileId}`
    const SECRET_KEY = process.env.REACT_APP_SBI //PROD KEY
    // const SECRET_KEY = process.env.REACT_APP_SBI_MERCHANT_TEST_KEY


    // Encrypt using AES-256-CBC
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (donationAmount) {
            const orderNo = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            // const successUrl = "https://test.sbiepay.sbi/secure/sucess3.jsp";
            // const successUrl = `https://padmasaliglobal.com/verifypayment?orderNo=${orderNo}&amount=${donationAmount}`;
            // const failureUrl = "https://padmasaliglobal.com/payment-failed"
            const successUrl = "https://dev.padmasaliglobal.com/jaimp/sbiepay/success-response"
            const failureUrl = "https://dev.padmasaliglobal.com/jaimp/sbiepay/failure-response"
            const transactionData = [
                // process.env.REACT_APP_SBI_MERCHANT_TEST_ID,
                process.env.REACT_APP_SBI_MERCHANT_ID,
                "DOM",
                "IN",
                "INR",
                donationAmount,
                othersOption,
                successUrl,
                failureUrl,
                "SBIEPAY",
                orderNo,
                profileId,
                "NB",
                "ONLINE",
                "ONLINE",
            ].join("|");


            const encryptedData = encryptAES256(transactionData, SECRET_KEY);
            setEncryptedTransaction(encryptedData);
        } else {
            navigate('/');
        }
    }, [donationAmount, navigate, SECRET_KEY, othersOption, profileId, encryptAES256]);




    const deriveKeyAndIV = (keyString) => {
        const keyBytes = CryptoJS.enc.Utf8.parse(keyString);
        const key = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
        const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4));
        return { key, iv };
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <form
                id="sbiPaymentForm"
                name="ecom"
                method="post"
                // action="https://test.sbiepay.sbi/secure/AggregatorHostedListener" //Test URL
                action='https://www.sbiepay.sbi/secure/AggregatorHostedListener'
            >
                <input type="hidden" name="EncryptTrans" value={encryptedTransaction} />
                <input type="hidden" name="merchIdVal" value={merchantID} />
                <input
                    type="submit"
                    value="Proceed to Payment"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#83214F',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                />
            </form>
        </div>
    );
};

export default Payment;
