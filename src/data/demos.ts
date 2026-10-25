import commercialSrc from "@/assets/media/commercial-demo.mp3";
import narrationSrc from "@/assets/media/narration-demo.mp3";
import videogameSrc from "@/assets/media/videogame-demo.mp3";

export interface DemoTrack {
  id: string;
  kicker: string;
  title: string;
  description: string;
  src: string;
  fallbackDuration: string;
}

export const demoTracks: DemoTrack[] = [
  {
    id: "videogame",
    kicker: "Video games",
    title: "Video game demo",
    description: "Character voice work for video games.",
    src: videogameSrc,
    fallbackDuration: "1:57",
  },
  {
    id: "commercial",
    kicker: "Commercial",
    title: "Commercial demo",
    description: "Retail and brand spots.",
    src: commercialSrc,
    fallbackDuration: "0:59",
  },
  {
    id: "narration",
    kicker: "Narration",
    title: "Narration demo",
    description: "Explainers, corporate reads, and long-form narration.",
    src: narrationSrc,
    fallbackDuration: "1:21",
  },
];
