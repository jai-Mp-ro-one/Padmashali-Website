import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIServices from "../../APIServices/APIServices";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";
import './LatestEvents.css'

const LatestEvents = () => {
    const [latestNews, setLatestNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        APIServices.getAllEvents()
            .then((response) => {
                setLatestNews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching news:", error);
            });
    }, []);

    const handleCardClick = (newsId) => {
        navigate(`/event-details?event_id=${newsId}`);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Events
            </Typography>
            <Grid container spacing={4}>
                {latestNews.map((news) => (
                    <Grid item key={news.news_id} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            onClick={() => handleCardClick(news.event_id)}
                            sx={{
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                },
                            }}
                            className="news-card"
                        >
                            <CardContent>
                                <Typography variant="h6" component="h3" gutterBottom className="news-heading">
                                    {news.news_headline}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    noWrap
                                    className="news-description"
                                >
                                    {news.event_title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ marginTop: 1, color: "gray" }}
                                >
                                    {news.description}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ marginTop: 1, color: "gray" }}
                                >
                                    {news.event_date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LatestEvents;
