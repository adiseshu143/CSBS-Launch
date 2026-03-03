import { useEffect, useState } from "react";

const REDIRECT_URL = "https://www.csbsvitb.in";

export default function LoadingRedirect() {
  const [dots, setDots] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Phase timeline
  useEffect(() => {
    // Show URL text after a moment
    const t1 = setTimeout(() => setShowUrl(true), 500);

    // Start redirect phase
    const t2 = setTimeout(() => setRedirecting(true), 2500);

    // Actually redirect
    const t3 = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 md:px-10 loading-enter">
      {/* Spinner */}
      <div className="relative mb-8 sm:mb-10 md:mb-14">
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-slate-200" />
        <div className="absolute inset-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-300 animate-spin" />
        <div className="absolute inset-2 sm:inset-2 md:inset-2.5 w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-20 lg:h-20 rounded-full border border-transparent border-b-orange-200 animate-spin-reverse" />
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-slate-800"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Loading{" "}
          <span className="text-orange-600 font-semibold">csbsvitb.in</span>
          <span className="inline-block w-6 sm:w-8 md:w-10 text-left text-slate-400">
            {dots}
          </span>
        </p>

        {/* URL bar */}
        {showUrl && (
          <div className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 mt-3 sm:mt-4 border rounded-full border-slate-200 bg-slate-50 backdrop-blur-sm fade-in-up shadow-sm">
            {/* Lock icon */}
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-slate-600">
              https://www.csbsvitb.in
            </span>
          </div>
        )}
      </div>

      {/* Redirecting text */}
      {redirecting && (
        <div className="mt-8 sm:mt-10 md:mt-12 fade-in-up">
          <p className="text-xs sm:text-sm md:text-base tracking-wider text-orange-400 uppercase">
            Redirecting now&hellip;
          </p>
        </div>
      )}

      {/* Decorative beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-px h-full left-1/4 bg-slate-100" />
        <div className="absolute w-px h-full left-3/4 bg-slate-100" />
      </div>
    </div>
  );
}
