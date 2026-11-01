export interface AppTooltipOptions {
  disabled?: boolean;
  text: string;
}

export function buildAppTooltipBinding({ text, disabled = false }: AppTooltipOptions) {
  return {
    disabled,
    pt: {
      arrow: "hidden",
      text: "rounded-sm bg-body px-2.5 py-1.5 text-xs font-medium text-background",
    },
    showDelay: 250,
    value: text,
  };
}
