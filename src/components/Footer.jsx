import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/aped-monkey.png" alt="" className="footer-logo-monkey" />
            <img src="/aped-wordmark.png" alt="aped." className="footer-logo-text" />
          </Link>
          <p className="footer-tagline">
            The only memecoin launchpad that pays you back.<br />
            Hold tokens, earn fees — automatically, every hour.
          </p>
          <div className="footer-airdrop-pill">
            <span className="footer-pill-dot" />
            3.5% of all fees airdropped hourly
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <p className="footer-col-heading">Platform</p>
            <Link to="/?tab=tokens"      className="footer-link">Tokens</Link>
            <Link to="/create"           className="footer-link">Launch Token</Link>
            <Link to="/?tab=leaderboard" className="footer-link">Leaderboard</Link>
            <Link to="/?tab=history"     className="footer-link">Airdrop History</Link>
          </div>
          <div className="footer-col">
            <p className="footer-col-heading">Community</p>
            <a href="#" className="footer-link">Twitter / X</a>
            <a href="#" className="footer-link">Telegram</a>
            <a href="#" className="footer-link">Discord</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-heading">Learn</p>
            <a href="#" className="footer-link">How It Works</a>
            <a href="#" className="footer-link">Tokenomics</a>
            <a href="#" className="footer-link">Security Audit</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-row">
          <span className="footer-copy">© 2025 aped.fun — All rights reserved</span>
          <div className="footer-sol-badge">
            <svg width="13" height="11" viewBox="0 0 397.7 311.7" fill="currentColor">
              <path d="M64.6 237.9a10.7 10.7 0 0 1 7.5-3.1h317.5a5.3 5.3 0 0 1 3.8 9.1l-62.9 62.9a10.7 10.7 0 0 1-7.5 3.1H5.5a5.3 5.3 0 0 1-3.8-9.1l62.9-62.9zm0-172.8a10.7 10.7 0 0 1 7.5-3.1h317.5a5.3 5.3 0 0 1 3.8 9.1l-62.9 62.9a10.7 10.7 0 0 1-7.5 3.1H5.5a5.3 5.3 0 0 1-3.8-9.1l62.9-62.9zm325 86.4a5.3 5.3 0 0 1-3.8 9.1H68.2a10.7 10.7 0 0 1-7.5-3.1L.8 95.6a5.3 5.3 0 0 1 3.8-9.1H322a10.7 10.7 0 0 1 7.5 3.1l62.1 62z"/>
            </svg>
            Built on Solana
          </div>
        </div>
      </div>
    </footer>
  );
}
