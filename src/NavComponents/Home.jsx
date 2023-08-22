import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../CSS/Home.css";
import imagesrc1 from "../Images/s23.webp";
import imagesrc2 from "../Images/headphone.png";
import imagesrc3 from "../Images/apple.png";
import imagesrc4 from "../Images/Galaxy-S23-Ultra-PNG-Clipart.webp";
import imagesrc from "../Images/2_corousel.png";

import Logo from "../Components/Logo";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ForHomePageData from "./ForHomePage";
import NavDesktop from "../Components/NavDesktop";
// import axios from "axios";

function Home() {
  const [isMobile, setIsMobile] = useState(false);
  // const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const setSize = () => {
      const isMobile = window.innerWidth < 600;
      setIsMobile(isMobile);
    };
    setSize();
    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  // useEffect(() => {
  //   // Fetch images from the API
  //   axios
  //     .get("http://localhost:7000/api/apple")
  //     .then((response) => {
  //       setCarouselImages(response.data); // Update the state with fetched images
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching images:", error);
  //     });
  // }, []);
  return (
    <>
      <Logo />
      {isMobile ? <Navbar /> : <NavDesktop />}

      <div className="homeMain">
        <Carousel
          showArrows={true}
          autoPlay={true}
          showStatus={false}
          showThumbs={false}
          interval={2500}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          useKeyboardArrows={true}
          verticalSwipe={true}
          className="customCarousel"
        >

<img src={imagesrc} className="carouselImage" alt="" />
<img src={imagesrc1} className="carouselImage" alt="" />
<img src={imagesrc2} className="carouselImage" alt="" />
<img src={imagesrc3} className="carouselImage" alt="" />
<img src={imagesrc4} className="carouselImage" alt="" />

          {/* {carouselImages.map((imageSrc, index) => (
            <div key={index}>
            </div>
          ))} */}
           </Carousel>
      </div>
      <ForHomePageData />
      <Footer />
    </>
  );
}

export default Home;
