import React, { useRef } from 'react';
import Apsrtc from '../../assets/apsrtc.png';
import KeralaRtc from '../../assets/kerala-rtc.png';
import Ksrtc from '../../assets/ksrtc.png';
import Tsrtc from '../../assets/tsrtc.jpg';

const busLogos = [
  { id: 1, name: 'APSRTC', src: Apsrtc },
  { id: 2, name: 'KeralaRTC', src: KeralaRtc },
  { id: 3, name: 'KSRTC', src: Ksrtc },
  { id: 4, name: 'TSRTC', src: Tsrtc },
  { id: 5, name: 'APSRTC', src: Apsrtc },
  { id: 6, name: 'KeralaRTC', src: KeralaRtc },
  { id: 7, name: 'KSRTC', src: Ksrtc },
  { id: 8, name: 'TSRTC', src: Tsrtc }
];

const GovernmentBuses = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (direction === 'left') {
      scrollRef.current.scrollLeft -= 300;
    } else {
      scrollRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className='mt-0 h-auto w-full bg-white'>
      <div className='flex flex-row justify-between items-start pt-8'>
        <h1 className=' ml-3 text-3xl font-bold'>GOVERNMENT BUSES</h1>
        <a
          href="#"
          className='text-xl text-blue-600 bg-gray-200 hover:bg-gray-300 border border-gray-400 rounded-l-2xl rounded-r-2xl h-12 w-32 flex items-center justify-center mr-4'
        >
          View All
        </a>
      </div>
      <div className='relative h-[330px] w-full overflow-hidden mt-6 px-8'>
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md cursor-pointer hover:scale-110 duration-300"
          style={{ zIndex: 1 }}
        >
          &lt;
        </button>
        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto space-x-4 px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', width: '100%' }} 
        >
          {busLogos.map((bus) => (
            <div key={bus.id} className='flex-shrink-0 w-[300px]'>
              <div className='h-full w-full flex flex-col p-6 bg-gray-100 rounded-2xl shadow-lg'>
                <div className='flex flex-row items-center mb-4'>
                  <img src={bus.src} alt={bus.name} className='h-12 w-12 object-contain' />
                  <h1 className='font-bold pl-4 text-2xl'>{bus.name}</h1>
                </div>
                <div className='h-auto w-full flex flex-col space-y-2'>
                  <p className='text-sm text-gray-700'>
                    1450 services including Garuda Plus, Rajdhani and more
                  </p>
                  <p className='text-sm text-gray-600 bg-gray-200 p-2 rounded'>
                    Official booking partner of {bus.name}
                  </p>
                  <h4 className='text-sm text-red-600 font-semibold'>
                    Use code <span className='font-bold'>FIRST</span> to save up to ₹250 (only for first-time users)
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded-full shadow-md"
          style={{ zIndex: 1 }}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default GovernmentBuses;
