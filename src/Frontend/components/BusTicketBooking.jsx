import React, { useState } from "react";

const BusTicketBooking = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="text-left my-10 w-full mx-auto px-6">
            <h1 className="text-4xl mb-4 ml-40">BOOK BUS TICKETS ONLINE</h1>
            <p className="mb-4 text-xl mx-40 ">
                RedBus is India's largest brand for online bus ticket booking and offers an easy-to-use online bus and train ticket booking;
                with over 36 million satisfied customers, 3500+ bus operators to choose from, and plenty of offers on bus ticket booking,
                redBus makes road journeys super convenient for travellers. A leading platform for booking bus tickets, redBus has been the
                leader in online bus booking over the past 17 years across thousands of cities and lakhs of routes in India.
            </p>
            {expanded && (
                <p className="mb-4 text-xl mx-40">
                    Booking a bus ticket online on the redBus app or website is very simple. You can download the redBus app or visit redbus.
                    in and enter your source,destination & travel date to check the top-rated bus services available. You can then compare bus prices,
                    user ratings & amenities, select your preferred seat, boarding & dropping points and pay using multiple payment options like UPI,
                    debit or credit card, net banking and more.
                    With redBus, get assured safe & secure payment methods and guaranteed travel with the best seat and bus operator of your choice.
                    Once the bus booking payment is confirmed, all you have to do is pack your bags and get ready to travel with the m-ticket,
                    which you can show to the bus operator on your mobile before boarding the bus. Online bus ticket booking with redBus is that simple!
                </p>
                
            )}
            {expanded && (
                <p className="mb-4 text-xl mx-40">
                   RedBus also offers other exclusive benefits on online bus tickets like flexible ticket rescheduling options,
                   easy & friendly cancellation policies, and instant payment refunds. With a live bus tracking feature,
                   you can plan travel and never miss the bus. You can get the cheapest bus tickets by availing the best discounts for new & existing customers.
                   With redDeals, you can also get exclusive & additional discounts on your online bus ticket booking. You will get 24/7 customer support on call,
                   chat & help to resolve all your queries in English & local languages.
                </p>
                
            )}
            {expanded && (
                <p className="mb-4 text-xl mx-40">
                   RedBus offers bus tickets from some of the top private bus operators, such as Orange Travels, VRL Travels, SRS Travels, Chartered Bus,
                   and Praveen Travels, and state government bus operators, such as APSRTC, TSRTC, GSRTC, Kerala RTC, TNSTC, RSRTC, UPSRTC, and more.
                   With redBus, customers can easily book bus tickets for different bus types, such as AC/non-AC, Sleeper, Seater, Volvo, Multi-axle,
                   AC Sleeper, Electric buses, and more.
                </p>
                
            )}
            <button
                onClick={toggleExpansion}
                className="text-blue-600 font-bold hover:underline focus:outline-none ml-40"
            >
                {expanded ? "Show less" : "Read more"}
            </button>
        </div>

    );
};

export default BusTicketBooking;
