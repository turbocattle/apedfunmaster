import './BondingCurveChart.css';

export default function BondingCurveChart({ progress }) {
  /* Generate SVG path for bonding curve (x^2 shape) */
  const points = [];
  const steps = 50;
  for (let i = 0; i <= steps; i++) {
    const x = i / steps;
    const y = x * x; // quadratic bonding curve
    points.push(`${10 + x * 180},${190 - y * 170}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  /* Filled area up to current progress */
  const filledSteps = Math.floor(steps * (progress / 100));
  const filledPoints = [];
  for (let i = 0; i <= filledSteps; i++) {
    const x = i / steps;
    const y = x * x;
    filledPoints.push(`${10 + x * 180},${190 - y * 170}`);
  }
  const lastX = filledSteps / steps;
  const filledPath = filledPoints.length > 0
    ? `M 10,190 L ${filledPoints.join(' L ')} L ${10 + lastX * 180},190 Z`
    : '';

  return (
    <div className="bonding-curve-chart">
      <svg viewBox="0 0 200 200" aria-label={`Bonding curve at ${progress.toFixed(1)}% progress`}>
        {/* Grid lines */}
        <line x1="10" y1="190" x2="190" y2="190" stroke="var(--border-color)" strokeWidth="1" />
        <line x1="10" y1="190" x2="10" y2="10" stroke="var(--border-color)" strokeWidth="1" />
        {[0.25, 0.5, 0.75].map(pct => (
          <line
            key={pct}
            x1="10"
            y1={190 - pct * 180}
            x2="190"
            y2={190 - pct * 180}
            stroke="var(--border-color)"
            strokeWidth="0.5"
            strokeDasharray="3,3"
          />
        ))}

        {/* Filled area */}
        {filledPath && (
          <path d={filledPath} fill="rgba(0, 212, 255, 0.1)" />
        )}

        {/* Curve line */}
        <path d={pathD} fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="4,4" />

        {/* Active portion */}
        {filledPoints.length > 1 && (
          <path
            d={`M ${filledPoints.join(' L ')}`}
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="2"
          />
        )}

        {/* Current position dot */}
        {filledPoints.length > 0 && (
          <circle
            cx={10 + lastX * 180}
            cy={190 - lastX * lastX * 170}
            r="4"
            fill="var(--cyan)"
            className="current-dot"
          />
        )}

        {/* Labels */}
        <text x="100" y="198" textAnchor="middle" fill="var(--text-muted)" fontSize="6">Supply</text>
        <text x="6" y="100" textAnchor="middle" fill="var(--text-muted)" fontSize="6" transform="rotate(-90, 6, 100)">Price</text>
      </svg>
    </div>
  );
}
