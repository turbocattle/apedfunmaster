import './LiveTicker.css';

const TRADES = [
  { type: 'buy',  wallet: 'AJx4...mK2p', sol: '12.50', token: 'WIF' },
  { type: 'sell', wallet: 'Bs9R...vK2j', sol: '8.30',  token: 'WIF' },
  { type: 'buy',  wallet: 'Wp7Y...dR4f', sol: '5.00',  token: 'WIF' },
  { type: 'buy',  wallet: 'Hy1Z...eW9k', sol: '21.70', token: 'WIF' },
  { type: 'sell', wallet: 'Gt6R...xI2m', sol: '3.20',  token: 'WIF' },
  { type: 'buy',  wallet: 'Lq4P...cU7n', sol: '0.80',  token: 'WIF' },
  { type: 'buy',  wallet: 'Nw3Q...lF7d', sol: '15.00', token: 'WIF' },
  { type: 'sell', wallet: 'Pj2W...uY8a', sol: '6.40',  token: 'WIF' },
  { type: 'buy',  wallet: 'Om9S...rB1g', sol: '9.90',  token: 'WIF' },
  { type: 'sell', wallet: 'Dx7K...iT6e', sol: '2.10',  token: 'WIF' },
  { type: 'buy',  wallet: 'Fs8D...bA3j', sol: '18.50', token: 'WIF' },
  { type: 'buy',  wallet: 'Uc5V...oJ4h', sol: '7.30',  token: 'WIF' },
  { type: 'sell', wallet: 'Kn5Y...aR7m', sol: '4.60',  token: 'WIF' },
  { type: 'buy',  wallet: 'Qe2T...sL4c', sol: '33.00', token: 'WIF' },
  { type: 'buy',  wallet: 'Hj8U...wP6b', sol: '1.20',  token: 'WIF' },
];

export default function LiveTicker() {
  const items = [...TRADES, ...TRADES];
  return (
    <div className="live-ticker" aria-hidden="true">
      <div className="ticker-badge">
        <span className="ticker-live-dot" />
        LIVE
      </div>
      <div className="ticker-overflow">
        <div className="ticker-track">
          {items.map((t, i) => (
            <span key={i} className={`ticker-item ticker-${t.type}`}>
              <span className="ticker-dot" />
              <span className="ticker-wallet">{t.wallet}</span>
              <span className="ticker-verb">{t.type === 'buy' ? 'bought' : 'sold'}</span>
              <span className="ticker-sol">{t.sol} SOL</span>
              <span className="ticker-of">of {t.token}</span>
              <span className="ticker-sep" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
