import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

export const SceneAIContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature label
  const labelScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay: 5 });
  const labelOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Image card
  const cardScale = spring({ frame, fps, config: { damping: 16, stiffness: 80 }, delay: 20 });
  const cardY = interpolate(frame, [20, 50], [50, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const cardOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Floating items around the card
  const items = [
    { icon: "ph/book-open-fill", label: "Courses", x: -80, y: -50, delay: 45 },
    { icon: "ph/file-text-fill", label: "E-books", x: 520, y: -30, delay: 50 },
    { icon: "ph/video-fill", label: "Webinars", x: 540, y: 200, delay: 55 },
    { icon: "ph/graduation-cap-fill", label: "Coaching", x: -60, y: 220, delay: 60 },
  ];

  const floatY = Math.sin(frame / 25) * 3;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Left text */}
      <div className="absolute" style={{ left: 340, top: "50%", transform: "translateY(-50%)", width: 560 }}>
        {/* Feature number label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `scale(${labelScale})`,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(245,107,61,0.1)",
            border: "1px solid rgba(245,107,61,0.2)",
            borderRadius: 999,
            padding: "6px 16px",
          }}
        >
          <Img src="https://api.iconify.design/ph/sparkle-fill.svg?color=%23F56B3D&width=18" width={18} height={18} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, fontWeight: 600, color: "#F56B3D", letterSpacing: "0.05em" }}>
            AI-POWERED
          </span>
        </div>

        <div style={{ marginTop: 20 }}>
          <TextAnimation
            createTimeline={({ tl, textRef, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                y: 50,
                opacity: 0,
                rotateX: -30,
                stagger: 0.07,
                duration: 0.6,
                ease: "back.out(1.3)",
              });
              return tl;
            }}
            startFrom={10}
            perspective={600}
            style={{ fontFamily: headingFont, fontSize: 48, fontWeight: 700, color: "#FAFAFA", lineHeight: 1.15 }}
          >
            AI Creates Your Content
          </TextAnimation>
        </div>

        <div style={{ marginTop: 18 }}>
          <TextAnimation
            createTimeline={({ tl, textRef, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                y: 15,
                opacity: 0,
                stagger: 0.025,
                duration: 0.4,
                ease: "power2.out",
              });
              return tl;
            }}
            startFrom={25}
            style={{ fontFamily: bodyFont, fontSize: 21, fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}
          >
            From course outlines to e-book chapters — AI generates polished content from your knowledge in seconds.
          </TextAnimation>
        </div>
      </div>

      {/* Right - AI assistant image with floating items */}
      <div
        className="absolute"
        style={{
          left: 1060,
          top: "50%",
          transform: `translateY(-50%) translateY(${cardY + floatY}px) scale(${cardScale})`,
          opacity: cardOpacity,
          width: 520,
        }}
      >
        {/* Main image card */}
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <Img
            src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772803634935_m9234u0g6_superlinks_ai_assistant.png"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* Floating product type pills */}
        {items.map((item, i) => {
          const itemScale = spring({ frame, fps, config: { damping: 12, stiffness: 130 }, delay: item.delay });
          const itemOpacity = interpolate(frame, [item.delay, item.delay + 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const itemFloat = Math.sin((frame + i * 15) / 20) * 4;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y + itemFloat,
                transform: `scale(${itemScale})`,
                opacity: itemOpacity,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(20,20,24,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                padding: "8px 14px",
                backdropFilter: "blur(10px)",
              }}
            >
              <Img
                src={`https://api.iconify.design/${item.icon}.svg?color=%23F56B3D&width=22`}
                width={22}
                height={22}
              />
              <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 500, color: "#FAFAFA" }}>
                {item.label}
              </span>
            </div>
          );
        })}

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            bottom: -25,
            left: "10%",
            width: "80%",
            height: 50,
            background: "radial-gradient(ellipse, rgba(245,107,61,0.2) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />
      </div>
    </div>
  );
};
