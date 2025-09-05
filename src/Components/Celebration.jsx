import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import fluteSound from "../assets/krishna_flute.mp3";

const LAYERS = [
  { name: "Bottom cake layer", color: "bg-amber-700", height: "h-10", width: "w-60" },
  { name: "Chocolate cream", color: "bg-stone-700", height: "h-5", width: "w-56" },
  { name: "Top cake layer", color: "bg-amber-600", height: "h-9", width: "w-52" },
];

export default function Celebration() {
  const [step, setStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (step < LAYERS.length) {
      const t = setTimeout(() => setStep(s => s + 1), 800);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleBlow = () => {
    setCandlesLit(false);
    if (!audioRef.current) {
      audioRef.current = new Audio(fluteSound);
      audioRef.current.volume = 0.8;
    }
    audioRef.current.play().catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 via-pink-50 to-white p-4 sm:p-6">
      <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6">
        
        {/* Left: Krishna GIF */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExenF5bThrMTl4M2lzOWNscGw1MWZqa3JvMnBqMmtxMzNvdXFjNDNybSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wjaKDsPUS73IqysEA5/giphy.gif"
            alt="Krishna"
            className="max-w-[220px] sm:max-w-[260px] w-full h-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Right: Cake + message */}
        <div className="flex-1 flex flex-col items-center text-center">
          <motion.h1
            className="text-2xl sm:text-4xl font-extrabold text-indigo-800 mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🎉 Happy Birthday Krishna 🎉
          </motion.h1>

          <p className="text-gray-700 text-sm sm:text-base mb-4 max-w-md">
            Click any candle to blow them out and celebrate the divine joy of Janmashtami.
          </p>

          {/* Cake */}
          <div className="flex flex-col items-center">
            {step === LAYERS.length && (
              <div className="flex gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={handleBlow}
                  >
                    {candlesLit ? (
                      <div
                        className="w-2 h-5 rounded-full mb-0.5 animate-pulse"
                        style={{ background: "linear-gradient(to top,#ff9a00,#ffe082)" }}
                      />
                    ) : (
                      <div className="w-2 h-1 mb-0.5 bg-gray-300 rounded-sm" />
                    )}
                    <div className="w-3 h-8 bg-yellow-200 rounded-sm" />
                  </div>
                ))}
              </div>
            )}

            {/* Cake layers */}
            <div className="flex flex-col items-center">
              {LAYERS.slice(0, step).map((layer, idx) => (
                <div
                  key={idx}
                  className={`${layer.width} ${layer.height} ${layer.color} rounded-t-lg mb-[-6px] shadow-inner flex items-end justify-center`}
                >
                  <div className="w-3 h-1 bg-white/60 rounded-full mb-1" />
                </div>
              ))}
            </div>

            {/* Message after blowing candles */}
            {!candlesLit && (
              <motion.div
                className="mt-4 p-3 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-rose-600">
                  🎂 Happy Birthday, Kanha!
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  May your day be filled with love, music and sweets.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-6 top-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-yellow-200 opacity-30 blur-xl" />
        <div className="absolute right-6 bottom-12 w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-pink-200 opacity-30 blur-xl" />
      </div>
    </div>
  );
}
