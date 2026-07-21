export interface AppTooltipOptions {
  disabled?: boolean;
  text: string;
}

export function buildAppTooltipBinding({ text, disabled = false }: AppTooltipOptions) {
  return {
    disabled,
    pt: {
      arrow: "hidden",
      text: "rounded-md bg-body px-2.5 py-1.5 text-xs font-medium text-primary-contrast shadow-lg",
    },
    showDelay: 250,
    value: text,
  };
}
