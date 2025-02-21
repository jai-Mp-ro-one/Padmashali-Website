import React, { useState } from "react";
import "./Login.css";
import APIServices from "../../APIServices/APIServices";
import { setIsLoggedIn, setLoginId, setProfileData, setRefreshToken, setToken, setUniqueDeviceId } from "../../Redux/Action";
import { useDispatch } from "react-redux";
import uuid from 'react-native-uuid';
import { useNavigate } from "react-router";

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [mobileNumber, setMobileNumber] = useState("");
    const [isMobileSubmitted, setIsMobileSubmitted] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);

    const getUniqueId = () => {
        return uuid.v4();
    };


    const handleMobileSubmit = (e) => {
        e.preventDefault();
        console.log("Mobile Number Submitted:", mobileNumber);

        const body = { mobile: mobileNumber };
        APIServices.verifyMobileNumber(body)
            .then((response) => {
                console.log(response.data);
                setIsMobileSubmitted(true); // Hide mobile input and show OTP input
            })
            .catch((error) => {
                console.error("Error Verifying Mobile Number: ", error);
            });
    };

    // Handle OTP input change
    const handleOtpChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) { // Allow only digits
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Automatically focus on the next input box
            if (value !== "" && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        console.log("Entered OTP:", parseInt(otpValue));
        const body = {
            mobile: mobileNumber,
            pin: parseInt(otpValue),
            unq_d_id: getUniqueId()
        }
        APIServices.login(body)
            .then((response) => {
                dispatch(setProfileData(response.data.profile))
                dispatch(setIsLoggedIn(true))
                dispatch(setToken(response.data.accessToken))
                dispatch(setRefreshToken(response.data.refreshToken))
                dispatch(setLoginId(response.data.profile.login_id))
                dispatch(setUniqueDeviceId(response.data.profile.unq_d_id))
                console.log("User Logged Successfully: ", response.data.profile.unq_d_id)
                navigate('/');
                APIServices.setAuthToken(response.data.accessToken, response.data.profile.login_id.unq_d_id, response.data.profile.login_id)
            })
            .catch((error) => {
                console.log("Getting error while logging in: ", error.data)
            })
    };

    return (
        <div className="login-bg-container">
            <img
                src="/Assets/LoginScreenLogo.webp"
                alt="Padmashali Logo"
                className="logo-image"
            />
            <div className="login-form-container">
                {!isMobileSubmitted ? (
                    // Step 1: Mobile Number Input
                    <form onSubmit={handleMobileSubmit}>
                        <h4 className="mobile-heading">Mobile Number</h4>
                        <input
                            type="tel"
                            placeholder="Enter Mobile Number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className="input-field"
                            maxLength={10}
                            required
                        />
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                ) : (
                    // Step 2: OTP Input
                    <form onSubmit={handleOtpSubmit}>
                        <div className="otp-container">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="number"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="otp-input"
                                    maxLength={1}
                                    required
                                />
                            ))}
                        </div>
                        <button type="submit" className="submit-button">
                            Verify OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
