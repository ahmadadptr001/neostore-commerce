'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SpecialDeels() {
  const [timeLeft, setTimeLeft] = useState([]);
  const tagTime = ['Days', 'Hours', 'Minutes', 'Seconds'];
  const endTime = '2026-01-05T23:59:59Z';
  useEffect(() => {
    const target = new Date(endTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft([]);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft([days, hours, minutes, seconds]);
      }
    }, 1000);
  }, [endTime]);
  return (
    <section className="p-4 bg-gradient-to-r from-[#9333EA] to-[#DB2777]">
      <div className="text-white flex flex-col py-7 gap-2 mx-auto text-center container px-7">
        <h2 className='text-3xl font-semibold'>Special Deals Available Now</h2>
        <p className='text-gray-300'>Get up to 80% off on all categories</p>
        {timeLeft.length !== 0 ? (
          <div className="flex items-center gap-7  justify-center py-3">
            {timeLeft.map((time, i) => (
              <div key={i} className="flex flex-col">
                <h3 className="font-bold text-4xl">{time}</h3>
                <p className="text-gray-300 text-xs">{tagTime[i]}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-red-400 font-semibold'>This offer has expired!</p>
        )}
        <Link href="/products" className="btn bg-white w-fit mx-auto mt-5">
          <p className='text-[#9333EA]'>Shop Sale Now</p>
        </Link>
      </div>
    </section>
  );
}
