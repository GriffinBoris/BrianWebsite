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
  import Button from "primevue/button";
  import { computed } from "vue";
  import { RouterLink, type RouteLocationRaw } from "vue-router";

  type AppButtonTone = "accent" | "solid" | "outline" | "link";
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
      return "gap-2 min-h-11 text-sm";
    }
    if (props.size === "lg") {
      return "gap-3 min-h-14 px-7 text-base";
    }
    return "gap-2 min-h-11 px-5 text-sm";
  });

  const toneClasses = computed(() => {
    if (props.tone === "accent") {
      return "rounded-pill bg-accent text-accent-contrast hover:bg-accent-strong motion-safe:active:scale-[0.98]";
    }
    if (props.tone === "solid") {
      return "rounded-pill bg-body text-background hover:bg-accent hover:text-accent-contrast motion-safe:active:scale-[0.98]";
    }
    if (props.tone === "link") {
      return "rounded-sm text-secondary hover:text-accent";
    }
    return "rounded-pill border border-body/25 text-body hover:border-body hover:bg-body hover:text-background";
  });

  const rootClasses = computed(() =>
    cn(
      "inline-flex items-center justify-center font-medium transition-[background-color,color,border-color,transform] duration-[180ms] ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      sizeClasses.value,
      toneClasses.value,
      props.rootClass,
    ),
  );

  const rootComponent = computed(() => (props.to ? RouterLink : props.href ? "a" : Button));

  const rootBindings = computed(() => {
    if (props.to) {
      return { to: props.to, class: rootClasses.value, "aria-label": props.ariaLabel };
    }
    if (props.href) {
      const rel = props.target === "_blank" ? "noopener noreferrer" : undefined;
      return { href: props.href, download: props.download, target: props.target, rel, class: rootClasses.value, "aria-label": props.ariaLabel };
    }
    return { unstyled: true, pt: { root: rootClasses.value }, "aria-label": props.ariaLabel };
  });
</script>
