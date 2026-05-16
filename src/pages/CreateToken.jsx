import { useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './CreateToken.css';

export default function CreateToken() {
  const { publicKey } = useWallet();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    ticker: '',
    description: '',
    twitter: '',
    telegram: '',
    website: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [deploying, setDeploying] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'ticker') {
      setForm(f => ({ ...f, ticker: value.toUpperCase().slice(0, 10) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.ticker) return;
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setSubmitted(true);
    }, 2000);
  }

  function handleReset() {
    setForm({ name: '', ticker: '', description: '', twitter: '', telegram: '', website: '' });
    setImagePreview(null);
    setImageName('');
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="create-page container">
        <div className="success-panel">
          <div className="success-icon">&#10003;</div>
          <h2 className="success-title">Token Deployed Successfully</h2>
          <div className="success-details">
            <div className="detail-row">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{form.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Ticker:</span>
              <span className="detail-value">${form.ticker}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">TX Hash:</span>
              <span className="detail-value tx-hash">4xK9...mN2p (mock)</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="detail-value status-confirmed">CONFIRMED</span>
            </div>
          </div>
          <button className="btn-primary" onClick={handleReset}>
            Deploy Another Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-page container">
      <div className="create-header">
        <h1 className="create-title">
          Create Token
        </h1>
        <p className="create-subtitle">
          Deploy your memecoin on Solana in seconds
        </p>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Left column - form fields */}
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Token Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="e.g. MonkeyBusiness"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ticker" className="form-label">
                Ticker Symbol
                <span className="label-hint">(max 10 chars)</span>
              </label>
              <div className="ticker-input-wrapper">
                <span className="ticker-prefix">$</span>
                <input
                  type="text"
                  id="ticker"
                  name="ticker"
                  className="form-input ticker-input"
                  placeholder="e.g. MNKY"
                  value={form.ticker}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input form-textarea"
                placeholder="Describe your token..."
                value={form.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Token Image
              </label>
              <div
                className="image-upload"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload token image"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Token preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">+</span>
                    <span className="upload-text">Click to upload</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input-hidden"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>
              {imageName && <span className="image-name">{imageName}</span>}
            </div>
          </div>

          {/* Right column - socials and info */}
          <div className="form-sidebar">
            <div className="socials-section">
              <h3 className="section-title">Social Links (Optional)</h3>

              <div className="form-group">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  className="form-input"
                  placeholder="https://twitter.com/..."
                  value={form.twitter}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="telegram" className="form-label">
                  Telegram
                </label>
                <input
                  type="url"
                  id="telegram"
                  name="telegram"
                  className="form-input"
                  placeholder="https://t.me/..."
                  value={form.telegram}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="form-input"
                  placeholder="https://..."
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="fee-info">
              <h3 className="section-title">Deployment Info</h3>
              <div className="fee-row">
                <span>Network</span>
                <span className="fee-value">Solana (Devnet)</span>
              </div>
              <div className="fee-row">
                <span>Total Supply</span>
                <span className="fee-value">1,000,000,000</span>
              </div>
              <div className="fee-row">
                <span>Platform Fee</span>
                <span className="fee-value">0.02 SOL</span>
              </div>
              <div className="fee-row">
                <span>Est. Gas</span>
                <span className="fee-value">~0.005 SOL</span>
              </div>
              <div className="fee-row total">
                <span>Total Cost</span>
                <span className="fee-value">~0.025 SOL</span>
              </div>
            </div>
          </div>
        </div>

        {!publicKey && (
          <div className="connect-warning">
            <span className="warning-icon">!</span>
            Connect wallet to deploy token
          </div>
        )}

        <button
          type="submit"
          className="btn-deploy"
          disabled={!form.name || !form.ticker || deploying}
        >
          {deploying ? (
            <span className="deploying-text">
              Deploying...
            </span>
          ) : (
            <>DEPLOY TOKEN</>
          )}
        </button>
      </form>
    </div>
  );
}
