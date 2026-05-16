import { useState, useEffect } from 'react';
import './AirdropBanner.css';

function getTimeUntilNextDrop() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(next.getHours() + 1, 0, 0, 0);
  const diff = next - now;
  return {
    mins: Math.floor(diff / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

export default function AirdropBanner({ totalFees = 0, totalHolders = 0 }) {
  const [time, setTime] = useState(getTimeUntilNextDrop());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeUntilNextDrop()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = n => String(n).padStart(2, '0');
  const nextPool = (totalFees * 0.035).toFixed(4);

  return (
    <div className="airdrop-banner">
      <div className="airdrop-left">
        <div className="airdrop-live-badge">
          <span className="airdrop-dot" />
          Live Airdrop
        </div>
        <p className="airdrop-desc">
          Every hour, <strong>3.5% of all trading fees</strong> are automatically
          airdropped to token holders across the platform — no claims, no waiting.
        </p>
      </div>

      <div className="airdrop-center">
        <span className="airdrop-countdown-label">Next drop in</span>
        <div className="airdrop-timer">
          <div className="airdrop-time-block">
            <span className="airdrop-time-num">{pad(time.mins)}</span>
            <span className="airdrop-time-unit">min</span>
          </div>
          <span className="airdrop-time-sep">:</span>
          <div className="airdrop-time-block">
            <span className="airdrop-time-num">{pad(time.secs)}</span>
            <span className="airdrop-time-unit">sec</span>
          </div>
        </div>
      </div>

      <div className="airdrop-right">
        <div className="airdrop-stat">
          <span className="airdrop-stat-label">Next Pool</span>
          <span className="airdrop-stat-value">{nextPool} <span className="airdrop-stat-unit">SOL</span></span>
        </div>
        <div className="airdrop-stat-sep" />
        <div className="airdrop-stat">
          <span className="airdrop-stat-label">Rate</span>
          <span className="airdrop-stat-value">3.5% <span className="airdrop-stat-unit">/ hr</span></span>
        </div>
        <div className="airdrop-stat-sep" />
        <div className="airdrop-stat">
          <span className="airdrop-stat-label">Eligible Holders</span>
          <span className="airdrop-stat-value">{totalHolders.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
