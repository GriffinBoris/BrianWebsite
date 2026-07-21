import commercialSrc from "@/assets/media/commercial-demo.mp3";
import narrationSrc from "@/assets/media/narration-demo.mp3";

export interface DemoTrack {
  id: string;
  kicker: string;
  title: string;
  description: string;
  src: string;
  downloadName: string;
  fallbackDuration: string;
}

export const demoTracks: DemoTrack[] = [
  {
    id: "commercial",
    kicker: "Commercial",
    title: "Commercial Demo",
    description: "Retail and brand spots. Bright, quick, and broadcast-ready.",
    src: commercialSrc,
    downloadName: "brian-bakaj-commercial-demo.mp3",
    fallbackDuration: "0:59",
  },
  {
    id: "narration",
    kicker: "Narration",
    title: "Narration Demo",
    description: "Explainer, corporate, and long-form. Steady, clear, easy to follow.",
    src: narrationSrc,
    downloadName: "brian-bakaj-narration-demo.mp3",
    fallbackDuration: "1:21",
  },
];
