import { Link } from 'react-router-dom';
import { formatMarketCap, formatVolume, formatPrice, formatAge } from '../data/mockData';
import './TokenTable.css';

export default function TokenTable({ tokens, sortField, sortDir, onSort }) {
  const headers = [
    { key: 'name', label: 'Token' },
    { key: 'price', label: 'Price' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume24h', label: '24h Vol' },
    { key: 'holders', label: 'Holders' },
    { key: 'bondingCurveProgress', label: 'Progress' },
    { key: 'createdAt', label: 'Age' },
  ];

  return (
    <div className="token-table-wrapper" role="region" aria-label="Token list" tabIndex={0}>
      <table className="token-table">
        <thead>
          <tr>
            {headers.map(h => (
              <th
                key={h.key}
                onClick={() => onSort(h.key)}
                className={`sortable ${sortField === h.key ? 'sorted' : ''}`}
                aria-sort={
                  sortField === h.key
                    ? sortDir === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                {h.label}
                {sortField === h.key && (
                  <span className="sort-arrow">{sortDir === 'asc' ? ' ^' : ' v'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tokens.map(token => (
            <tr key={token.id}>
              <td>
                <Link to={`/token/${token.id}`} className="table-token-link">
                  <img src={token.image} alt={token.name} className="table-token-img" />
                  <div className="table-token-info">
                    <span className="table-token-name">{token.name}</span>
                    <span className="table-token-ticker">${token.ticker}</span>
                  </div>
                </Link>
              </td>
              <td>{formatPrice(token.price)}</td>
              <td>{formatMarketCap(token.marketCap)}</td>
              <td>{formatVolume(token.volume24h)}</td>
              <td>{token.holders.toLocaleString()}</td>
              <td>
                <div className="table-progress">
                  <div className="table-progress-bar">
                    <div
                      className="table-progress-fill"
                      style={{
                        width: `${token.bondingCurveProgress}%`,
                        background: token.bondingCurveProgress > 80
                          ? 'var(--green)'
                          : token.bondingCurveProgress > 50
                          ? 'var(--cyan)'
                          : 'var(--yellow)',
                      }}
                    />
                  </div>
                  <span className="table-progress-text">{token.bondingCurveProgress.toFixed(1)}%</span>
                </div>
              </td>
              <td className="text-muted">{formatAge(token.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
