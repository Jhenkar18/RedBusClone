import React, { useRef, useState } from 'react';
import brsto from"../../assets/brsto.jpeg"
import chart from"../../assets/chartd.jpeg"
import first from"../../assets/First.jpeg"
import icic from"../../assets/icici.jpeg"
import intercity from"../../assets/intrcity.jpeg"
import offertag from"../../assets/Offrtag.jpeg"

const TrendingOffers = () => {
    const offers = [
        {
          title: "Save up to Rs 250 on bus tickets",
          validUntil: "Valid till 01 Aug",
          code: "FIRST",
          backgroundColor: "bg-gradient-to-r from-blue-400 to-blue-600",
          image:brsto
        },
        {
          title: "Save up to Rs 300 on Karnataka, Tamil",
          validUntil: "Valid till 01 Aug",
          code: "CASH300",
          backgroundColor: "bg-gradient-to-r from-green-400 to-green-600",
          image:first
        },
        {
          title: "Save up to Rs 300 on AP, TS routes",
          validUntil: "Valid till 01 Aug",
          code: "SUPERHIT",
          backgroundColor: "bg-gradient-to-r from-red-400 to-red-600",
          image:intercity
        },
        {
          title: "Save up to Rs 500 with ICICI Bank",
          validUntil: "Valid till 01 Aug",
          code: "ICICI500",
          backgroundColor: "bg-gradient-to-r from-green-400 to-green-600",
          image:chart
        },
        {
          title: "Save up to Rs 300 on Karnataka, Tamil",
          validUntil: "Valid till 01 Aug",
          code: "CASH300",
          backgroundColor: "bg-gradient-to-r from-green-400 to-green-600",
          image:icic
        },
        {
          title: "Save up to Rs 300 on AP, TS routes",
          validUntil: "Valid till 01 Aug",
          code: "SUPERHIT",
          backgroundColor: "bg-gradient-to-r from-red-400 to-red-600",
          image:offertag
        },
        {
          title: "Save up to Rs 500 with ICICI Bank",
          validUntil: "Valid till 01 Aug",
          code: "ICICI500",
          backgroundColor: "bg-gradient-to-r from-green-400 to-green-600",
          image:icic
        }
        
      ];

    const scrollRef = useRef(null);
    const [showAll, setShowAll] = useState(false);

    const scroll = (direction) => {
        if (direction === 'left') {
            scrollRef.current.scrollLeft -= 300;
        } else {
            scrollRef.current.scrollLeft += 300;
        }
    };
return (
    <div className="w-full py-8 relative">
      <div className="flex justify-between items-center mb-4 px-8">
        <h2 className="text-3xl font-bold">Trending Offers</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xl text-blue-600 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-l-2xl rounded-r-2xl h-12 w-32 flex items-center justify-center cursor-pointer"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>
      <div className="flex justify-between items-center">
        {!showAll && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 p-2 bg-gray-300 rounded-full shadow-md cursor-pointer hover:scale-110 duration-300"
            style={{ zIndex: 1 }}
          >
            &lt;
          </button>
        )}
        <div
          ref={scrollRef}
          className={`flex ${!showAll ? 'overflow-x-auto' : 'flex-wrap justify-center'} space-x-4 px-8 scroll-smooth`}
          style={{ scrollbarWidth: 'none' }}
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`mt-2 flex-shrink-0 flex flex-col items-center p-4 rounded-lg text-white cursor-pointer hover:scale-105 duration-200 ${offer.backgroundColor}`}
              style={{ minWidth: '250px' }}
            >
              <div className="flex flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <img src={offer.image} alt="offer" className="h-12 w-12 object-cover rounded-full" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold">BUS</h3>
                  <p className="text-lg">{offer.title}</p>
                  <p>{offer.validUntil}</p>
                </div>
              </div>
              <span className="mt-4 px-4 py-2 bg-white text-black rounded-lg">{offer.code}</span>
            </div>
          ))}
        </div>
        {!showAll && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 p-2 bg-gray-300 rounded-full shadow-md"
            style={{ zIndex: 1 }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};
export default TrendingOffers;
