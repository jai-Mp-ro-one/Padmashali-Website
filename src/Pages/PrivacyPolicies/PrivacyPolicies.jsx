import React from "react";
import './PrivacyPolicies.css';

const privacyAndPolicies = {
    privacyHeading: "Privacy Policy for Padmashali Global",
    updatedText: "Last Updated: [01/11/2024]",
    text1: "Welcome to Padmashali Global ('App'). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App, in compliance with the applicable laws of India and the General Data Protection Regulation (GDPR) for users within the European Union.",
    introduction: "1. Introduction",
    introduction1: "This Privacy Policy is an electronic record in terms of the Information Technology Act, 2000 and rules made thereunder, as amended.",
    pointHeading: "2. Information We Collect",
    point2Text1: "We collect and manage user information to provide and improve our services.",
    point2Text2: "Personal Information: Name, phone number, email address, address, city, and other details you may provide voluntarily.",
    point2Text3: "Tracking Information: IP address, device ID, and browsing data to analyze and improve user experience.",
    point3Heading: "3. Use of Information",
    point3Text1: "We use the information collected to provide, personalize, and enhance your experience.",
    point4Heading: "4. Data Security",
    point4Text1: "We implement industry-standard security measures to safeguard your data.",
    point5Heading: "5. Cookies and Tracking Technologies",
    point5Text1: "We use cookies to personalize content and improve the App. You may set your browser to refuse cookies.",
    point6Heading: "6. Third-Party Services",
    point6Text1: "Our App may contain links to third-party sites or services.",
    point7Heading: "7. Disclosure of Information",
    point7Text1: "We may share your information only with your consent or to fulfill services.",
    point8Heading: "8. Data Retention and Deletion",
    point8Text1: "Your personal information will be retained only as necessary.",
    point9Heading: "9. User Rights",
    point9Text1: "Depending on your location, you may have certain rights regarding your personal data.",
    point10Heading: "10. Amendments to This Policy",
    point10Text1: "We may update our Privacy Policy periodically.",
    point11Heading: "11. Contact Us",
    point11Text1: "For questions, concerns, or complaints, please contact us at:",
    point11Email: "Email: jaimptrust@gmail.com",
    point11SupportNumber: "Support: 6380681455"
};

const PrivacyAndPolicies = () => {
    return (
        <div className="privacy-container">
            <h1 className="privacy-heading">{privacyAndPolicies.privacyHeading}</h1>
            <p className="updated-text">{privacyAndPolicies.updatedText}</p>
            <p>{privacyAndPolicies.text1}</p>

            <h2>{privacyAndPolicies.introduction}</h2>
            <p>{privacyAndPolicies.introduction1}</p>

            <h3>{privacyAndPolicies.pointHeading}</h3>
            <p>{privacyAndPolicies.point2Text1}</p>
            <ul>
                <li>{privacyAndPolicies.point2Text2}</li>
                <li>{privacyAndPolicies.point2Text3}</li>
            </ul>

            <h3>{privacyAndPolicies.point3Heading}</h3>
            <p>{privacyAndPolicies.point3Text1}</p>

            <h3>{privacyAndPolicies.point4Heading}</h3>
            <p>{privacyAndPolicies.point4Text1}</p>

            <h3>{privacyAndPolicies.point5Heading}</h3>
            <p>{privacyAndPolicies.point5Text1}</p>

            <h3>{privacyAndPolicies.point6Heading}</h3>
            <p>{privacyAndPolicies.point6Text1}</p>

            <h3>{privacyAndPolicies.point7Heading}</h3>
            <p>{privacyAndPolicies.point7Text1}</p>

            <h3>{privacyAndPolicies.point8Heading}</h3>
            <p>{privacyAndPolicies.point8Text1}</p>

            <h3>{privacyAndPolicies.point9Heading}</h3>
            <p>{privacyAndPolicies.point9Text1}</p>

            <h3>{privacyAndPolicies.point10Heading}</h3>
            <p>{privacyAndPolicies.point10Text1}</p>

            <h3>{privacyAndPolicies.point11Heading}</h3>
            <p>{privacyAndPolicies.point11Text1}</p>
            <p>{privacyAndPolicies.point11Email}</p>
            <p>{privacyAndPolicies.point11SupportNumber}</p>
        </div>
    );
};

export default PrivacyAndPolicies;
