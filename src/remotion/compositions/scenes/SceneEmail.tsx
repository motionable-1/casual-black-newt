import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Counter } from "../../library/components/text/Counter";
import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";

const { fontFamily: headingFont } = loadFont();
const { fontFamily: bodyFont } = loadOutfit();

const EmailCard: React.FC<{
  subject: string;
  preview: string;
  delay: number;
  frame: number;
  fps: number;
  index: number;
}> = ({ subject, preview, delay, frame, fps, index }) => {
  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 110 }, delay });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const x = interpolate(frame, [delay, delay + 15], [40, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const floatY = Math.sin((frame + index * 20) / 22) * 2;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateX(${x}px) translateY(${floatY}px)`,
        background: "rgba(20,20,24,0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "14px 18px",
        backdropFilter: "blur(12px)",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F56B3D" }} />
        <span style={{ fontFamily: bodyFont, fontSize: 14, fontWeight: 600, color: "#FAFAFA" }}>{subject}</span>
      </div>
      <span style={{ fontFamily: bodyFont, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{preview}</span>
    </div>
  );
};

export const SceneEmail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 }, delay: 3 });
  const labelOpacity = interpolate(frame, [3, 13], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  // Payment integration card
  const payScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, delay: 55 });
  const payOpacity = interpolate(frame, [55, 65], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const emails = [
    { subject: "Welcome to Your Journey", preview: "Thanks for joining! Here's what to expect..." },
    { subject: "Your First Lesson is Ready", preview: "Dive into Module 1: Getting Started with..." },
    { subject: "Special Offer Inside", preview: "Unlock the premium bundle at 40% off today..." },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Left text */}
      <div className="absolute" style={{ left: 400, top: "50%", transform: "translateY(-50%)", width: 520 }}>
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
          <Img src="https://api.iconify.design/ph/envelope-simple-fill.svg?color=%23F56B3D&width=18" width={18} height={18} />
          <span style={{ fontFamily: bodyFont, fontSize: 13, fontWeight: 600, color: "#F56B3D", letterSpacing: "0.05em" }}>
            EMAIL + PAYMENTS
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
            Automate Emails, Collect Payments
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
            Drip campaigns, welcome sequences, and built-in Stripe payments — all on autopilot.
          </TextAnimation>
        </div>

        {/* Payment stats */}
        <div
          style={{
            opacity: payOpacity,
            transform: `scale(${payScale})`,
            display: "flex",
            gap: 20,
            marginTop: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Img src="https://api.iconify.design/ph/currency-dollar-fill.svg?color=%23F56B3D&width=28" width={28} height={28} />
            <div>
              <div style={{ fontFamily: headingFont, fontSize: 24, fontWeight: 700, color: "#FAFAFA" }}>
                <Counter from={0} to={12847} duration={2} delay={55 / fps} prefix="$" separator="," ease="smooth" />
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Revenue This Month</div>
            </div>
          </div>
          <div style={{ width: 1, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Img src="https://api.iconify.design/ph/users-fill.svg?color=%23F56B3D&width=28" width={28} height={28} />
            <div>
              <div style={{ fontFamily: headingFont, fontSize: 24, fontWeight: 700, color: "#FAFAFA" }}>
                <Counter from={0} to={847} duration={2} delay={58 / fps} separator="," ease="smooth" />
              </div>
              <div style={{ fontFamily: bodyFont, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Paying Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Email cards */}
      <div className="absolute" style={{ right: 400, top: "50%", transform: "translateY(-50%)", width: 480 }}>
        {emails.map((email, i) => (
          <EmailCard
            key={i}
            subject={email.subject}
            preview={email.preview}
            delay={30 + i * 8}
            frame={frame}
            fps={fps}
            index={i}
          />
        ))}

        {/* Automation flow line */}
        <div
          style={{
            position: "absolute",
            left: -30,
            top: 20,
            width: 3,
            height: interpolate(frame, [30, 70], [0, 200], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
            background: "linear-gradient(to bottom, #F56B3D, rgba(245,107,61,0.1))",
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
