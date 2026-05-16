import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Navbar.css';

function getNextDrop() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(next.getHours() + 1, 0, 0, 0);
  const diff = next - now;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Navbar() {
  const { publicKey } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState(getNextDrop());
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isHome = location.pathname === '/';
  const activeTab = searchParams.get('tab') || 'tokens';

  useEffect(() => {
    const id = setInterval(() => setCountdown(getNextDrop()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" aria-label="aped.fun home">
            <img src="/aped-monkey.png" alt="" className="navbar-logo-monkey" />
            <img src="/aped-wordmark.png" alt="aped." className="navbar-logo-wordmark" />
          </Link>

          {isHome && (
            <div className="navbar-page-tabs">
              <Link to="/?tab=tokens"      className={`navbar-tab ${activeTab === 'tokens'      ? 'active' : ''}`}>Tokens</Link>
              <Link to="/?tab=leaderboard" className={`navbar-tab ${activeTab === 'leaderboard' ? 'active' : ''}`}>Leaderboard</Link>
              <Link to="/?tab=history"     className={`navbar-tab ${activeTab === 'history'     ? 'active' : ''}`}>Airdrop History</Link>
            </div>
          )}
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <div className="navbar-drop-pill" title="Next hourly airdrop">
            <span className="navbar-drop-dot" />
            <span className="navbar-drop-label">Drop</span>
            <span className="navbar-drop-time">{countdown}</span>
          </div>

          <div className="navbar-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/create" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>Create</NavLink>
            {publicKey && (
              <NavLink
                to={`/profile/${publicKey.toBase58()}`}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
            )}
          </div>

          <div className="navbar-wallet">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
