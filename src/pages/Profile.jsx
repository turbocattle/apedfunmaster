import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenCard from '../components/TokenCard';
import { mockUserProfile, mockTokens, getTokenById, formatAge, formatMarketCap } from '../data/mockData';
import './Profile.css';

const TABS = ['Created Tokens', 'Holdings', 'Activity'];

export default function Profile() {
  const { address } = useParams();
  const { publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState('Created Tokens');

  /* Use provided address or connected wallet */
  const displayAddr = address || publicKey?.toBase58() || mockUserProfile.address;
  const profile = mockUserProfile;

  const createdTokens = profile.createdTokens
    .map(id => getTokenById(id))
    .filter(Boolean);

  return (
    <div className="profile-page container">
      {/* Profile header */}
      <header className="profile-header">
        <div className="profile-avatar">
          <span className="avatar-char">{displayAddr.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-info">
          <h1 className="profile-address">{displayAddr}</h1>
          <div className="profile-meta">
            <span>Joined {formatAge(profile.joinDate)}</span>
          </div>
        </div>
      </header>

      {/* Stats row */}
      <div className="profile-stats">
        <div className="profile-stat-card">
          <span className="pstat-value">{profile.totalTokensCreated}</span>
          <span className="pstat-label">Tokens Created</span>
        </div>
        <div className="profile-stat-card">
          <span className="pstat-value">{profile.totalTrades}</span>
          <span className="pstat-label">Total Trades</span>
        </div>
        <div className="profile-stat-card">
          <span className="pstat-value">{profile.holdings.length}</span>
          <span className="pstat-label">Holdings</span>
        </div>
        <div className="profile-stat-card">
          <span className="pstat-value">
            {profile.holdings.reduce((sum, h) => sum + h.value, 0).toFixed(1)} SOL
          </span>
          <span className="pstat-label">Portfolio Value</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs" role="tablist" aria-label="Profile sections">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`profile-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="profile-content" role="tabpanel">
        {activeTab === 'Created Tokens' && (
          <div className="created-grid">
            {createdTokens.length > 0 ? (
              createdTokens.map(token => (
                <TokenCard key={token.id} token={token} />
              ))
            ) : (
              <div className="empty-state">
                <p>No tokens created yet</p>
                <Link to="/create" className="empty-action">Create your first token</Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Holdings' && (
          <div className="holdings-list">
            <div className="holdings-table-wrapper">
              <table className="holdings-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Amount</th>
                    <th>Value (SOL)</th>
                    <th>Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.holdings.map(holding => {
                    const token = getTokenById(holding.tokenId);
                    if (!token) return null;
                    return (
                      <tr key={holding.tokenId}>
                        <td>
                          <Link to={`/token/${token.id}`} className="holding-token-link">
                            <img src={token.image} alt={token.name} className="holding-token-img" />
                            <div>
                              <span className="holding-name">{token.name}</span>
                              <span className="holding-ticker">${token.ticker}</span>
                            </div>
                          </Link>
                        </td>
                        <td>{holding.amount.toLocaleString()}</td>
                        <td className="holding-value">{holding.value.toFixed(2)}</td>
                        <td>{formatMarketCap(token.marketCap)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Activity' && (
          <div className="activity-list">
            {profile.activity.map((item, i) => (
              <div key={i} className={`activity-item ${item.type}`}>
                <div className={`activity-badge ${item.type}`}>
                  {item.type === 'buy' ? 'BUY' : 'SELL'}
                </div>
                <div className="activity-details">
                  <div className="activity-primary">
                    <span className="activity-amount">{item.solAmount} SOL</span>
                    <span className="activity-of">of</span>
                    <Link to={`/token/${item.tokenId}`} className="activity-token">
                      ${item.tokenTicker}
                    </Link>
                  </div>
                  <span className="activity-time">{formatAge(item.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
