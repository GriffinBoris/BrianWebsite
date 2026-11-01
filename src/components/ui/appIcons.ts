import { ArrowRight, ArrowUpRight, Download, type LucideIcon, Mail, Moon, Pause, Play, Sun, X } from "@lucide/vue";

// The icon boundary: shared wrappers reference these names instead of pasting
// inline SVG. Add a Lucide icon here before using it in a wrapper.
export const appIcons = {
  arrowRight: ArrowRight,
  close: X,
  download: Download,
  externalLink: ArrowUpRight,
  mail: Mail,
  moon: Moon,
  pause: Pause,
  play: Play,
  sun: Sun,
} satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof appIcons;
