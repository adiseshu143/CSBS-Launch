import { useState, useEffect, useCallback } from "react";

interface CountdownPageProps {
  onComplete: () => void;
}

export default function CountdownPage({ onComplete }: CountdownPageProps) {
  const [count, setCount] = useState(5);
  const [animating, setAnimating] = useState(false);
  const [exiting, setExiting] = useState(false);

  const tick = useCallback(() => {
    setAnimating(true);

    setTimeout(() => {
      setAnimating(false);
      setCount((prev) => {
        if (prev <= 1) {
          // Countdown finished → trigger exit animation
          setExiting(true);
          setTimeout(onComplete, 800);
          return 0;
        }
        return prev - 1;
      });
    }, 800);
  }, [onComplete]);

  useEffect(() => {
    // Start after a short delay for entrance animation
    const initialDelay = setTimeout(tick, 600);
    return () => clearTimeout(initialDelay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count > 0 && count < 5 && !animating) {
      const timer = setTimeout(tick, 300);
      return () => clearTimeout(timer);
    }
  }, [count, animating, tick]);

  const progressPercent = ((5 - count) / 5) * 100;

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 md:px-10 countdown-enter ${
        exiting ? "countdown-exit" : ""
      }`}
    >
      {/* Circular countdown */}
      <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
        {/* Background ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(226, 232, 240, 0.8)"
            strokeWidth="2"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 90}
            strokeDashoffset={2 * Math.PI * 90 * (1 - progressPercent / 100)}
            className="transition-all duration-700 ease-out"
          />
          {/* Secondary accent arc */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 85}
            strokeDashoffset={2 * Math.PI * 85 * (1 - progressPercent / 120)}
            className="transition-all duration-700 ease-out"
            opacity="0.5"
          />
        </svg>

        {/* Number */}
        <span
          className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold transition-all duration-300 ${
            animating
              ? "scale-150 opacity-0 text-blue-400"
              : "scale-100 opacity-100 text-slate-900"
          }`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {count}
        </span>
      </div>

      {/* Label */}
      <p className="mt-8 sm:mt-10 md:mt-12 text-xs sm:text-sm md:text-base font-medium tracking-[0.3em] uppercase text-slate-500">
        Launching in
      </p>

      {/* Progress bar */}
      <div className="w-48 sm:w-64 md:w-80 lg:w-96 h-0.5 mt-4 sm:mt-6 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full transition-all duration-700 ease-out rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #3B82F6, #EF4444)",
          }}
        />
      </div>

      {/* Pulse rings */}
      {animating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 lg:w-80 lg:h-80 rounded-full border border-blue-200/50 animate-ping" />
        </div>
      )}
    </div>
  );
}
