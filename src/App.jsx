import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateToken from './pages/CreateToken';
import TokenDetail from './pages/TokenDetail';
import Profile from './pages/Profile';

export default function App() {
  return (
    <div className="app">
      <LiveTicker />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateToken />} />
          <Route path="/token/:id" element={<TokenDetail />} />
          <Route path="/profile/:address" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
