import type { DirectiveBinding } from "vue";

export interface AppTooltipOptions {
  delay?: number;
  disabled?: boolean;
  text: string;
}

function normalizeTooltipBinding(value: AppTooltipOptions | string) {
  const text = typeof value === "string" ? value : value.text;
  const disabled = typeof value === "string" ? false : (value.disabled ?? false);
  const delay = typeof value === "string" ? 150 : (value.delay ?? 150);

  return {
    disabled,
    pt: {
      arrow: "hidden",
      text: "rounded-md bg-body px-2.5 py-1.5 text-xs font-medium text-primary-contrast shadow-lg",
    },
    showDelay: delay,
    value: text,
  };
}

export function buildAppTooltipBinding(value: AppTooltipOptions | string): DirectiveBinding["value"] {
  return normalizeTooltipBinding(value);
}
