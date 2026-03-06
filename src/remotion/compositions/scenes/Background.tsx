import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Particles } from "../../library/components/effects/Particles";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slow breathing gradient animation
  const gradX = 30 + 15 * Math.sin(time * 0.3);
  const gradY = 20 + 10 * Math.cos(time * 0.25);
  const grad2X = 70 + 10 * Math.cos(time * 0.2);
  const grad2Y = 60 + 15 * Math.sin(time * 0.35);

  const pulseOpacity = interpolate(
    Math.sin(time * 0.8),
    [-1, 1],
    [0.12, 0.28]
  );

  return (
    <div
      className="absolute inset-0"
      style={{ backgroundColor: "#09090B" }}
    >
      {/* Animated radial gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${gradX}% ${gradY}%, rgba(245,107,61,${pulseOpacity}), transparent 50%),
            radial-gradient(circle at ${grad2X}% ${grad2Y}%, rgba(245,107,61,0.08), transparent 45%)
          `,
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }}
      />

      {/* Floating particles */}
      <Particles
        type="dust"
        count={20}
        colors={["rgba(245,107,61,0.3)", "rgba(255,255,255,0.15)", "rgba(245,107,61,0.15)"]}
        speed={0.3}
        size={[1, 3]}
        seed="superlinks"
      />

      {/* Ambient glow orb */}
      <div
        className="absolute"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,107,61,0.06) 0%, transparent 70%)",
          left: `${50 + 8 * Math.sin(time * 0.15)}%`,
          top: `${50 + 6 * Math.cos(time * 0.2)}%`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};
