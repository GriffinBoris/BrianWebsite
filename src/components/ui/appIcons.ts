import { ArrowUpRight, Download, type LucideIcon, Menu, Moon, Pause, Play, Sun, X } from "@lucide/vue";

// The icon boundary: shared wrappers reference these names instead of pasting
// inline SVG. Add a Lucide icon here before using it in a wrapper.
export const appIcons = {
  close: X,
  download: Download,
  externalLink: ArrowUpRight,
  menu: Menu,
  moon: Moon,
  pause: Pause,
  play: Play,
  sun: Sun,
} satisfies Record<string, LucideIcon>;

export type AppIconName = keyof typeof appIcons;
