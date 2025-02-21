import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIServices from "../../APIServices/APIServices";
import './EventDetails.css';

const EventDetails = () => {
    const [eventDetails, setEventDetails] = useState(null);
    const location = useLocation();

    // Extract the event_id from query parameters
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get('event_id');

    useEffect(() => {
        if (eventId) {
            APIServices.getEventById(eventId)
                .then((response) => {
                    setEventDetails(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching event details:", error);
                });
        }
    }, [eventId]);

    if (!eventDetails) return <p>Loading...</p>;

    return (
        <div className="event-details-container">

            <div className="image-container">
                <img
                    src={eventDetails.event_image[0]}
                    alt="Event"
                    className="event-image"
                />
            </div>
            <div className="content-container">
                <h2>{eventDetails.event_title}</h2>
                <p><strong>Date:</strong> {eventDetails.event_date}</p>
                <p><strong>Description:</strong> {eventDetails.description}</p>
                <p><strong>Address:</strong> {eventDetails.event_address}</p>
                <p><strong>Contact:</strong> {eventDetails.event_contact}</p>
            </div>
        </div>
    );
};

export default EventDetails;
