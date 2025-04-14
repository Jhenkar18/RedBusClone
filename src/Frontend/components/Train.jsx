import React from "react";
import Timage from "../../assets/train.webp";
import Redrail from "../../assets/redrail.svg";
import AuthorizedPartner from "../../assets/Authpart.png";
import InstantRef from "../../assets/InstantRefunds.svg";
import Hastlefree from "../../assets/HastleCS.svg";


const Train = () => {
  return (
    <div className="w-full h-auto mt-4">
      <div className="w-[1117px] m-auto flex">
        <div className="w-1/2 h-full">
          <div className="space-y-7">
            <div className="font-bold text-4xl">
              <h1>NOW, GET MORE THAN</h1>
              <h1>JUST BUS TICKETS WITH</h1>
              <h1>Red BUS!</h1>
            </div>

            <div className="flex items-center space-x-2">
              <img src={Redrail} alt="RedRail"/>
              <h2 >Train Ticket</h2>
            </div>

            <div>
              <h2>
                Book IRCTC Train Tickets on redRail with a simple & superfast
                booking process, with no service fee + no payment gateway charge.
              </h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <img src={AuthorizedPartner} alt="Authorized Partner" />
                <h2 className="font-bold pl-1">Authorised IRCTC Partner</h2>
              </div>

              <div className="flex items-center space-x-2">
                <img src={InstantRef} alt="Instant Refunds" />
                <h2 className="font-bold pl-2">Instant refunds on UPI payments</h2>
              </div>

              <div className="flex items-center space-x-2">
                <img src={Hastlefree} alt="Hassle Free" />
                <h2 className="font-bold">Hassle-free customer support</h2>
              </div>
            </div>

            <button className="mt-10 h-14 w-40 bg-red-600 flex items-center justify-center rounded-xl text-white font-bold">
              Book Train Tickets
            </button>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <img src={Timage} alt="Train Image" />
        </div>
      </div>
    </div>
  );
};

export default Train;
