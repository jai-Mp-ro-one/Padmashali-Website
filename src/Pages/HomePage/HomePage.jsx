import React from "react";
import "./HomePage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";
import { Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

    const handleNewsCardClick = () => {
        if (isLoggedIn) {
            navigate('/latestnews');
        } else {
            navigate('/login');
        }
    };

    const handleEventsCardClick = () => {
        if (isLoggedIn) {
            navigate('/events');
        } else {
            navigate('/login');
        }
    };

    const bannerImages = [
        // "https://padmasalia.org.in/wp-content/uploads/2018/07/Pslider1.jpg",
        // "https://www.lolaapp.com/wp-content/uploads/2023/12/10-endangered-animals-of-arunachal-pradesh_1.jpg.webp",
        // "https://cdn.shopify.com/s/files/1/0332/6122/4074/files/pexels-photo-2541239_480x480.jpg?v=1652767922",
        // "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "Assets/banners1.webp",
        "Assets/banners2.webp",
        "Assets/banners3.webp",
        "Assets/banners4.webp",
        "Assets/banners5.webp",
    ];
    return (
        <Box className="home-bg-container">
            <div className="carousel-containerr">
                <Carousel
                    showThumbs={false}
                    showStatus={true}
                    autoPlay={true}
                    showArrows={false}
                    infiniteLoop={true}
                    showIndicators={false}
                    animationHandler="fade"
                    swipeable={false}
                    interval={4000}
                    style={{ width: "100vw" }}
                >
                    {bannerImages.map((eachImage, index) => (
                        <div className="each-carousel" key={index}>
                            <img
                                className="img-fluid home-image"
                                src={eachImage}
                                alt={`images${index}`}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <Box className="homepage-bottom-container">
                <Grid container spacing={0} className="content-main-container">
                    <Grid item xs={12} sm={6} md={6}>
                        <Box onClick={handleNewsCardClick} className='content-sub-container'>
                            <div>
                                <h1 className="card-heading">Latest News</h1>
                                <p className="card-content">
                                    The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites and customs until Kali Yuga.
                                </p>
                            </div>
                            {/* <img src="https://img.freepik.com/free-vector/global-technology-earth-news-bulletin-background_1017-33687.jpg" className="card-image" alt="news" /> */}
                            <img src="Assets/padmashalinews.webp" className="card-image" alt="news" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} >
                        <Box className='content-sub-container' onClick={handleEventsCardClick}>
                            <div>
                                <h1 className="card-heading">Events</h1>
                                <p className="card-content">
                                    Events and activities organized to support the Padmasali community.
                                </p>
                            </div>
                            <img src="Assets/padmashali events.webp" className="card-image" alt="events" />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="content-main-container">
                    <Grid item xs={12} sm={6} md={6}>
                        <Box className='content-sub-container'>
                            <div>
                                <h1 className="card-heading">Padmashali Sangham Sites</h1>
                                <p className="card-content">
                                    Sites dedicated to the Padmashali Sangham community.
                                </p>
                            </div>
                            <img src="Assets/padmashali sangham sites.webp" className="card-image" alt="sangham" />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <Box className='content-sub-container'>
                            <div>
                                <h1 className="card-heading">Anna Sathrams</h1>
                                <p className="card-content">
                                    Free food distribution centers supported by the community.
                                </p>
                            </div>
                            <img src="Assets/padmashali annadanam.webp" className="card-image" alt="sathrams" />
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="content-main-container">
                    <Grid item xs={12} sm={6} md={6}>
                        <Box className='content-sub-container'>
                            <div>
                                <h1 className="card-heading">Community Leaders</h1>
                                <p className="card-content">
                                    Leaders of the Padmashali community contributing to its progress.
                                </p>
                            </div>
                            <img src="Assets/padmashali coummunity leaders.webp" className="card-image" alt="leaders" />
                        </Box>
                    </Grid>

                    {/* <Grid item xs={12} sm={6} md={6}>
                        <Box className='content-sub-container'>
                            <div>
                                <h1 className="card-heading">More Events</h1>
                                <p className="card-content">
                                    Ongoing and upcoming events for the community.
                                </p>
                            </div>
                            <img src="https://www.example.com/more-events-image.jpg" className="card-image" alt="more-events" />
                        </Box>
                    </Grid> */}
                </Grid>
            </Box>
        </Box>
    );

};

export default HomePage;
