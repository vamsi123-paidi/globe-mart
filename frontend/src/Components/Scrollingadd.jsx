import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../OfferScroll.css';

const OffersScroll = () => {
  const offers = [
    { text: "🔥 Flash Sale: Up to 50% off on Electronics!", link: "/offers" },
    { text: "🎁 Special Offer: Buy 1 Get 1 Free on Apparel!", link: "/offers" },
    { text: "💥 Discount: Get 10% Cashback on Your First Purchase!", link: "/offers" },
    { text: "🚚 Free Shipping on Orders Above $50!", link: "/offers" },
    { text: "🎉 New Year Sale: Up to 70% off on Home Appliances!", link: "/offers" },
    { text: "🛍️ Extra 20% off on Orders Above $100!", link: "/offers" },
    { text: "🎁 Holiday Sale: Buy More, Save More!", link: "/offers" },
    { text: "🔥 Weekend Deals: Discounts on All Categories!", link: "/offers" }
  ];

  const offersScrollRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Calculate the total width of all offers
    const offersScroll = offersScrollRef.current;
    const offerItems = offersScroll.querySelectorAll('.offer-item');
    let totalWidth = 0;

    offerItems.forEach((item) => {
      totalWidth += item.offsetWidth + 50; // Add margin-right (50px)
    });

    // Set the width of .offers-scroll to the total width
    offersScroll.style.width = `${totalWidth}px`;
  }, []);

  const handleOfferClick = (offer) => {
    // Navigate to the Offers Page and pass the offer text as state
    navigate('/offers', { state: { offer: offer.text } });
  };

  return (
    <div className="offers-container mt-3">
      <div className="offers-scroll" ref={offersScrollRef}>
        {offers.map((offer, index) => (
          <div
            className="offer-item"
            key={index}
            onClick={() => handleOfferClick(offer)}
          >
            <span>{offer.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersScroll;