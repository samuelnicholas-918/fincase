export const chartTheme = {
  gold: "#C9A84C",
  goldDim: "#8A7340",
  up: "#3D9B6E",
  down: "#C45C5C",
  grid: "#243049",
  axis: "#6B7A94",
  tooltipBg: "#141B2D",
  tooltipBorder: "#C9A84C",
  font: "var(--font-space-mono), ui-monospace, monospace",
  demergerLine: "FY24",
} as const;

export const tooltipStyle = {
  backgroundColor: chartTheme.tooltipBg,
  border: `1px solid ${chartTheme.tooltipBorder}`,
  borderRadius: 4,
  fontFamily: chartTheme.font,
  fontSize: 12,
  color: "#E8ECF4",
};

export const axisTick = {
  fill: chartTheme.axis,
  fontSize: 11,
  fontFamily: chartTheme.font,
};
