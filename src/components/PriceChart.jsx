import { useMemo } from 'react';
import './PriceChart.css';

export default function PriceChart({ tokenName }) {
  /* Generate a random-looking price chart SVG */
  const { pathD, areaD, points } = useMemo(() => {
    const pts = [];
    let price = 50 + Math.random() * 30;
    const numPoints = 60;
    for (let i = 0; i < numPoints; i++) {
      price += (Math.random() - 0.45) * 8;
      price = Math.max(10, Math.min(190, price));
      pts.push({ x: (i / (numPoints - 1)) * 580 + 10, y: 200 - price });
    }
    const d = `M ${pts.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const area = `${d} L ${pts[pts.length - 1].x},200 L ${pts[0].x},200 Z`;
    return { pathD: d, areaD: area, points: pts };
  }, [tokenName]);

  const isUp = points[points.length - 1].y < points[0].y;
  const color = isUp ? 'var(--green)' : 'var(--red)';

  return (
    <div className="price-chart" aria-label={`Price chart for ${tokenName}`}>
      <div className="chart-header">
        <span className="chart-label">Price Chart (24h)</span>
        <div className="chart-timeframes">
          <button className="tf-btn" aria-pressed="false">1H</button>
          <button className="tf-btn" aria-pressed="false">4H</button>
          <button className="tf-btn active" aria-pressed="true">24H</button>
          <button className="tf-btn" aria-pressed="false">7D</button>
        </div>
      </div>
      <svg viewBox="0 0 600 210" preserveAspectRatio="none" className="chart-svg">
        {/* Grid */}
        {[0.25, 0.5, 0.75].map(pct => (
          <line
            key={pct}
            x1="0" y1={200 * pct}
            x2="600" y2={200 * pct}
            stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4,4"
          />
        ))}
        {/* Area fill */}
        <path d={areaD} fill={isUp ? 'rgba(0, 255, 136, 0.06)' : 'rgba(255, 51, 102, 0.06)'} />
        {/* Line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth="2" />
        {/* Current price dot */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="4"
          fill={color}
          className="price-dot"
        />
      </svg>
    </div>
  );
}
