import React from "react";
import cambodia from "../../assets/Cambodia.svg";
import colombia from "../../assets/Colombia.svg";
import india from "../../assets/India.svg";
import indonesia from "../../assets/Indonesia.svg";
import malaysia from "../../assets/Malaysia.svg";
import peru from "../../assets/Peru.svg";
import singapore from "../../assets/Singapore.svg";
import vietnam from "../../assets/Vietnam.svg";

const countries = [
  { name: 'Colombia', flag: colombia },
  { name: 'India', flag: india },
  { name: 'Indonesia', flag: indonesia },
  { name: 'Malaysia', flag: malaysia },
  { name: 'Peru', flag: peru },
  { name: 'Singapore', flag: singapore },
  { name: 'Vietnam', flag: vietnam },
  { name: 'Cambodia', flag: cambodia },
];

const GlobalPresence = () => {
  return (
    <div className=" my-10">
      <h2 className="text-2xl font-bold mb-6 ml-36">Global Presence</h2>
      <div className="flex justify-center space-x-12 flex-wrap">
        {countries.map((country, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <img src={country.flag} alt={country.name} className="w-24 h-24 rounded-full" />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalPresence;

