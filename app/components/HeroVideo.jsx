"use client";

import { useEffect, useRef } from "react";

const OUTRO_SECONDS = 6;

export default function HeroVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    function startVideo() {
      video.muted = true;
      video.play().catch(() => {});
    }

    function skipBrandedOutro() {
      if (
        Number.isFinite(video.duration) &&
        video.duration > OUTRO_SECONDS + 1 &&
        video.currentTime >= video.duration - OUTRO_SECONDS
      ) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }

    startVideo();
    video.addEventListener("canplay", startVideo);
    video.addEventListener("timeupdate", skipBrandedOutro);
    document.addEventListener("visibilitychange", startVideo);
    return () => {
      video.removeEventListener("canplay", startVideo);
      video.removeEventListener("timeupdate", skipBrandedOutro);
      document.removeEventListener("visibilitychange", startVideo);
    };
  }, []);

  return (
    <div className="home-hero-media" aria-hidden="true">
      <video ref={videoRef} autoPlay muted playsInline preload="auto">
        <source src="https://media.ryravel.com/ryravel-hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
