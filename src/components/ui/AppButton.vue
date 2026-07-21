<template>
  <component :is="rootComponent" v-bind="rootBindings">
    <slot>
      <AppIcon v-if="icon" :icon="icon" :class="iconSizeClass" />
      <span v-if="label" class="font-medium">{{ label }}</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
  import AppIcon from "@/components/ui/AppIcon.vue";
  import type { AppIconName } from "@/components/ui/appIcons";
  import { cn } from "@/utils/className";
  import type { LucideIcon } from "@lucide/vue";
  import Button from "primevue/button";
  import { computed } from "vue";
  import { RouterLink, type RouteLocationRaw } from "vue-router";

  type AppButtonTone = "accent" | "secondary" | "ghost" | "link";
  type AppButtonSize = "sm" | "md";

  interface Props {
    ariaControls?: string;
    ariaHaspopup?: boolean | "menu" | "dialog" | "grid" | "listbox" | "tree";
    ariaLabel?: string;
    buttonType?: "button" | "reset" | "submit";
    disabled?: boolean;
    download?: string;
    href?: string;
    icon?: AppIconName | LucideIcon;
    iconSize?: string;
    label?: string;
    rootClass?: string;
    size?: AppButtonSize;
    target?: "_blank" | "_parent" | "_self" | "_top";
    testId?: string;
    to?: RouteLocationRaw;
    tone?: AppButtonTone;
  }

  const props = withDefaults(defineProps<Props>(), {
    ariaControls: undefined,
    ariaHaspopup: undefined,
    ariaLabel: undefined,
    buttonType: "button",
    disabled: false,
    download: undefined,
    href: undefined,
    icon: undefined,
    iconSize: "h-4 w-4",
    label: undefined,
    rootClass: undefined,
    size: "md",
    target: undefined,
    testId: undefined,
    to: undefined,
    tone: "secondary",
  });

  const iconSizeClass = computed(() => props.iconSize);

  const sizeClasses = computed(() => {
    if (props.tone === "link") {
      return "gap-1.5 text-[0.95rem]";
    }
    return props.size === "sm" ? "gap-2 px-4 min-h-[2.4rem] text-[0.9rem]" : "gap-2 px-6 min-h-[2.9rem] text-[0.95rem]";
  });

  const toneClasses = computed(() => {
    if (props.tone === "accent") {
      return "bg-accent text-accent-contrast hover:-translate-y-px hover:bg-accent-strong";
    }
    if (props.tone === "ghost") {
      return "border border-line text-body hover:-translate-y-px hover:border-accent hover:text-accent";
    }
    if (props.tone === "link") {
      return "text-secondary hover:text-accent";
    }
    return "border border-line bg-surface text-body hover:-translate-y-px hover:border-accent";
  });

  const rootClasses = computed(() =>
    cn(
      "inline-flex items-center justify-center rounded-md font-medium transition duration-[240ms] ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring/40 disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
      sizeClasses.value,
      toneClasses.value,
      props.rootClass,
    ),
  );

  const ariaBindings = computed(() => ({
    "aria-label": props.ariaLabel,
    "aria-controls": props.ariaControls,
    "aria-haspopup": props.ariaHaspopup,
  }));

  const rootComponent = computed(() => (props.to ? RouterLink : props.href ? "a" : Button));

  const rootBindings = computed(() => {
    if (props.to) {
      return { to: props.to, class: rootClasses.value, "data-testid": props.testId, ...ariaBindings.value };
    }
    if (props.href) {
      return {
        href: props.disabled ? undefined : props.href,
        download: props.download,
        target: props.target,
        rel: props.target === "_blank" ? "noopener noreferrer" : undefined,
        "aria-disabled": props.disabled || undefined,
        tabindex: props.disabled ? -1 : undefined,
        class: rootClasses.value,
        "data-testid": props.testId,
        ...ariaBindings.value,
      };
    }
    return {
      unstyled: true,
      type: props.buttonType,
      disabled: props.disabled,
      pt: { root: rootClasses.value, label: "font-medium" },
      "data-testid": props.testId,
      ...ariaBindings.value,
    };
  });
</script>
