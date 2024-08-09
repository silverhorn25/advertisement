import { useEffect, useState } from "react";

export const HomeScreen = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'prev' | 'next'>('next');

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

  const products = [
    {
      id: 1,
      name: "Product 1",
      description: "This is a brief description of Product 1.",
      price: "$19.99",
      imageUrl: "/oil.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a brief description of Product 2.",
      price: "$29.99",
      imageUrl: "/spray.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a brief description of Product 2.",
      price: "$10.99",
      imageUrl: "/pepsi.jpg",
    },
  ];

  const handlePrev = () => {
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection('next');
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
                ? "fixed w-full bg-white shadow-lg top-0 right-0 p-4 flex space-x-4"
                : "absolute"
            }`}
            style={{ transition: "background-color 0.3s ease" }}
          >
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
        className="w-full md:container md:mx-auto h-screen bg-cover bg-center flex items-center justify-center relative py-8"
      >
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        >
          Prev
        </button>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full text-center">
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
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
        >
          Next
        </button>
      </div>
      <div
        id="about"
        className="w-full md:container md:mx-auto h-screen bg-cover bg-center"
      >
        About Us
      </div>
    </>
  );
};
