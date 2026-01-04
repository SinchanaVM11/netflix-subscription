import { useEffect, useRef, useState } from "react";
import "./IntroScreen.css";

export default function IntroScreen({ onFinish }) {
  const videoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Start intro only after user enables sound
  const startIntroWithSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;   // 🔁 restart video
    video.muted = false;
    video.play().catch(() => {});
    setSoundEnabled(true);
  };

  // Auto move to main app AFTER intro completes
  useEffect(() => {
    if (!soundEnabled) return;

    const video = videoRef.current;
    if (!video) return;

    video.onended = () => onFinish();

    return () => {
      video.onended = null;
    };
  }, [soundEnabled, onFinish]);

  return (
    <div className="intro-container" onClick={startIntroWithSound}>
      <video
        ref={videoRef}
        src="/intro.mp4"
        className="intro-video"
        muted
        playsInline
        preload="auto"
      />

      {!soundEnabled && (
        <div className="sound-overlay">
          Tap to enable sound
        </div>
      )}
    </div>
  );
}
