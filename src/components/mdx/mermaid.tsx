import { renderMermaidSVG } from "beautiful-mermaid";

/** The SVG for a chart, or null when it does not parse. */
const renderChart = (chart: string): string | null => {
  try {
    return renderMermaidSVG(chart.trim(), {
      bg: "var(--color-fd-background)",
      fg: "var(--color-fd-foreground)",
      transparent: true,
    });
  } catch {
    return null;
  }
};

/**
 * A diagram, rendered to SVG while the site is being built.
 *
 * Nothing is shipped to the browser: `renderMermaidSVG` is synchronous, so the
 * markup is already in the prerendered page. A chart that fails to parse falls
 * back to showing its own source, which is more use to a reader than a gap.
 */
export const Mermaid = ({ chart }: { chart: string }) => {
  const svg = renderChart(chart);
  if (svg === null) {
    return (
      <pre className="border-fd-border bg-fd-muted my-6 overflow-x-auto rounded-lg border p-4 text-sm">
        <code>{chart.trim()}</code>
      </pre>
    );
  }

  return (
    <div
      className="my-6 overflow-x-auto [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
      // oxlint-disable-next-line react/no-danger -- the SVG is produced here at build time from a literal in the page
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
