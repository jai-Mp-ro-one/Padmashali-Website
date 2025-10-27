import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import APIServices from '../../APIServices/APIServices';
import './NewsDetails.css';

const NewsDetails = () => {
    const [newsDetails, setNewsDetails] = useState(null);
    const location = useLocation();
    // console.log("newsDetails: ", newsDetails.news_images[0].url)
    const queryParams = new URLSearchParams(location.search);
    const newsId = queryParams.get('news_id');

    useEffect(() => {
        if (newsId) {
            APIServices.getNewsById(newsId)
                .then((response) => {
                    setNewsDetails(response.data[0]);
                })
                .catch((error) => {
                    console.error("Error fetching news details:", error);
                });
        }
    }, [newsId]);

    if (!newsDetails) return <p>Loading...</p>;

    return (
        <div className="news-details-container">
            <div className="image-container">
                <img
                    src={newsDetails?.news_images[0]?.url}
                    alt="News"
                    className="news-image"
                />
            </div>
            <h2>{newsDetails.news_headline}</h2>
            <p>{newsDetails.news}</p>
            <p>
                <strong>Date Posted:</strong> {newsDetails.posted_date}
            </p>
        </div>

    );
};

export default NewsDetails;
