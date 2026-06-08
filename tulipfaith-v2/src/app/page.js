"use client";

import { useState } from "react";
import IntroOverlay   from "@/components/cinematic/IntroOverlay";
import TunnelExperience from "@/components/cinematic/TunnelExperience";
import LandingPage    from "@/components/landing/LandingPage";

export default function Home() {
  const [phase, setPhase] = useState("intro"); // intro | tunnel | site

  return (
    <div style={{ background: '#030108', minHeight: '100vh' }}>
      {phase === "intro" && (
        <IntroOverlay
          onComplete={() => setPhase("tunnel")}
          onReveal={() => {}}
        />
      )}

      {phase === "tunnel" && (
        <TunnelExperience onComplete={() => setPhase("site")} />
      )}

      {phase === "site" && <LandingPage />}
    </div>
  );
}
