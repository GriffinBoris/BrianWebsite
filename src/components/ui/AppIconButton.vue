<template>
  <AppButton
    v-tooltip="tooltipBinding"
    :aria-label="label"
    :icon="icon"
    :icon-size="iconSize"
    :root-class="iconButtonClass"
    @click="emit('click', $event)"
  />
</template>

<script setup lang="ts">
  import AppButton from "@/components/ui/AppButton.vue";
  import type { AppIconName } from "@/components/ui/appIcons";
  import { buildAppTooltipBinding } from "@/components/ui/AppTooltip";
  import { cn } from "@/utils/className";
  import type { LucideIcon } from "@lucide/vue";
  import { computed } from "vue";

  type IconButtonTone = "outline" | "ghost" | "accent";
  type IconButtonSize = "md" | "lg" | "xl";

  interface Props {
    icon: AppIconName | LucideIcon;
    label: string;
    rootClass?: string;
    showTooltip?: boolean;
    size?: IconButtonSize;
    tone?: IconButtonTone;
  }

  const props = withDefaults(defineProps<Props>(), {
    rootClass: undefined,
    showTooltip: true,
    size: "md",
    tone: "outline",
  });

  const emit = defineEmits<{ click: [event: MouseEvent] }>();

  const sizeClass = computed(() => {
    if (props.size === "xl") {
      return "h-14 w-14";
    }
    if (props.size === "lg") {
      return "h-12 w-12";
    }
    return "h-11 w-11";
  });

  // Play and pause glyphs read better filled; the play triangle also needs a nudge to look centred.
  const iconSize = computed(() =>
    cn(
      props.size === "xl" ? "h-6 w-6" : props.size === "lg" ? "h-5 w-5" : "h-[18px] w-[18px]",
      (props.icon === "play" || props.icon === "pause") && "fill-current",
      props.icon === "play" && "translate-x-px",
    ),
  );

  const toneClass = computed(() => {
    if (props.tone === "accent") {
      return "border-0 bg-accent text-accent-contrast hover:bg-accent-strong";
    }
    if (props.tone === "ghost") {
      return "border-0 bg-transparent text-secondary hover:bg-surface-muted hover:text-body";
    }
    return "border-body/25 hover:border-accent hover:text-accent";
  });

  const iconButtonClass = computed(() => cn("min-h-0 shrink-0 rounded-pill p-0", sizeClass.value, toneClass.value, props.rootClass));

  const tooltipBinding = computed(() => buildAppTooltipBinding({ disabled: !props.showTooltip, text: props.label }));
</script>
