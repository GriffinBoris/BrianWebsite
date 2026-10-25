import commercialSrc from "@/assets/media/commercial-demo.mp3";
import narrationSrc from "@/assets/media/narration-demo.mp3";
import videogameSrc from "@/assets/media/videogame-demo.mp3";

export interface DemoTrack {
  id: string;
  title: string;
  src: string;
  fallbackDuration: string;
}

export const demoTracks: DemoTrack[] = [
  {
    id: "videogame",
    title: "Video game demo",
    src: videogameSrc,
    fallbackDuration: "1:57",
  },
  {
    id: "commercial",
    title: "Commercial demo",
    src: commercialSrc,
    fallbackDuration: "0:59",
  },
  {
    id: "narration",
    title: "Narration demo",
    src: narrationSrc,
    fallbackDuration: "1:21",
  },
];
