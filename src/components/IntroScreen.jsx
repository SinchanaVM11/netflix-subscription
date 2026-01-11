import { useRef } from "react";
import "./IntroScreen.css";

export default function IntroScreen({ onFinish }) {
  const videoRef = useRef(null);

  const handleEnableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
    } catch (err) {
      console.error("Video play failed:", err);
    }

    // Go to next screen ONLY after video ends
    video.onended = () => {
      onFinish();
    };
  };

  return (
    <div className="intro-container">
      <video
        ref={videoRef}
        className="intro-video"
        muted
        playsInline
        preload="auto"
      >
        <source
          src={`${process.env.PUBLIC_URL}/intro.mp4`}
          type="video/mp4"
        />
      </video>

      <button className="sound-btn" onClick={handleEnableSound}>
        Enable Sound
      </button>
    </div>
  );
}
