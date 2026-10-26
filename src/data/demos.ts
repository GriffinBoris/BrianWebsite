import waveforms from "./demo-waveforms.json";

import commercialSrc from "@/assets/media/commercial-demo.mp3";
import narrationSrc from "@/assets/media/narration-demo.mp3";
import videogameSrc from "@/assets/media/videogame-demo.mp3";

export interface DemoTrack {
  id: string;
  title: string;
  src: string;
  downloadName: string;
  fallbackDuration: string;
  waveform: number[];
}

export const demoTracks: DemoTrack[] = [
  {
    id: "videogame",
    waveform: waveforms.videogame.levels,
    title: "Video game demo",
    src: videogameSrc,
    downloadName: "brian-bakaj-videogame-demo.mp3",
    fallbackDuration: "1:57",
  },
  {
    id: "commercial",
    waveform: waveforms.commercial.levels,
    title: "Commercial demo",
    src: commercialSrc,
    downloadName: "brian-bakaj-commercial-demo.mp3",
    fallbackDuration: "0:59",
  },
  {
    id: "narration",
    waveform: waveforms.narration.levels,
    title: "Narration demo",
    src: narrationSrc,
    downloadName: "brian-bakaj-narration-demo.mp3",
    fallbackDuration: "1:21",
  },
];
