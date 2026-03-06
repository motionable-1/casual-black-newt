import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, Audio } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

const CHIME_URL = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1772803591361_ng3r64tm92_sfx_Soft_ambient_digital_chime_not.mp3";

export const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CTA button
  const btnScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 40 });
  const btnOpacity = interpolate(frame, [40, 50], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Pulsing glow on button
  const btnGlow = interpolate(Math.sin(frame / 10), [-1, 1], [0.3, 0.7]);

  // "Under 5 min" badge
  const badgeScale = spring({ frame, fps, config: { damping: 14, stiffness: 130 }, delay: 55 });
  const badgeOpacity = interpolate(frame, [55, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Floating shapes
  const shapes = [
    { x: 120, y: 180, size: 40, shape: "circle" as const, delay: 0.2 },
    { x: 1100, y: 250, size: 30, shape: "diamond" as const, delay: 0.5 },
    { x: 200, y: 500, size: 25, shape: "hexagon" as const, delay: 0.8 },
    { x: 1050, y: 520, size: 35, shape: "ring" as const, delay: 0.3 },
    { x: 900, y: 140, size: 20, shape: "star" as const, delay: 0.6 },
    { x: 350, y: 120, size: 22, shape: "triangle" as const, delay: 0.4 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Audio src={CHIME_URL} volume={0.25} startFrom={0} />

      {/* Floating decorative shapes */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y + Math.sin((frame + i * 20) / 25) * 8,
            opacity: interpolate(frame, [10 + i * 3, 20 + i * 3], [0, 0.15], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          }}
        >
          <ShapeAnimation
            shape={s.shape}
            animation="breathe"
            size={s.size}
            color="#F56B3D"
            speed={0.4}
            delay={s.delay}
          />
        </div>
      ))}

      {/* Center content */}
      <div style={{ textAlign: "center", maxWidth: 800 }}>
        {/* V2.0 badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              opacity: interpolate(frame, [5, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
              transform: `scale(${spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay: 5 })})`,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(245,107,61,0.12)",
              border: "1px solid rgba(245,107,61,0.3)",
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            <Img src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23F56B3D&width=20" width={20} height={20} />
            <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 700, color: "#F56B3D", letterSpacing: "0.06em" }}>
              AI AUTO-LAUNCH V2.0
            </span>
          </div>
        </div>

        {/* Main CTA text */}
        <TextAnimation
          createTimeline={({ tl, textRef, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              y: 70,
              opacity: 0,
              scale: 0.8,
              rotateX: -40,
              stagger: 0.05,
              duration: 0.7,
              ease: "back.out(1.5)",
            });
            return tl;
          }}
          startFrom={12}
          perspective={800}
          style={{ fontFamily: headingFont, fontSize: 58, fontWeight: 700, color: "#FAFAFA", lineHeight: 1.1, textWrap: "balance" }}
        >
          Launch in Under 5 Minutes
        </TextAnimation>

        {/* Subtitle */}
        <div style={{ marginTop: 20 }}>
          <TextAnimation
            createTimeline={({ tl, textRef, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.from(split.words, {
                y: 15,
                opacity: 0,
                stagger: 0.03,
                duration: 0.4,
                ease: "power2.out",
              });
              return tl;
            }}
            startFrom={28}
            style={{ fontFamily: bodyFont, fontSize: 20, fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}
          >
            No coding. No complexity. Just your knowledge turned into revenue.
          </TextAnimation>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 36,
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#F56B3D",
              borderRadius: 12,
              padding: "16px 36px",
              boxShadow: `0 0 ${30 + btnGlow * 20}px rgba(245,107,61,${btnGlow}), 0 8px 30px rgba(245,107,61,0.3)`,
            }}
          >
            <Img src="https://api.iconify.design/ph/lightning-fill.svg?color=%23ffffff&width=22" width={22} height={22} />
            <span style={{ fontFamily: bodyFont, fontSize: 18, fontWeight: 700, color: "#FAFAFA", letterSpacing: "0.02em" }}>
              Start Building Free
            </span>
          </div>
        </div>

        {/* Under 5 min badge */}
        <div
          style={{
            marginTop: 22,
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span style={{ fontFamily: bodyFont, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
            ⏱ Setup takes less than 5 minutes • No credit card required
          </span>
        </div>

        {/* Superlinks wordmark */}
        <div
          style={{
            marginTop: 36,
            opacity: interpolate(frame, [65, 75], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          }}
        >
          <span style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 700, color: "#F56B3D", letterSpacing: "-0.02em" }}>
            superlinks
          </span>
          <span style={{ fontFamily: headingFont, fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "-0.02em" }}>
            .ai
          </span>
        </div>
      </div>
    </div>
  );
};
