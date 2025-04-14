import React from "react";
import Primobanner from "../../assets/primoBanner.webp"
import { MdTimer } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { PiHandsPraying } from "react-icons/pi";
const PrimoBanner = () => {
    return (
      <div className="w-full h-auto mt-4 p-8 flex items-center justify-center rounded-xl">
        <div className="flex w-full max-w-6xl">
          <div className="w-2/3 relative flex items-center justify-center">
            <img
              src={Primobanner}
              alt="Rising Stars Background"
              className="w-full h-full object-cover rounded-l-[28px]"
            />
          </div>
          <div className="w-1/3 bg-blue-800 text-white rounded-r-[28px] p-8 flex flex-col justify-around items-center space-y-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4">
                <MdTimer className="w-8 h-8" />
                <h2 className="text-lg font-bold">On Time</h2>
              </div>
              <p className="text-center">Punctual arrivals on 95% trips</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4">
                <PiHandsPraying className="w-8 h-8" />
                <h2 className="text-lg font-bold">Friendly Staff</h2>
              </div>
              <p className="text-center">Always ready to help</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4">
                <MdStarBorder className="w-8 h-8" />
                <h2 className="text-lg font-bold">Top Rated</h2>
              </div>
              <p className="text-center">Buses with 4+ star rating</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default PrimoBanner;