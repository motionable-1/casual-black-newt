import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import {
  TransitionSeries,
  springTiming,
} from "../library/components/layout/Transition";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { maskReveal } from "../library/components/layout/transitions/presentations/maskReveal";
import { zoomIn } from "../library/components/layout/transitions/presentations/zoomIn";

import { Background } from "./scenes/Background";
import { SceneHero } from "./scenes/SceneHero";
import { SceneAIContent } from "./scenes/SceneAIContent";
import { SceneLinkInBio } from "./scenes/SceneLinkInBio";
import { SceneEmail } from "./scenes/SceneEmail";
import { SceneDashboard } from "./scenes/SceneDashboard";
import { SceneCTA } from "./scenes/SceneCTA";

// Scene durations (in frames at 30fps)
const SCENE_HERO = 140;
const SCENE_AI = 130;
const SCENE_LINK = 130;
const SCENE_EMAIL = 130;
const SCENE_DASHBOARD = 140;
const SCENE_CTA = 140;
const TRANSITION = 15;

// Total = sum(scenes) - sum(transitions)
// 780 - 75 = 705 frames + ~30 buffer = 735

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      {/* Global background - persists across all scenes */}
      <AbsoluteFill>
        <Background />
      </AbsoluteFill>

      {/* Scene transitions */}
      <AbsoluteFill>
        <TransitionSeries>
          {/* Scene 1: Hero */}
          <TransitionSeries.Sequence durationInFrames={SCENE_HERO}>
            <AbsoluteFill>
              <SceneHero />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION })}
          />

          {/* Scene 2: AI Content */}
          <TransitionSeries.Sequence durationInFrames={SCENE_AI}>
            <AbsoluteFill>
              <SceneAIContent />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={maskReveal()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION })}
          />

          {/* Scene 3: Link in Bio */}
          <TransitionSeries.Sequence durationInFrames={SCENE_LINK}>
            <AbsoluteFill>
              <SceneLinkInBio />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION })}
          />

          {/* Scene 4: Email + Payments */}
          <TransitionSeries.Sequence durationInFrames={SCENE_EMAIL}>
            <AbsoluteFill>
              <SceneEmail />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={zoomIn()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION })}
          />

          {/* Scene 5: Dashboard */}
          <TransitionSeries.Sequence durationInFrames={SCENE_DASHBOARD}>
            <AbsoluteFill>
              <SceneDashboard />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION })}
          />

          {/* Scene 6: CTA */}
          <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
            <AbsoluteFill>
              <SceneCTA />
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
