import { useEffect, useState } from "react";
import { products } from "../common/product";

export const HomeScreen = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProduct = products[currentIndex];

  // Reset the transitioning state after the animation ends
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300); // Adjust timing as needed
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  return (
    <>
      <div
        id="home"
        className="w-full md:container md:mx-auto h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-brilliant.jpg')" }}
      >
        <div className="relative h-screen bg-cover bg-center bg-black bg-opacity-10 bg-opacity-50 dark:bg-opacity-70">
          <div
            className={`top-0 right-0 p-4 flex space-x-4 ${
              isSticky
                ? "fixed w-full bg-white shadow-lg top-0 right-0 p-4 flex space-x-4 z-50"
                : "absolute z-10"
            }`}
            style={{ transition: "background-color 0.3s ease" }}
          >
            {isSticky && (
              <img
                src="/briliant-logo.png"
                alt="Sticky Logo"
                className="h-8 w-20"
              />
            )}
            <a
              href="#home"
              className={`${
                isSticky ? "text-gray-800 font-bold" : "text-gray-100 font-bold"
              }`}
            >
              Home
            </a>
            <a
              href="#products"
              className={`${
                isSticky ? "text-gray-800 font-bold" : "text-gray-100 font-bold"
              }`}
            >
              Products
            </a>
            <a
              href="#about"
              className={`${
                isSticky ? "text-gray-800 font-bold" : "text-gray-100 font-bold"
              }`}
            >
              About Us
            </a>
          </div>
        </div>
      </div>

      <div
        id="products"
        className="w-full md:container md:mx-auto h-screen bg-cover bg-center flex items-center justify-center relative py-8 z-40"
      >
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-30"
        >
          Prev
        </button>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full text-center z-30">
          <img
            src={currentProduct.imageUrl}
            alt={currentProduct.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{currentProduct.name}</h2>
            <p className="mt-2 text-gray-600">{currentProduct.description}</p>
            <p className="mt-4 text-lg font-bold">{currentProduct.price}</p>
          </div>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-30"
        >
          Next
        </button>
      </div>
      <div
        id="about"
        className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/about-bg.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Welcome to <span className="font-bold">[Company Name]</span>, where
            innovation meets excellence. Established in [Year], our company has
            been at the forefront of delivering top-notch [products/services] to
            clients around the globe. We pride ourselves on our commitment to
            quality, customer satisfaction, and continuous improvement.
          </p>
          <p className="mt-4 text-lg md:text-xl">
            Our mission is to{" "}
            <span className="font-bold">[insert mission statement]</span>, and
            we strive to achieve this by leveraging cutting-edge technology,
            fostering a collaborative work environment, and putting our
            customers first.
          </p>
        </div>
      </div>
      <div className="w-full md:container md:mx-auto h-56 bg-cover bg-center bg-gray-900"></div>
    </>
  );
};
