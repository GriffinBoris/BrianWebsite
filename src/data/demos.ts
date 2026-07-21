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
    description:
      "Retail and brand spots — bright and quick on its feet, with enough polish for broadcast and enough warmth to feel real.",
    src: commercialSrc,
    downloadName: "brian-bakaj-commercial-demo.mp3",
    fallbackDuration: "0:59",
  },
  {
    id: "narration",
    kicker: "Narration",
    title: "Narration Demo",
    description:
      "Explainer, corporate, and long-form storytelling — a steady, clear read that holds attention start to finish and stays out of the script’s way.",
    src: narrationSrc,
    downloadName: "brian-bakaj-narration-demo.mp3",
    fallbackDuration: "1:21",
  },
];
