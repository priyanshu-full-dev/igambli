import React, { useState, useEffect } from 'react';
import { useWhatsApp, API_BASE } from '../context/WhatsAppContext';
import Logo from '../components/Logo';

export default function NumberAdmin() {
  const { whatsappNumber, setWhatsappNumber, refreshNumber } = useWhatsApp();

  // Strict Authentication States
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem('igambli_admin_token') || '');

  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Number management states
  const [newNumber, setNewNumber] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // 1. Strict Session Verification on mount
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('igambli_admin_token');
      if (!storedToken) {
        setIsAuthenticated(false);
        setIsCheckingSession(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/verify`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.authenticated) {
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('igambli_admin_token');
            setToken('');
            setIsAuthenticated(false);
          }
        } else {
          // Token invalid or expired on server
          localStorage.removeItem('igambli_admin_token');
          setToken('');
          setIsAuthenticated(false);
        }
      } catch (err) {
        // Network or server unreachable
        console.warn('Backend server verification failed:', err);
        localStorage.removeItem('igambli_admin_token');
        setToken('');
        setIsAuthenticated(false);
      } finally {
        setIsCheckingSession(false);
      }
    };

    verifySession();
  }, []);

  // Sync newNumber input with current active number once authenticated
  useEffect(() => {
    if (isAuthenticated && whatsappNumber) {
      setNewNumber(whatsappNumber);
    }
  }, [isAuthenticated, whatsappNumber]);

  // 2. Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem('igambli_admin_token', data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        setStatusMessage({ type: 'success', text: 'Authentication successful! Welcome to Admin Panel.' });
        setTimeout(() => setStatusMessage({ type: '', text: '' }), 3000);
      } else {
        setIsAuthenticated(false);
        setLoginError(data.message || 'Invalid ID or Password. Access Denied.');
      }
    } catch (err) {
      setLoginError('Backend connection error. Please make sure the backend server is running on port 5001.');
    } finally {
      setLoginLoading(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE}/api/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('igambli_admin_token');
    setToken('');
    setIsAuthenticated(false);
    setStatusMessage({ type: '', text: '' });
  };

  // 4. Handle Update Number
  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    const clean = newNumber.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{10,15}$/.test(clean)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid 10-15 digit phone number' });
      return;
    }

    setUpdateLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/number`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ whatsappNumber: clean }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWhatsappNumber(data.whatsappNumber);
        setStatusMessage({
          type: 'success',
          text: `WhatsApp number updated successfully to: +${data.whatsappNumber.startsWith('91') ? data.whatsappNumber : '91 ' + data.whatsappNumber}!`,
        });
        refreshNumber();
      } else if (res.status === 401) {
        // Kick out on unauthorized/expired token
        localStorage.removeItem('igambli_admin_token');
        setToken('');
        setIsAuthenticated(false);
        setLoginError('Session expired or unauthorized. Please log in again.');
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to update number' });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Connection error. Check if backend is reachable.',
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  const formattedCurrent = whatsappNumber.startsWith('91')
    ? `+91 ${whatsappNumber.slice(2, 7)} ${whatsappNumber.slice(7)}`
    : `+91 ${whatsappNumber}`;

  const cleanPreview = newNumber.replace(/[\s\-\(\)\+]/g, '');
  const previewLink = `https://wa.me/${cleanPreview.startsWith('91') ? cleanPreview : '91' + cleanPreview}`;

  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col font-sans selection:bg-[#ff2a4b] selection:text-white">
      {/* Top Header */}
      <header className="bg-[#0b101b] border-b border-[#1f293d] py-3.5 px-4 md:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center text-inherit no-underline">
            <Logo size="medium" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white bg-[#141d2e] hover:bg-[#1a263c] px-3.5 py-1.5 rounded-lg border border-[#23314d] transition-all"
          >
            ← Back to Website
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-10 flex flex-col justify-center">
        {/* State 1: Checking Authentication Loading */}
        {isCheckingSession ? (
          <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-10 text-center shadow-2xl">
            <div className="w-10 h-10 border-3 border-[#ff2a4b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-base font-bold text-white mb-1">Verifying Admin Authorization...</h2>
            <p className="text-xs text-gray-400">Please wait while we verify your secure session token.</p>
          </div>
        ) : !isAuthenticated ? (
          /* State 2: STRICT PROTECTED LOGIN SCREEN */
          <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Red Security Indicator Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e50914] via-[#ff2a4b] to-[#ff5e3a]" />

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e50914]/20 to-[#ff2a4b]/10 border border-[#e50914]/40 text-[#ff2a4b] mb-3 shadow-[0_0_20px_rgba(255,42,75,0.2)]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-500/40 text-[11px] font-bold text-red-300 uppercase tracking-widest mb-2">
                🔒 Protected Admin Route
              </div>
              <h1 className="text-2xl font-black font-heading tracking-wide text-white">
                Admin Authentication Required
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Enter authorized ID &amp; Password to access WhatsApp number settings.
              </p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-500/60 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Admin ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Admin ID (e.g. admin)"
                    className="w-full bg-[#141e33] border border-[#223354] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a4b] focus:ring-1 focus:ring-[#ff2a4b] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full bg-[#141e33] border border-[#223354] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ff2a4b] focus:ring-1 focus:ring-[#ff2a4b] transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white px-2 py-1 text-xs cursor-pointer select-none"
                    tabIndex="-1"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full mt-2 bg-gradient-to-r from-[#e50914] via-[#ff2a4b] to-[#ff5e3a] hover:from-[#ff1e42] hover:to-[#ff6b35] text-white font-bold py-3 rounded-lg text-sm tracking-wide shadow-[0_4px_20px_rgba(255,42,75,0.4)] transition-all disabled:opacity-50 cursor-pointer"
              >
                {loginLoading ? 'Verifying Credentials...' : 'Authenticate & Open Panel'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-[#1a2740] text-center text-[11px] text-gray-400">
              Default credentials: <span className="font-mono text-gray-200">ID: admin</span> | <span className="font-mono text-gray-200">Password: admin123</span>
            </div>
          </div>
        ) : (
          /* State 3: AUTHENTICATED NUMBER MANAGEMENT DASHBOARD */
          <div className="space-y-6">
            {/* Top Session Status Bar */}
            <div className="flex items-center justify-between bg-[#0e1626] border border-[#1e2d4a] rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                  Authenticated: Admin Session Active
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 px-3 py-1 rounded transition-all cursor-pointer"
              >
                Lock &amp; Logout ⎋
              </button>
            </div>

            {/* Current Active Number Card */}
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-2">
                Live Active WhatsApp Number
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.983.538 1.838.82 2.791.82 3.181 0 5.768-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.708 0-3.32-.434-4.739-1.196l-5.261 1.378 1.405-5.132c-.87-1.485-1.373-3.21-1.373-5.05 0-5.514 4.486-10 10-10s10 4.486 10 10z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-heading text-xl sm:text-2xl font-black text-white tracking-wide block">
                      {formattedCurrent}
                    </span>
                    <span className="block text-[11px] text-gray-400">
                      Synchronized across all website buttons and links
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber.startsWith('91') ? whatsappNumber : '91' + whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs px-4 py-2.5 rounded-lg transition-all shadow-[0_2px_12px_rgba(37,211,102,0.3)] shrink-0"
                >
                  Test Active Link ↗
                </a>
              </div>
            </div>

            {/* Change WhatsApp Number Form Card */}
            <div className="bg-[#0e1626] border border-[#1e2d4a] rounded-2xl p-6 sm:p-7 shadow-xl">
              <h2 className="text-lg font-bold font-heading text-white mb-1">
                Update WhatsApp Number
              </h2>
              <p className="text-xs text-gray-400 mb-5">
                Saving will immediately push the new number to the backend and apply it live across the site.
              </p>

              {statusMessage.text && (
                <div
                  className={`mb-5 p-3.5 rounded-lg text-xs sm:text-sm flex items-start gap-2.5 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-200'
                      : 'bg-red-950/70 border border-red-500/50 text-red-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <svg className="w-5 h-5 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 shrink-0 text-red-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                    New WhatsApp Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-sm font-semibold text-gray-400 select-none">
                      🇮🇳 +91
                    </span>
                    <input
                      type="text"
                      required
                      value={newNumber}
                      onChange={(e) => setNewNumber(e.target.value)}
                      placeholder="e.g. 7366064847"
                      className="w-full bg-[#141e33] border border-[#223354] rounded-lg pl-18 pr-3.5 py-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366] transition-all"
                    />
                  </div>
                  <span className="block text-[11px] text-gray-500 mt-1.5">
                    Enter 10-digit number (e.g. 7366064847)
                  </span>
                </div>

                {/* Live Link Preview */}
                <div className="p-3 bg-[#121927] rounded-lg border border-[#1b263b] text-xs">
                  <span className="text-gray-400 block text-[11px] mb-1">Generated URL Preview:</span>
                  <code className="text-[#25D366] font-mono break-all text-[11.5px]">
                    {previewLink}
                  </code>
                </div>

                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1aa34e] text-[#040812] font-black py-3 rounded-lg text-sm tracking-wide shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {updateLoading ? 'Saving...' : 'Save & Update WhatsApp Number'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
