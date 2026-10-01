"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    function startVideo() {
      if (document.hidden) return;
      video.muted = true;
      video.play().catch(() => {});
    }

    startVideo();
    video.addEventListener("canplay", startVideo);
    document.addEventListener("visibilitychange", startVideo);
    return () => {
      video.removeEventListener("canplay", startVideo);
      document.removeEventListener("visibilitychange", startVideo);
    };
  }, []);

  return (
    <div className="home-hero-media" aria-hidden="true">
      <video ref={videoRef} autoPlay muted playsInline loop preload="metadata">
        <source
          src="https://media.ryravel.com/ryravel-hero.mp4?v=20260831"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
