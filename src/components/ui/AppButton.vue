<template>
  <component :is="rootComponent" v-bind="rootBindings">
    <slot>
      <AppIcon v-if="icon" :icon="icon" :class="iconSize" />
      <span v-if="label">{{ label }}</span>
    </slot>
  </component>
</template>

<script setup lang="ts">
  import AppIcon from "@/components/ui/AppIcon.vue";
  import type { AppIconName } from "@/components/ui/appIcons";
  import { cn } from "@/utils/className";
  import type { LucideIcon } from "@lucide/vue";
  import { computed } from "vue";
  import { RouterLink, type RouteLocationRaw } from "vue-router";

  type AppButtonTone = "accent" | "outline" | "link";
  type AppButtonSize = "md" | "lg";

  interface Props {
    ariaLabel?: string;
    download?: string;
    href?: string;
    icon?: AppIconName | LucideIcon;
    iconSize?: string;
    label?: string;
    rootClass?: string;
    size?: AppButtonSize;
    target?: "_blank" | "_parent" | "_self" | "_top";
    to?: RouteLocationRaw;
    tone?: AppButtonTone;
  }

  const props = withDefaults(defineProps<Props>(), {
    ariaLabel: undefined,
    download: undefined,
    href: undefined,
    icon: undefined,
    iconSize: "h-4 w-4",
    label: undefined,
    rootClass: undefined,
    size: "md",
    target: undefined,
    to: undefined,
    tone: "outline",
  });

  const sizeClasses = computed(() => {
    if (props.tone === "link") {
      return "gap-1.5 min-h-11 text-sm";
    }
    if (props.size === "lg") {
      return "gap-2.5 min-h-12 px-5 text-[0.9375rem]";
    }
    return "gap-2 min-h-10 px-4 text-sm";
  });

  const toneClasses = computed(() => {
    if (props.tone === "accent") {
      return "rounded-md bg-accent text-accent-contrast hover:bg-accent-strong";
    }
    if (props.tone === "link") {
      return "rounded-sm text-accent hover:text-accent-strong hover:underline underline-offset-4";
    }
    return "rounded-md border border-line bg-surface text-body hover:border-body/40";
  });

  const rootClasses = computed(() =>
    cn(
      "inline-flex items-center justify-center font-medium transition-[background-color,color,border-color] duration-[150ms] ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      sizeClasses.value,
      toneClasses.value,
      props.rootClass,
    ),
  );

  const rootComponent = computed(() => (props.to ? RouterLink : props.href ? "a" : "button"));

  const rootBindings = computed(() => {
    if (props.to) {
      return { to: props.to, class: rootClasses.value, "aria-label": props.ariaLabel };
    }
    if (props.href) {
      const rel = props.target === "_blank" ? "noopener noreferrer" : undefined;
      return { href: props.href, download: props.download, target: props.target, rel, class: rootClasses.value, "aria-label": props.ariaLabel };
    }
    return { type: "button", class: rootClasses.value, "aria-label": props.ariaLabel };
  });
</script>
