import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PriceChart from '../components/PriceChart';
import BondingCurveChart from '../components/BondingCurveChart';
import { getTokenById, formatMarketCap, formatPrice, formatAge } from '../data/mockData';
import './TokenDetail.css';

export default function TokenDetail() {
  const { id } = useParams();
  const token = getTokenById(id);

  const [tradeMode, setTradeMode] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [slippage, setSlippage] = useState('1');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(token?.comments || []);
  const [tradeSuccess, setTradeSuccess] = useState(false);

  if (!token) {
    return (
      <div className="token-detail container">
        <div className="not-found">
          <p>Token not found</p>
          <Link to="/" className="back-link">Go Home</Link>
        </div>
      </div>
    );
  }

  const solRemaining = ((100 - token.bondingCurveProgress) / 100 * token.graduationThreshold).toFixed(1);

  function estimateOutput() {
    if (!tradeAmount || parseFloat(tradeAmount) <= 0) return '0';
    const amt = parseFloat(tradeAmount);
    if (tradeMode === 'buy') {
      return Math.floor(amt / token.price).toLocaleString();
    }
    return (amt * token.price).toFixed(4);
  }

  function handleTrade(e) {
    e.preventDefault();
    setTradeSuccess(true);
    setTimeout(() => setTradeSuccess(false), 3000);
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `new-${Date.now()}`,
      author: '7xKX...q9Fp',
      text: commentText,
      timestamp: new Date().toISOString(),
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  }

  return (
    <div className="token-detail container">
      {/* Token header */}
      <header className="td-header">
        <Link to="/" className="back-btn" aria-label="Back to token list">Back</Link>
        <div className="td-header-main">
          <img src={token.image} alt={token.name} className="td-token-img" />
          <div className="td-header-info">
            <h1 className="td-name">
              {token.name} <span className="td-ticker">${token.ticker}</span>
            </h1>
            <div className="td-meta">
              <span>Creator: <span className="td-addr">{token.creator}</span></span>
              <span className="td-sep">|</span>
              <span>{formatAge(token.createdAt)}</span>
            </div>
          </div>
          <div className="td-header-socials">
            {token.twitter && <a href={token.twitter} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">X</a>}
            {token.telegram && <a href={token.telegram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Telegram">TG</a>}
            {token.website && <a href={token.website} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Website">WEB</a>}
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <div className="td-grid">
        {/* Left column */}
        <div className="td-left">
          {/* Price chart */}
          <PriceChart tokenName={token.name} />

          {/* Bonding curve stats */}
          <section className="td-panel">
            <h2 className="panel-title">Bonding Curve</h2>
            <div className="bonding-stats-grid">
              <div className="bonding-chart-col">
                <BondingCurveChart progress={token.bondingCurveProgress} />
              </div>
              <div className="bonding-info-col">
                <div className="bonding-progress-section">
                  <div className="bonding-progress-header">
                    <span className="bonding-label">Progress to Raydium</span>
                    <span className="bonding-pct-large">{token.bondingCurveProgress.toFixed(1)}%</span>
                  </div>
                  <div className="bonding-bar-large">
                    <div
                      className="bonding-fill-large"
                      style={{
                        width: `${token.bondingCurveProgress}%`,
                        background: token.bondingCurveProgress > 80 ? 'var(--green)' : 'var(--cyan)',
                      }}
                    />
                  </div>
                </div>
                <div className="bonding-stats-list">
                  <div className="bs-row">
                    <span className="bs-label">Current Price</span>
                    <span className="bs-value">{formatPrice(token.price)}</span>
                  </div>
                  <div className="bs-row">
                    <span className="bs-label">Market Cap</span>
                    <span className="bs-value">{formatMarketCap(token.marketCap)}</span>
                  </div>
                  <div className="bs-row">
                    <span className="bs-label">Liquidity Locked</span>
                    <span className="bs-value">{token.liquidityLocked.toFixed(1)} SOL</span>
                  </div>
                  <div className="bs-row">
                    <span className="bs-label">Graduation</span>
                    <span className="bs-value highlight">{solRemaining} SOL remaining</span>
                  </div>
                  <div className="bs-row">
                    <span className="bs-label">Total Supply</span>
                    <span className="bs-value">{token.totalSupply.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comments */}
          <section className="td-panel">
            <h2 className="panel-title">Comments ({comments.length})</h2>
            <form className="comment-form" onSubmit={handleAddComment}>
              <div className="comment-input-wrapper">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  aria-label="Write a comment"
                />
              </div>
              <button type="submit" className="comment-submit" disabled={!commentText.trim()}>
                Send
              </button>
            </form>
            <div className="comments-list">
              {comments.map(c => (
                <div key={c.id} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-time">{formatAge(c.timestamp)}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="td-right">
          {/* Buy/Sell panel */}
          <section className="td-panel trade-panel">
            <div className="trade-tabs" role="tablist">
              <button
                className={`trade-tab ${tradeMode === 'buy' ? 'active buy' : ''}`}
                onClick={() => setTradeMode('buy')}
                role="tab"
                aria-selected={tradeMode === 'buy'}
              >
                BUY
              </button>
              <button
                className={`trade-tab ${tradeMode === 'sell' ? 'active sell' : ''}`}
                onClick={() => setTradeMode('sell')}
                role="tab"
                aria-selected={tradeMode === 'sell'}
              >
                SELL
              </button>
            </div>

            <form className="trade-form" onSubmit={handleTrade}>
              <div className="form-group">
                <label className="trade-label">
                  Amount ({tradeMode === 'buy' ? 'SOL' : token.ticker})
                </label>
                <div className="trade-input-wrapper">
                  <input
                    type="number"
                    className="trade-input"
                    placeholder="0.00"
                    value={tradeAmount}
                    onChange={e => setTradeAmount(e.target.value)}
                    min="0"
                    step="any"
                    aria-label={`Amount in ${tradeMode === 'buy' ? 'SOL' : token.ticker}`}
                  />
                  <span className="trade-currency">
                    {tradeMode === 'buy' ? 'SOL' : token.ticker}
                  </span>
                </div>
                {tradeMode === 'buy' && (
                  <div className="quick-amounts">
                    {['0.1', '0.5', '1', '5'].map(amt => (
                      <button
                        key={amt}
                        type="button"
                        className="quick-btn"
                        onClick={() => setTradeAmount(amt)}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="trade-label">Slippage Tolerance</label>
                <div className="slippage-options">
                  {['0.5', '1', '2', '5'].map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`slippage-btn ${slippage === s ? 'active' : ''}`}
                      onClick={() => setSlippage(s)}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="trade-estimate">
                <span className="estimate-label">Est. Output</span>
                <span className="estimate-value">
                  {estimateOutput()} {tradeMode === 'buy' ? token.ticker : 'SOL'}
                </span>
              </div>

              <button
                type="submit"
                className={`trade-execute ${tradeMode}`}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
              >
                {tradeMode === 'buy' ? 'BUY' : 'SELL'} ${token.ticker}
              </button>

              {tradeSuccess && (
                <div className="trade-success">
                  Trade executed (mock)
                </div>
              )}
            </form>
          </section>

          {/* Holders */}
          <section className="td-panel">
            <h2 className="panel-title">Top Holders ({token.topHolders.length})</h2>
            <div className="holder-dist-bar">
              {token.topHolders.slice(0, 5).map((h, i) => (
                <div
                  key={i}
                  className="dist-segment"
                  style={{
                    width: `${h.percentage}%`,
                    background: ['var(--cyan)', 'var(--green)', 'var(--yellow)', 'var(--purple)', 'var(--red)'][i],
                    opacity: 1 - i * 0.15,
                  }}
                  title={`${h.address}: ${h.percentage}%`}
                />
              ))}
            </div>
            <table className="holders-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Address</th>
                  <th>Amount</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {token.topHolders.map(h => (
                  <tr key={h.rank}>
                    <td className="holder-rank">{h.rank}</td>
                    <td className="holder-addr">{h.address}</td>
                    <td>{h.amount}</td>
                    <td className="holder-pct">{h.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Recent trades */}
          <section className="td-panel">
            <h2 className="panel-title">Recent Trades</h2>
            <div className="trades-list">
              {token.recentTrades.map(trade => (
                <div key={trade.id} className={`trade-item ${trade.type}`}>
                  <div className="trade-type-badge">
                    {trade.type === 'buy' ? 'BUY' : 'SELL'}
                  </div>
                  <div className="trade-details">
                    <span className="trade-amount">{trade.solAmount} SOL</span>
                    <span className="trade-wallet">{trade.wallet}</span>
                  </div>
                  <span className="trade-time">{formatAge(trade.timestamp)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
