import React from 'react';
import '../OfferScroll.css';

const OffersScroll = () => {
  const offers = [
    "🔥 Flash Sale: Up to 50% off on Electronics!",
    "🎁 Special Offer: Buy 1 Get 1 Free on Apparel!",
    "💥 Discount: Get 10% Cashback on Your First Purchase!",
    "🚚 Free Shipping on Orders Above $50!",
    "🎉 New Year Sale: Up to 70% off on Home Appliances!",
    "🛍️ Extra 20% off on Orders Above $100!",
    "🎁 Holiday Sale: Buy More, Save More!",
    "🔥 Weekend Deals: Discounts on All Categories!"
  ];

  return (
    <div className="offers-container">
      <div className="offers-scroll">
        {offers.map((offer, index) => (
          <div className="offer-item" key={index}>
            <span>{offer}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersScroll;
