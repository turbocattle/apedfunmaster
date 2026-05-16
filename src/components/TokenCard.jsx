import { Link } from 'react-router-dom';
import { formatMarketCap, formatVolume, formatAge } from '../data/mockData';
import './TokenCard.css';

function shorten(addr) {
  if (!addr || addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function TokenCard({ token }) {
  return (
    <Link to={`/token/${token.id}`} className="token-card" aria-label={`View ${token.name}`}>
      <div className="token-card-header">
        <div className="token-img-wrap">
          <img src={token.image} alt={token.name} className="token-card-img" />
        </div>
        <div className="token-card-info">
          <h3 className="token-card-name">{token.name}</h3>
          <div className="token-card-meta">
            <span className="token-card-ticker">${token.ticker}</span>
            <span className="token-card-age">{formatAge(token.createdAt)}</span>
          </div>
          {token.creator && (
            <div className="token-creator">
              <span className="creator-by">by</span>
              <span className="creator-addr">{shorten(token.creator)}</span>
            </div>
          )}
        </div>
      </div>

      {token.description && (
        <p className="token-card-desc">{token.description}</p>
      )}

      <div className="token-card-divider" />

      <div className="token-card-stats">
        <div className="token-stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatMarketCap(token.marketCap)}</span>
        </div>
        <div className="token-stat">
          <span className="stat-label">24h Volume</span>
          <span className="stat-value">${formatVolume(token.volume24h)}</span>
        </div>
        <div className="token-stat">
          <span className="stat-label">Holders</span>
          <span className="stat-value">{token.holders.toLocaleString()}</span>
        </div>
      </div>

      <div className="bonding-progress">
        <div className="bonding-progress-header">
          <span className="bonding-label">Bonding Curve</span>
          <span className="bonding-pct">{token.bondingCurveProgress.toFixed(1)}%</span>
        </div>
        <div className="bonding-bar" role="progressbar" aria-valuenow={token.bondingCurveProgress} aria-valuemin={0} aria-valuemax={100}>
          <div className="bonding-fill" style={{ width: `${token.bondingCurveProgress}%` }} />
        </div>
      </div>

      <div className="token-airdrop-row">
        <div className="token-airdrop-badge">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm1-11V7h-2v4H7v2h4v4h2v-4h4v-2h-4z"/>
          </svg>
          Airdrop eligible
        </div>
        <span className="token-airdrop-rate">3.5% fees / hr</span>
      </div>
    </Link>
  );
}
