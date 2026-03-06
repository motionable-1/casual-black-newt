import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

const StatCard: React.FC<{
  icon: string;
  label: string;
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  delay: number;
  frame: number;
  fps: number;
}> = ({ icon, label, from, to, suffix, prefix, delay, frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(20,20,24,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "14px 18px",
        backdropFilter: "blur(12px)",
        minWidth: 140,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <Img src={icon} width={20} height={20} />
        <span style={{ fontFamily: bodyFont, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontFamily: headingFont, fontSize: 26, fontWeight: 700, color: "#FAFAFA" }}>
        <Counter from={from} to={to} duration={1.8} delay={delay / fps} suffix={suffix} prefix={prefix} ease="smooth" separator="," />
      </div>
    </div>
  );
};

export const SceneLinkInBio: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phone mockup
  const phoneScale = spring({ frame, fps, config: { damping: 16, stiffness: 90 }, delay: 8 });
  const phoneY = interpolate(frame, [8, 40], [80, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const phoneOpacity = interpolate(frame, [8, 22], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const floatY = Math.sin(frame / 28) * 3;

  // Label
  const labelScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay: 3 });
  const labelOpacity = interpolate(frame, [3, 13], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Phone mockup - left side */}
      <div
        className="absolute"
        style={{
          left: 140,
          top: "50%",
          transform: `translateY(-50%) translateY(${phoneY + floatY}px) scale(${phoneScale})`,
          opacity: phoneOpacity,
          width: 320,
        }}
      >
        {/* Phone frame */}
        <div
          style={{
            borderRadius: 32,
            overflow: "hidden",
            boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
            background: "#18181B",
            padding: 6,
          }}
        >
          <div style={{ borderRadius: 28, overflow: "hidden" }}>
            <Img
              src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1772803656713_9gpfq1k97t_superlinks_linkinbio.png"
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>
        {/* Phone glow */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: "15%",
            width: "70%",
            height: 40,
            background: "radial-gradient(ellipse, rgba(245,107,61,0.2) 0%, transparent 70%)",
            filter: "blur(15px)",
          }}
        />
      </div>

      {/* Right text content */}
      <div className="absolute" style={{ right: 100, top: "50%", transform: "translateY(-50%)", width: 500 }}>
        {/* Feature label */}
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
          <Img src="https://api.iconify.design/ph/link-bold.svg?color=%23F56B3D&width=18" width={18} height={18} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, fontWeight: 600, color: "#F56B3D", letterSpacing: "0.05em" }}>
            LINK-IN-BIO
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
                stagger: 0.06,
                duration: 0.6,
                ease: "back.out(1.3)",
              });
              return tl;
            }}
            startFrom={8}
            perspective={600}
            style={{ fontFamily: headingFont, fontSize: 46, fontWeight: 700, color: "#FAFAFA", lineHeight: 1.15 }}
          >
            Beautiful Pages, Real Analytics
          </TextAnimation>
        </div>

        <div style={{ marginTop: 16 }}>
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
            startFrom={22}
            style={{ fontFamily: bodyFont, fontSize: 20, fontWeight: 400, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}
          >
            Stunning landing pages with built-in analytics. Track clicks, conversions, and revenue in real-time.
          </TextAnimation>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
          <StatCard
            icon="https://api.iconify.design/ph/chart-line-up-bold.svg?color=%23F56B3D&width=20"
            label="Page Views"
            from={0}
            to={24580}
            delay={45}
            frame={frame}
            fps={fps}
          />
          <StatCard
            icon="https://api.iconify.design/ph/cursor-click-fill.svg?color=%23F56B3D&width=20"
            label="Click Rate"
            from={0}
            to={67}
            suffix="%"
            delay={50}
            frame={frame}
            fps={fps}
          />
          <StatCard
            icon="https://api.iconify.design/ph/users-fill.svg?color=%23F56B3D&width=20"
            label="Subscribers"
            from={0}
            to={1247}
            delay={55}
            frame={frame}
            fps={fps}
          />
        </div>
      </div>
    </div>
  );
};
