import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, Audio } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

const WHOOSH_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772803588421_zh353l720i_sfx_Futuristic_tech_startup_whoosh.mp3";

export const SceneHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge animation
  const badgeScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay: 5 });
  const badgeOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Sparkle icon
  const sparkleScale = spring({ frame, fps, config: { damping: 10, stiffness: 150 }, delay: 8 });
  const sparkleRotate = interpolate(frame, [8, 40], [0, 15], { extrapolateRight: "clamp" });

  // Image float in
  const imgScale = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, delay: 35 });
  const imgY = interpolate(frame, [35, 65], [60, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const imgOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Ambient float for image
  const floatY = Math.sin(frame / 30) * 4;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Audio src={WHOOSH_URL} volume={0.3} startFrom={0} />

      {/* Left content */}
      <div className="absolute" style={{ left: 100, top: "50%", transform: "translateY(-50%)", width: 620 }}>
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            background: "rgba(245,107,61,0.12)",
            border: "1px solid rgba(245,107,61,0.25)",
          }}
        >
          <Img
            src="https://api.iconify.design/ph/sparkle-fill.svg?color=%23F56B3D&width=20"
            width={20}
            height={20}
            style={{ transform: `scale(${sparkleScale}) rotate(${sparkleRotate}deg)` }}
          />
          <span style={{ fontFamily: bodyFont, color: "#F56B3D", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em" }}>
            AI AUTO-LAUNCH V2.0
          </span>
        </div>

        {/* Main headline */}
        <div style={{ marginTop: 16 }}>
          <TextAnimation
            createTimeline={({ tl, textRef, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                y: 60,
                opacity: 0,
                rotateX: -40,
                stagger: 0.06,
                duration: 0.7,
                ease: "back.out(1.4)",
              });
              return tl;
            }}
            startFrom={12}
            perspective={800}
            style={{ fontFamily: headingFont, fontSize: 62, fontWeight: 700, color: "#FAFAFA", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Turn Your Knowledge Into Income
          </TextAnimation>
        </div>

        {/* Subtitle */}
        <div style={{ marginTop: 24 }}>
          <TextAnimation
            createTimeline={({ tl, textRef, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                y: 20,
                opacity: 0,
                stagger: 0.03,
                duration: 0.5,
                ease: "power2.out",
              });
              return tl;
            }}
            startFrom={30}
            style={{ fontFamily: bodyFont, fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}
          >
            Create, launch, and sell digital products with AI superpowers — zero coding required.
          </TextAnimation>
        </div>
      </div>

      {/* Right image - Dashboard preview */}
      <div
        className="absolute"
        style={{
          right: 60,
          top: "50%",
          transform: `translateY(-50%) translateY(${imgY + floatY}px) scale(${imgScale})`,
          opacity: imgOpacity,
          width: 580,
        }}
      >
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(245,107,61,0.15), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        >
          <Img
            src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772803616076_dbdz8z5rade_superlinks_dashboard.png"
            style={{ width: "100%", display: "block" }}
          />
        </div>
        {/* Glow under image */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: "10%",
            width: "80%",
            height: 60,
            background: "radial-gradient(ellipse, rgba(245,107,61,0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>
    </div>
  );
};
