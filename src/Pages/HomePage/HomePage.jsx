import React, { useState } from "react";
import "./HomePage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";

const HomePage = () => {

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/latestnews');
    };
    const bannerImages = [

        "https://bigcatsindia.com/wp-content/uploads/2018/06/Royal-Bengal-Tiger.jpg",
        "https://www.lolaapp.com/wp-content/uploads/2023/12/10-endangered-animals-of-arunachal-pradesh_1.jpg.webp",
        "https://cdn.shopify.com/s/files/1/0332/6122/4074/files/pexels-photo-2541239_480x480.jpg?v=1652767922",
        "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    ]
    return (
        <div className="home-bg-container">
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
                    interval={6000}
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
            <div className="homepage-bottom-container">

                <div className="content-containers">
                    <div className="content-container" onClick={handleCardClick}>
                        <div>
                            <h1 className="card-heading" >Latest News</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                    <div className="content-container">
                        <div>
                            <h1 className="card-heading">Events</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                </div>

                <div className="content-containers">
                    <div className="content-container">
                        <div>
                            <h1 className="card-heading">Padmashali sangham sites</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                    <div className="content-container">
                        <div>

                            <h1 className="card-heading">Anna sathrams</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                </div>

                <div className="content-containers">
                    <div className="content-container">
                        <div>

                            <h1 className="card-heading">Community leaders</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                    <div className="content-container">
                        <div>

                            <h1 className="card-heading">Events</h1>
                            <p className="card-content">
                                The Padmasalis claim to be the descendants of these 101 sons and claim that they followed Brahmin rites
                                and customs until Kali Yuga, the last of the four ages in Hindu chronology.
                            </p>
                        </div>
                        <img src='https://i.pinimg.com/originals/86/ed/d3/86edd3bf5a73f2c2bd64694476021719.jpg' className="card-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;