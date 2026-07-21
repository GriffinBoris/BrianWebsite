<template>
  <component :is="rootComponent" v-bind="rootBindings">
    <slot>
      <AppIcon v-if="icon" :icon="icon" :class="iconSize" />
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

  interface Props {
    ariaLabel?: string;
    download?: string;
    href?: string;
    icon?: AppIconName | LucideIcon;
    iconSize?: string;
    label?: string;
    rootClass?: string;
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
    target: undefined,
    to: undefined,
    tone: "secondary",
  });

  const sizeClasses = computed(() => (props.tone === "link" ? "gap-1.5 text-[0.95rem]" : "gap-2 px-6 min-h-[2.9rem] text-[0.95rem]"));

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
      "inline-flex items-center justify-center rounded-md font-medium transition duration-[240ms] ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring/40",
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
    return { unstyled: true, pt: { root: rootClasses.value, label: "font-medium" }, "aria-label": props.ariaLabel };
  });
</script>
