import { useState } from "react";
import "./App.css";
import ParticleBackground from "./components/ParticleBackground";
import LaunchPage from "./components/LaunchPage";
import CountdownPage from "./components/CountdownPage";
import LoadingRedirect from "./components/LoadingRedirect";

type Phase = "launch" | "countdown" | "loading";

function App() {
  const [phase, setPhase] = useState<Phase>("launch");
  const [transitioning, setTransitioning] = useState(false);

  const handleLaunch = () => {
    // LaunchPage already played its exit choreography before calling this
    setTransitioning(true);
    // Brief blank moment, then enter countdown
    setTimeout(() => {
      setPhase("countdown");
      setTransitioning(false);
    }, 300);
  };

  const handleCountdownComplete = () => {
    setPhase("loading");
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-white">
      {/* Subtle vignette overlay */}
      <div className="fixed inset-0 bg-blue-50/30 z-0" />

      {/* Particles */}
      <ParticleBackground />

      {/* Phase content */}
      <div
        className={`transition-opacity duration-500 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {phase === "launch" && <LaunchPage onLaunch={handleLaunch} />}
        {phase === "countdown" && (
          <CountdownPage onComplete={handleCountdownComplete} />
        )}
        {phase === "loading" && <LoadingRedirect />}
      </div>
    </div>
  );
}

export default App;
