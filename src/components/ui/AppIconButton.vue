<template>
  <AppButton
    v-tooltip="tooltipBinding"
    :aria-controls="ariaControls"
    :aria-haspopup="ariaHaspopup"
    :aria-label="label"
    :button-type="buttonType"
    :disabled="disabled"
    :icon="icon"
    :icon-size="iconSize"
    :root-class="iconButtonClass"
    :test-id="testId"
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
    ariaControls?: string;
    ariaHaspopup?: boolean | "menu" | "dialog" | "grid" | "listbox" | "tree";
    buttonType?: "button" | "reset" | "submit";
    disabled?: boolean;
    icon: AppIconName | LucideIcon;
    label: string;
    rootClass?: string;
    rounded?: boolean;
    showTooltip?: boolean;
    size?: IconButtonSize;
    testId?: string;
    tone?: IconButtonTone;
    tooltipDelay?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    ariaControls: undefined,
    ariaHaspopup: undefined,
    buttonType: "button",
    disabled: false,
    rootClass: undefined,
    rounded: true,
    showTooltip: true,
    size: "md",
    testId: undefined,
    tone: "default",
    tooltipDelay: 250,
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

  const iconButtonClass = computed(() => cn("justify-center", sizeClass.value, toneClass.value, props.rounded ? "rounded-pill" : "rounded-md", props.rootClass));

  const tooltipBinding = computed(() => buildAppTooltipBinding({ delay: props.tooltipDelay, disabled: !props.showTooltip || props.disabled, text: props.label }));
</script>
