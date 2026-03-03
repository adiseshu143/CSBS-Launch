import { useState, useMemo } from "react";

interface LaunchPageProps {
  onLaunch: () => void;
}

interface Bubble {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  drift: number;
}

function generateBubbles(count: number): Bubble[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const radians = (angle * Math.PI) / 180;
    const distance = 80 + Math.random() * 160;
    return {
      id: i,
      size: 8 + Math.random() * 20,
      x: Math.cos(radians) * distance,
      y: Math.sin(radians) * distance - Math.random() * 120,
      delay: Math.random() * 0.35,
      duration: 0.9 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 60,
    };
  });
}

export default function LaunchPage({ onLaunch }: LaunchPageProps) {
  const [launched, setLaunched] = useState(false);
  const bubbles = useMemo(() => generateBubbles(28), []);

  const handleClick = () => {
    if (launched) return;
    setLaunched(true);
    // Allow the full exit choreography to play, then tell App to switch phase
    setTimeout(onLaunch, 1400);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 sm:px-6 md:px-10 lg:px-16 text-center launch-page-enter overflow-hidden">
      {/* Ambient floating bubbles — always visible */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[
          { w: 80, l: "8%", t: "15%", dur: "6s", del: "0s" },
          { w: 50, l: "75%", t: "20%", dur: "8s", del: "1s" },
          { w: 120, l: "60%", t: "70%", dur: "7s", del: "0.5s" },
          { w: 40, l: "20%", t: "75%", dur: "9s", del: "2s" },
          { w: 65, l: "90%", t: "50%", dur: "7.5s", del: "1.5s" },
          { w: 35, l: "45%", t: "10%", dur: "10s", del: "3s" },
          { w: 90, l: "15%", t: "45%", dur: "8.5s", del: "0.8s" },
          { w: 55, l: "82%", t: "85%", dur: "6.5s", del: "2.5s" },
        ].map((b, i) => (
          <div
            key={i}
            className="ambient-bubble"
            style={{
              width: b.w,
              height: b.w,
              left: b.l,
              top: b.t,
              animationDuration: b.dur,
              animationDelay: b.del,
            }}
          />
        ))}
      </div>

      {/* Top badge */}
      <div
        className={`mb-6 sm:mb-8 md:mb-10 fade-in-up ${
          launched ? "launch-exit-up" : ""
        }`}
        style={{ animationDelay: launched ? "0.35s" : "0.2s" }}
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium tracking-widest uppercase border rounded-full text-slate-500 border-slate-200 bg-white backdrop-blur-sm shadow-sm">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse" />
          Ready to Launch
        </span>
      </div>

      {/* Main heading */}
      <h1
        className={`mb-3 sm:mb-4 md:mb-5 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight fade-in-up ${
          launched ? "launch-exit-up" : ""
        }`}
        style={{
          animationDelay: launched ? "0.25s" : "0.4s",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <span className="text-slate-900">CSBS</span>
        <span className="text-red-500 mx-1.5 sm:mx-2 md:mx-3 font-light">
          ×
        </span>
        <span className="text-slate-900">VITB</span>
      </h1>

      {/* Subtitle */}
      <p
        className={`max-w-xs sm:max-w-md md:max-w-lg mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-slate-500 fade-in-up ${
          launched ? "launch-exit-up" : ""
        }`}
        style={{ animationDelay: launched ? "0.2s" : "0.6s" }}
      >
        Department of Computer Science &amp; Business Systems
      </p>

      <p
        className={`max-w-xs sm:max-w-sm md:max-w-md mb-8 sm:mb-10 md:mb-12 text-xs sm:text-sm md:text-base font-light text-slate-400 fade-in-up ${
          launched ? "launch-exit-up" : ""
        }`}
        style={{ animationDelay: launched ? "0.15s" : "0.7s" }}
      >
        Vishnu Institute of Technology , Bhimavaram
      </p>

      {/* Divider line */}
      <div
        className={`w-16 sm:w-20 md:w-24 lg:w-28 h-0.5 mb-8 sm:mb-10 md:mb-12 fade-in-up ${
          launched ? "launch-exit-scale" : ""
        }`}
        style={{
          animationDelay: launched ? "0.1s" : "0.8s",
          background: "linear-gradient(90deg, #3B82F6, #EF4444)",
        }}
      />

      {/* Launch button — circular */}
      <div
        className="fade-in-up"
        style={{ animationDelay: launched ? "0s" : "1s" }}
      >
        <div className="relative" style={{ overflow: "visible" }}>
          {/* Ripple rings — appear on click */}
          {launched && (
            <>
              <span
                className="absolute inset-0 rounded-full launch-ripple"
                style={{ animationDelay: "0s" }}
              />
              <span
                className="absolute inset-0 rounded-full launch-ripple"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="absolute inset-0 rounded-full launch-ripple"
                style={{ animationDelay: "0.3s" }}
              />
            </>
          )}

          {/* Bubble burst — appear on click */}
          {launched &&
            bubbles.map((b) => (
              <span
                key={b.id}
                className="absolute left-1/2 top-1/2 rounded-full bubble-float"
                style={
                  {
                    width: b.size,
                    height: b.size,
                    backgroundColor:
                      b.id % 4 === 0
                        ? "rgba(59, 130, 246, 0.7)"
                        : b.id % 4 === 1
                          ? "rgba(96, 165, 250, 0.6)"
                          : b.id % 4 === 2
                            ? "rgba(147, 197, 253, 0.55)"
                            : "rgba(37, 99, 235, 0.65)",
                    "--bx": `${b.x}px`,
                    "--by": `${b.y}px`,
                    "--bdrift": `${b.drift}px`,
                    animationDelay: `${b.delay}s`,
                    animationDuration: `${b.duration}s`,
                  } as React.CSSProperties
                }
              />
            ))}

          <button
            onClick={handleClick}
            className={`launch-btn group relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 flex items-center justify-center transition-all duration-500 border-2 rounded-full cursor-pointer ${
              launched
                ? "border-blue-500 text-white scale-90 launch-btn-confirmed"
                : "text-slate-800 border-blue-300 bg-white hover:border-blue-500 hover:bg-blue-50 active:scale-95"
            }`}
            style={launched ? { background: "linear-gradient(135deg, #3B82F6, #6366F1)" } : undefined}
          >
            {/* Orbiting ring */}
            {!launched && (
              <span className="absolute inset-[-4px] sm:inset-[-6px] md:inset-[-8px] rounded-full border border-blue-100 group-hover:border-blue-200 transition-colors duration-500" />
            )}

            <span className="relative flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3">
              {launched ? (
                /* Checkmark icon — appears after click */
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 launch-check"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <>
                  {/* Rocket icon */}
                  <svg
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 transition-transform duration-500 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                  <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold tracking-[0.2em] uppercase">
                    Launch
                  </span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom hint */}
      <p
        className={`mt-6 sm:mt-8 md:mt-10 text-[10px] sm:text-xs md:text-sm tracking-wide text-slate-400 fade-in-up ${
          launched ? "launch-exit-down" : ""
        }`}
        style={{ animationDelay: launched ? "0.05s" : "1.3s" }}
      >
        {launched ? "Hang tight…" : "Click to begin the experience"}
      </p>
    </div>
  );
}
