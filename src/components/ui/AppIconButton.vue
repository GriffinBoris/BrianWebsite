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

  type IconButtonTone = "default" | "ghost" | "accent";
  type IconButtonSize = "sm" | "md" | "lg";

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
    tone: "default",
  });

  const emit = defineEmits<{ click: [event: MouseEvent] }>();

  const sizeClass = computed(() => {
    if (props.size === "lg") {
      return "h-[3.4rem] w-[3.4rem] min-h-0 p-0";
    }
    if (props.size === "sm") {
      return "h-9 w-9 min-h-0 p-0";
    }
    return "h-10 w-10 min-h-0 p-0";
  });

  const iconSize = computed(() => (props.size === "lg" ? "h-[22px] w-[22px]" : "h-[18px] w-[18px]"));

  const toneClass = computed(() => {
    if (props.tone === "accent") {
      return "border-transparent bg-accent text-accent-contrast hover:bg-accent-strong hover:translate-y-0";
    }
    if (props.tone === "ghost") {
      return "border-transparent bg-transparent text-secondary hover:border-line hover:text-body hover:translate-y-0";
    }
    return "border border-line bg-surface text-body hover:border-accent hover:text-accent hover:translate-y-0";
  });

  const iconButtonClass = computed(() => cn("justify-center rounded-pill", sizeClass.value, toneClass.value, props.rootClass));

  const tooltipBinding = computed(() => buildAppTooltipBinding({ disabled: !props.showTooltip, text: props.label }));
</script>
