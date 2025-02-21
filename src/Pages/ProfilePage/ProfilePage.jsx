import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import APIServices from "../../APIServices/APIServices";
import { Grid, Typography, Paper, Divider, Avatar } from "@mui/material";
import "./ProfilePage.css";

const ProfilePage = () => {
    const [userProfileData, setProfileData] = useState(null);

    // Fetch logged-in user's profile ID from Redux store
    const loggedUserData = useSelector((state) => state.profileData);
    const profileId = loggedUserData?.profile_id;

    // Fetch user profile data by ID
    useEffect(() => {
        if (profileId) {
            APIServices.getProfileById(profileId)
                .then((response) => {
                    setProfileData(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error.message);
                });
        }
    }, [profileId]);

    if (!userProfileData) return <p>Loading...</p>;

    const {
        name,
        surname,
        mobile,
        email,
        dob,
        gender,
        gotra,
        relation_status,
        education,
        professional,
        address,
        city,
        state,
        district,
        pincode,
        constituency,
        parlimentary,
        country,
        family,
        other_data,
        profile_image,
    } = userProfileData;

    const getInitials = (name) => {
        const nameParts = name.split(" ");
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts.length > 1 ? nameParts[1].charAt(0) : "";
        return firstNameInitial + lastNameInitial;
    };

    return (
        <div className="profile-main-container">
            <div className="profile-page-container">
                <Paper elevation={3} style={{ padding: "20px" }}>
                    <Grid container spacing={3}>
                        {/* Profile Image or Avatar */}
                        <Grid item xs={12} container justifyContent="center">
                            <Avatar
                                alt={`${name} ${surname}`}
                                src={profile_image || undefined} // Use profile image or undefined
                                sx={{ width: 150, height: 150 }}
                            >
                                {/* If no profile image, display initials */}
                                {!profile_image && getInitials(name)}
                            </Avatar>
                        </Grid>


                        {/* Basic Details */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Basic Details</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Name:</strong> {name} {surname}</Typography>
                            <Typography><strong>Mobile:</strong> {mobile}</Typography>
                            <Typography><strong>Email:</strong> {email}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Date of Birth:</strong> {dob}</Typography>
                            <Typography><strong>Gender:</strong> {gender}</Typography>
                            <Typography><strong>Gotra:</strong> {gotra}</Typography>
                            <Typography><strong>Relation Status:</strong> {relation_status}</Typography>
                        </Grid>

                        {/* Education & Professional Details */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Education & Profession</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Degree:</strong> {education?.degree}</Typography>
                            <Typography><strong>Qualification:</strong> {education?.qualification}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Profession:</strong> {professional?.proffession}</Typography>
                        </Grid>

                        {/* Address Details */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Address Details</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>House No:</strong> {address?.h_no}</Typography>
                            <Typography><strong>Street:</strong> {address?.street_name}</Typography>
                            <Typography><strong>Division Ward:</strong> {address?.division_ward}</Typography>
                            <Typography><strong>Residence Type:</strong> {address?.residence_type}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>City:</strong> {city}</Typography>
                            <Typography><strong>State:</strong> {state}</Typography>
                            <Typography><strong>District:</strong> {district}</Typography>
                            <Typography><strong>Pincode:</strong> {pincode}</Typography>
                            <Typography><strong>Constituency:</strong> {constituency}</Typography>
                            <Typography><strong>Parliamentary Area:</strong> {parlimentary}</Typography>
                            <Typography><strong>Country:</strong> {country}</Typography>
                        </Grid>

                        {/* Family Details */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Family Details</Typography>
                            <Divider />
                        </Grid>
                        {family?.map((member, index) => (
                            <Grid item xs={12} key={index}>
                                <Typography><strong>Member {index + 1}:</strong> {member.name}</Typography>
                                <Typography><strong>Phone:</strong> {member.phone}</Typography>
                                <Typography><strong>Relation:</strong> {member.relation}</Typography>
                            </Grid>
                        ))}

                        {/* Other Details */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Other Details</Typography>
                            <Divider />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Blood Group:</strong> {other_data?.blood_group}</Typography>
                            <Typography><strong>Main Profession:</strong> {other_data?.main_proffesion}</Typography>
                            <Typography><strong>Other Profession:</strong> {other_data?.other_profeesion}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
};

export default ProfilePage;
