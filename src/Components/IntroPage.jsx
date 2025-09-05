import React, { useState, useEffect } from "react";
import desktopBg from "../assets/banner-1.webp";
import mobileBg from "../assets/mobile-bg.jpg";
import { motion } from "framer-motion";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const [bgImage, setBgImage] = useState(desktopBg);
  const [showcontent, setShowContent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const fullText =
    "Celebrate the birth of the one who taught the world the true meaning of love and devotion.";

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 640) {
          setBgImage(mobileBg);
        } else {
          setBgImage(desktopBg);
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (showcontent && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50); // speed (ms)
      return () => clearTimeout(timeout);
    } else if (typedText.length === fullText.length) {
      setShowButton(true);
    }
  }, [showcontent, typedText]);

  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/Celebration");
  };

  return (
    <div
      className=" relative h-screen bg-cover bg-center flex flex-col items-end justify-between p-10  "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="absolute  h-screen inset-0 bg-black/40 md:hidden"></div>

      <div className="md:w-[600px] w-[300px]  relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[#e9251D] text-5xl font-bold">
            Shree krishna Janmastami
          </h2>
        </motion.div>

        {showcontent && (
          <>
            <p className="mt-4 text-lg drop-shadow-md md:text-black text-white">{typedText}</p>

            {showButton && (
              <button
                onClick={handleButton}
                className="mt-6 bg-linear-to-r/longer from-indigo-500 to-teal-400 hover:to-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Lets Celebrate 🎉
              </button>
            )}
          </>
        )}
      </div>

      <div className="md:h-[300px] md:w-[600px]  w-[300px]  mb-15 ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper rounded-2xl overflow-hidden !mt-0 !pt-0"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="h-full w-full flex items-center justify-center  shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-[300px] w-full object-cover "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className="fixed bottom-5 right-4 text-gray-400 text-lg z-50">@Created By Dipti</p>
    </div>
  );
};

export default IntroPage;
const slides = [
  { id: 1, title: "Slide 1", image: slide1 },
  { id: 2, title: "Slide 2", image: slide2 },
  { id: 3, title: "Slide 3", image: slide3 },
];
