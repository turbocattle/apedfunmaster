import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TokenCard from '../components/TokenCard';
import TokenTable from '../components/TokenTable';
import AirdropBanner from '../components/AirdropBanner';
import { mockTokens, airdropHistory, formatMarketCap, formatVolume } from '../data/mockData';
import './Home.css';

const FILTERS = ['All', 'Trending', 'Newest', 'Market Cap', 'Volume', 'Graduated'];

export default function Home() {
  const [searchParams] = useSearchParams();
  const pageTab = searchParams.get('tab') || 'tokens';
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('marketCap');
  const [sortDir, setSortDir] = useState('desc');

  const filteredTokens = useMemo(() => {
    let tokens = [...mockTokens];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.ticker.toLowerCase().includes(q)
      );
    }

    switch (activeFilter) {
      case 'Trending':
        tokens.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'Newest':
        tokens.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Market Cap':
        tokens.sort((a, b) => b.marketCap - a.marketCap);
        break;
      case 'Volume':
        tokens.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'Graduated':
        tokens = tokens.filter(t => t.bondingCurveProgress >= 95);
        break;
      default:
        break;
    }

    if (viewMode === 'table') {
      tokens.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (sortField === 'name') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
        if (sortField === 'createdAt') { aVal = new Date(aVal).getTime(); bVal = new Date(bVal).getTime(); }
        if (sortDir === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
    }

    return tokens;
  }, [searchQuery, activeFilter, viewMode, sortField, sortDir]);

  const leaderboardTokens = useMemo(() =>
    [...mockTokens].sort((a, b) => b.communityFeesDistributed - a.communityFeesDistributed),
    []
  );

  const totalFees    = mockTokens.reduce((sum, t) => sum + t.communityFeesDistributed, 0);
  const totalHolders = mockTokens.reduce((sum, t) => sum + t.holders, 0);
  const totalVolume  = mockTokens.reduce((sum, t) => sum + t.volume24h, 0);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  }

  return (
    <div className="home-page container">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-bg-glow"  aria-hidden="true" />

        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          Solana's First Hourly Airdrop Launchpad
        </div>

        <img src="/aped-monkey.png" alt="aped." className="hero-wordmark" />

        <h1 className="hero-title">Hold. Trade.<br />Earn Every Hour.</h1>

        <p className="hero-subtitle">
          The only launchpad that gives back — <strong>3.5% of all trading fees</strong>{' '}
          airdropped directly to token holders, every single hour. No claims. Just rewards.
        </p>

        <div className="hero-ctas">
          <Link to="/create" className="hero-btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            </svg>
            Launch a Token
          </Link>
          <Link to="/?tab=leaderboard" className="hero-btn-secondary">
            View Leaderboard
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="hero-stat-num">{mockTokens.length}</span>
            <span className="hero-stat-lbl">Tokens Launched</span>
          </div>
          <span className="hero-stat-sep" />
          <div className="hero-stat-item">
            <span className="hero-stat-num">0</span>
            <span className="hero-stat-lbl">SOL Airdropped</span>
          </div>
          <span className="hero-stat-sep" />
          <div className="hero-stat-item">
            <span className="hero-stat-num">0</span>
            <span className="hero-stat-lbl">Total Drops</span>
          </div>
          <span className="hero-stat-sep" />
          <div className="hero-stat-item">
            <span className="hero-stat-num hero-stat-green">3.5%</span>
            <span className="hero-stat-lbl">Fee Rate / hr</span>
          </div>
        </div>
      </section>

      <AirdropBanner totalFees={totalFees} totalHolders={totalHolders} />

      {/* ── Tokens tab ── */}
      {pageTab === 'tokens' && (
        <>
          {/* How It Works */}
          <section className="how-it-works">
            <div className="hiw-step">
              <div className="hiw-icon-wrap">
                <div className="hiw-num">01</div>
              </div>
              <div className="hiw-body">
                <h3 className="hiw-title">Launch Your Token</h3>
                <p className="hiw-desc">Deploy a memecoin in seconds. No code, no presale, no VC allocation. Fair launch, every time.</p>
              </div>
            </div>

            <div className="hiw-arrow">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="hiw-step">
              <div className="hiw-icon-wrap">
                <div className="hiw-num">02</div>
              </div>
              <div className="hiw-body">
                <h3 className="hiw-title">Community Trades</h3>
                <p className="hiw-desc">Every swap generates fees that flow directly into the hourly airdrop pool — the more volume, the bigger the drop.</p>
              </div>
            </div>

            <div className="hiw-arrow">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="hiw-step hiw-step-earn">
              <div className="hiw-icon-wrap hiw-icon-earn">
                <div className="hiw-num hiw-num-earn">03</div>
              </div>
              <div className="hiw-body">
                <h3 className="hiw-title hiw-title-earn">Earn Every Hour</h3>
                <p className="hiw-desc">3.5% of all fees airdropped automatically to every holder — no claims, no staking, no waiting.</p>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="controls-bar">
            <div className="search-wrapper">
              <svg className="search-icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or ticker…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search tokens"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/></svg>
                </button>
              )}
            </div>

            <div className="controls-right">
              <div className="filter-tabs" role="tablist" aria-label="Filter tokens">
                {FILTERS.map(f => (
                  <button
                    key={f}
                    className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                    role="tab"
                    aria-selected={activeFilter === f}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="view-toggle" role="group" aria-label="View mode">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="1" width="6" height="6" rx="1.5" />
                    <rect x="9" y="1" width="6" height="6" rx="1.5" />
                    <rect x="1" y="9" width="6" height="6" rx="1.5" />
                    <rect x="9" y="9" width="6" height="6" rx="1.5" />
                  </svg>
                </button>
                <button
                  className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                  aria-pressed={viewMode === 'table'}
                  aria-label="Table view"
                  title="Table view"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="1" y="2" width="14" height="2.5" rx="0.75" />
                    <rect x="1" y="6.75" width="14" height="2.5" rx="0.75" />
                    <rect x="1" y="11.5" width="14" height="2.5" rx="0.75" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <div className="token-count">
            <span className="count-label">Showing {filteredTokens.length} tokens</span>
          </div>

          {viewMode === 'grid' ? (
            <section className="token-grid" aria-label="Token grid">
              {filteredTokens.map(token => (
                <TokenCard key={token.id} token={token} />
              ))}
            </section>
          ) : (
            <TokenTable
              tokens={filteredTokens}
              sortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
          )}

          {filteredTokens.length === 0 && (
            <div className="no-results">
              <p>No tokens found</p>
              <p className="no-results-hint">Try a different search or filter</p>
            </div>
          )}
        </>
      )}

      {/* ── Leaderboard tab ── */}
      {pageTab === 'leaderboard' && (
        <section className="leaderboard-page">
          <div className="lb-page-header">
            <div>
              <h2 className="lb-page-title">Community Fee Leaderboard</h2>
              <p className="lb-page-subtitle">Tokens ranked by fees returned to the community</p>
            </div>
            <div className="lb-live-badge">
              <span className="lb-live-dot" />
              Live
            </div>
          </div>

          <div className="lb-stats-row">
            <div className="lb-stat-card lb-stat-fees">
              <span className="lb-stat-label">Total Fees Distributed</span>
              <span className="lb-stat-value">{totalFees.toFixed(2)} <span className="lb-stat-unit">SOL</span></span>
            </div>
            <div className="lb-stat-card lb-stat-pool">
              <span className="lb-stat-label">Next Airdrop Pool</span>
              <span className="lb-stat-value lb-stat-green">{(totalFees * 0.035).toFixed(4)} <span className="lb-stat-unit">SOL</span></span>
              <span className="lb-stat-sublabel">3.5% of total fees</span>
            </div>
            <div className="lb-stat-card lb-stat-holders">
              <span className="lb-stat-label">Total Holders</span>
              <span className="lb-stat-value">{totalHolders.toLocaleString()}</span>
            </div>
            <div className="lb-stat-card lb-stat-volume">
              <span className="lb-stat-label">24h Volume</span>
              <span className="lb-stat-value">${formatVolume(totalVolume)}</span>
            </div>
          </div>

          {leaderboardTokens.length >= 3 && (
            <div className="lb-podium">
              {/* 2nd */}
              <Link to={`/token/${leaderboardTokens[1].id}`} className="podium-card rank-2">
                <span className="podium-rank-label">2nd</span>
                <img src={leaderboardTokens[1].image} alt={leaderboardTokens[1].name} className="podium-img" />
                <div className="podium-name">{leaderboardTokens[1].name}</div>
                <div className="podium-ticker">${leaderboardTokens[1].ticker}</div>
                <div className="podium-fees">{leaderboardTokens[1].communityFeesDistributed.toFixed(2)}</div>
                <div className="podium-fees-label">SOL distributed</div>
                <div className="podium-secondary">
                  <span><strong>{formatMarketCap(leaderboardTokens[1].marketCap)}</strong> mcap</span>
                  <span><strong>{leaderboardTokens[1].holders.toLocaleString()}</strong> holders</span>
                </div>
              </Link>

              {/* 1st */}
              <Link to={`/token/${leaderboardTokens[0].id}`} className="podium-card rank-1">
                <div className="podium-crown">👑</div>
                <img src={leaderboardTokens[0].image} alt={leaderboardTokens[0].name} className="podium-img" />
                <div className="podium-name">{leaderboardTokens[0].name}</div>
                <div className="podium-ticker">${leaderboardTokens[0].ticker}</div>
                <div className="podium-fees">{leaderboardTokens[0].communityFeesDistributed.toFixed(2)}</div>
                <div className="podium-fees-label">SOL distributed</div>
                <div className="podium-secondary">
                  <span><strong>{formatMarketCap(leaderboardTokens[0].marketCap)}</strong> mcap</span>
                  <span><strong>{leaderboardTokens[0].holders.toLocaleString()}</strong> holders</span>
                </div>
              </Link>

              {/* 3rd */}
              <Link to={`/token/${leaderboardTokens[2].id}`} className="podium-card rank-3">
                <span className="podium-rank-label">3rd</span>
                <img src={leaderboardTokens[2].image} alt={leaderboardTokens[2].name} className="podium-img" />
                <div className="podium-name">{leaderboardTokens[2].name}</div>
                <div className="podium-ticker">${leaderboardTokens[2].ticker}</div>
                <div className="podium-fees">{leaderboardTokens[2].communityFeesDistributed.toFixed(2)}</div>
                <div className="podium-fees-label">SOL distributed</div>
                <div className="podium-secondary">
                  <span><strong>{formatMarketCap(leaderboardTokens[2].marketCap)}</strong> mcap</span>
                  <span><strong>{leaderboardTokens[2].holders.toLocaleString()}</strong> holders</span>
                </div>
              </Link>
            </div>
          )}

          <div className="lb-table-wrap">
            <table className="lb-full-table">
              <thead>
                <tr>
                  <th className="col-rank">#</th>
                  <th className="col-token">Token</th>
                  <th className="col-fees">Fees Distributed</th>
                  <th className="col-mcap">Market Cap</th>
                  <th className="col-vol">24h Volume</th>
                  <th className="col-holders">Holders</th>
                  <th className="col-progress">Bonding</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardTokens.slice(3).map((token, i) => (
                  <tr key={token.id}>
                    <td className="col-rank"><span className="rank-badge">{i + 4}</span></td>
                    <td className="col-token">
                      <Link to={`/token/${token.id}`} className="lb-token-link">
                        <img src={token.image} alt={token.name} className="lb-token-img" />
                        <div className="lb-token-meta">
                          <span className="lb-name">{token.name}</span>
                          <span className="lb-ticker">${token.ticker}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="col-fees">
                      <span className="lb-fees-val">{token.communityFeesDistributed.toFixed(2)}</span>
                      <span className="lb-fees-unit"> SOL</span>
                    </td>
                    <td className="col-mcap">{formatMarketCap(token.marketCap)}</td>
                    <td className="col-vol">${formatVolume(token.volume24h)}</td>
                    <td className="col-holders">{token.holders.toLocaleString()}</td>
                    <td className="col-progress">
                      <div className="lb-bonding">
                        <div className="lb-bonding-bar">
                          <div className="lb-bonding-fill" style={{ width: `${token.bondingCurveProgress}%` }} />
                        </div>
                        <span className="lb-bonding-pct">{token.bondingCurveProgress.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── History tab ── */}
      {pageTab === 'history' && (
        <section className="history-page">
          <div className="history-header">
            <div>
              <h2 className="history-title">Airdrop History</h2>
              <p className="history-subtitle">Every hourly drop — on-chain, transparent, automatic</p>
            </div>
            <div className="lb-live-badge">
              <span className="lb-live-dot" />
              Every Hour
            </div>
          </div>

          <div className="history-stats-row">
            <div className="history-stat-card">
              <span className="history-stat-label">Total Drops</span>
              <span className="history-stat-value">{airdropHistory.length}</span>
            </div>
            <div className="history-stat-card">
              <span className="history-stat-label">Total Distributed</span>
              <span className="history-stat-value">0.0000 <span className="history-stat-unit">SOL</span></span>
            </div>
            <div className="history-stat-card">
              <span className="history-stat-label">Avg Pool Size</span>
              <span className="history-stat-value">0.0000 <span className="history-stat-unit">SOL</span></span>
            </div>
            <div className="history-stat-card">
              <span className="history-stat-label">Rate</span>
              <span className="history-stat-value history-stat-green">3.5% <span className="history-stat-unit">/ hr</span></span>
            </div>
          </div>

          {airdropHistory.length === 0 ? (
            <div className="history-empty">
              <div className="history-empty-visual">
                <div className="history-empty-glow" />
                <img src="/aped-monkey.png" alt="" className="history-empty-img" />
              </div>
              <h3 className="history-empty-title">No airdrops yet</h3>
              <p className="history-empty-desc">
                The first airdrop fires at the top of the next hour.<br />
                Every drop is recorded here — on-chain and permanent.
              </p>
              <div className="history-empty-mechanic">
                <div className="history-mechanic-item">
                  <span className="history-mechanic-value">3.5%</span>
                  <span className="history-mechanic-label">of all fees</span>
                </div>
                <div className="history-mechanic-sep" />
                <div className="history-mechanic-item">
                  <span className="history-mechanic-value">Hourly</span>
                  <span className="history-mechanic-label">automatic drops</span>
                </div>
                <div className="history-mechanic-sep" />
                <div className="history-mechanic-item">
                  <span className="history-mechanic-value">Airdropped</span>
                  <span className="history-mechanic-label">straight to wallet</span>
                </div>
                <div className="history-mechanic-sep" />
                <div className="history-mechanic-item">
                  <span className="history-mechanic-value">Zero</span>
                  <span className="history-mechanic-label">claims needed</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="history-table-wrap">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Drop #</th>
                    <th>Date &amp; Time</th>
                    <th>Pool Size</th>
                    <th>Recipients</th>
                    <th>Avg per Holder</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {airdropHistory.map((drop, i) => (
                    <tr key={drop.id}>
                      <td className="history-drop-num">#{airdropHistory.length - i}</td>
                      <td className="history-time">{drop.timestamp}</td>
                      <td className="history-pool">{drop.poolSize} SOL</td>
                      <td>{drop.recipients.toLocaleString()}</td>
                      <td>{drop.avgPerHolder} SOL</td>
                      <td><span className="history-badge-complete">Completed</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
