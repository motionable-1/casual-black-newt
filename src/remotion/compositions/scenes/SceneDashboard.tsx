import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

const GrowthBar: React.FC<{
  height: number;
  delay: number;
  frame: number;
  fps: number;
  label: string;
}> = ({ height, delay, frame, fps, label }) => {
  const barHeight = spring({ frame, fps, config: { damping: 18, stiffness: 80 }, delay });
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity }}>
      <div style={{ height: 160, display: "flex", alignItems: "flex-end" }}>
        <div
          style={{
            width: 36,
            height: height * barHeight,
            background: "linear-gradient(to top, #F56B3D, rgba(245,107,61,0.5))",
            borderRadius: "6px 6px 2px 2px",
            boxShadow: "0 0 20px rgba(245,107,61,0.2)",
          }}
        />
      </div>
      <span style={{ fontFamily: bodyFont, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{label}</span>
    </div>
  );
};

export const SceneDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const months = [
    { label: "Jan", height: 40 },
    { label: "Feb", height: 55 },
    { label: "Mar", height: 70 },
    { label: "Apr", height: 85 },
    { label: "May", height: 110 },
    { label: "Jun", height: 140 },
    { label: "Jul", height: 160 },
  ];

  // Big counter animations
  const counterDelay = 25;

  // Chart container
  const chartScale = spring({ frame, fps, config: { damping: 16, stiffness: 90 }, delay: 15 });
  const chartOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Center headline */}
      <div className="absolute" style={{ top: 80, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <TextAnimation
          createTimeline={({ tl, textRef, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.from(split.chars, {
              y: 40,
              opacity: 0,
              stagger: 0.03,
              duration: 0.5,
              ease: "back.out(1.5)",
            });
            return tl;
          }}
          startFrom={5}
          style={{ fontFamily: headingFont, fontSize: 44, fontWeight: 700, color: "#FAFAFA", textAlign: "center" }}
        >
          Watch Your Revenue Grow
        </TextAnimation>
      </div>

      {/* Stats row */}
      <div
        className="absolute"
        style={{
          top: 170,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 50,
        }}
      >
        {[
          { icon: "ph/currency-dollar-fill", label: "Total Revenue", from: 0, to: 48750, prefix: "$", delay: counterDelay },
          { icon: "ph/users-fill", label: "Members", from: 0, to: 2847, delay: counterDelay + 5 },
          { icon: "ph/chart-line-up-bold", label: "Growth", from: 0, to: 284, suffix: "%", delay: counterDelay + 10 },
        ].map((stat, i) => {
          const statScale = spring({ frame, fps, config: { damping: 14, stiffness: 110 }, delay: stat.delay });
          const statOpacity = interpolate(frame, [stat.delay, stat.delay + 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          return (
            <div key={i} style={{ textAlign: "center", opacity: statOpacity, transform: `scale(${statScale})` }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
                <Img src={`https://api.iconify.design/${stat.icon}.svg?color=%23F56B3D&width=28`} width={28} height={28} />
              </div>
              <div style={{ fontFamily: headingFont, fontSize: 36, fontWeight: 700, color: "#FAFAFA" }}>
                <Counter
                  from={stat.from}
                  to={stat.to}
                  duration={2}
                  delay={stat.delay / fps}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  separator=","
                  ease="smooth"
                />
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bar chart */}
      <div
        className="absolute"
        style={{
          bottom: 140,
          left: "50%",
          transform: `translateX(-50%) scale(${chartScale})`,
          opacity: chartOpacity,
          display: "flex",
          gap: 24,
          alignItems: "flex-end",
          background: "rgba(20,20,24,0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "30px 40px 20px",
          backdropFilter: "blur(12px)",
        }}
      >
        {months.map((month, i) => (
          <GrowthBar
            key={i}
            height={month.height}
            delay={35 + i * 4}
            frame={frame}
            fps={fps}
            label={month.label}
          />
        ))}
      </div>
    </div>
  );
};
