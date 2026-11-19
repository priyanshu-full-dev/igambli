import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Admin Credentials (configurable via environment variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// Active tokens with 24-hour expiration: Map<token, { createdAt, expiresAt }>
const activeTokens = new Map();
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

app.use(cors());
app.use(express.json());

// Helper to read data safely
function readData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading data.json:', err);
  }
  return { whatsappNumber: '7366064847' };
}

// Helper to write data safely
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Strict Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authentication required. Access denied.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login.' });
  }

  const session = activeTokens.get(token);
  if (Date.now() > session.expiresAt) {
    activeTokens.delete(token);
    return res.status(401).json({ success: false, message: 'Session expired. Please login again.' });
  }

  next();
}

// 1. Public API: Get Current WhatsApp Number (for landing page visitors)
app.get('/api/number', (req, res) => {
  const data = readData();
  res.json({
    success: true,
    whatsappNumber: data.whatsappNumber || '7366064847',
  });
});

// 2. Admin Login API (Strict verification)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Admin ID and password are required.' });
  }

  const cleanUser = String(username).trim();
  const cleanPass = String(password).trim();

  if (cleanUser === ADMIN_USER && cleanPass === ADMIN_PASS) {
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.set(token, {
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_EXPIRY_MS,
    });

    return res.json({
      success: true,
      token,
      message: 'Login successful',
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid Admin ID or Password.' });
});

// 3. Admin API: Update WhatsApp Number (Protected Route)
app.post('/api/number', requireAuth, (req, res) => {
  const { whatsappNumber } = req.body || {};

  if (!whatsappNumber || typeof whatsappNumber !== 'string') {
    return res.status(400).json({ success: false, message: 'A valid WhatsApp phone number is required.' });
  }

  // Sanitize: strip out spaces, hyphens, brackets, and leading '+'
  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)\+]/g, '');

  if (!/^\d{10,15}$/.test(cleanNumber)) {
    return res.status(400).json({ success: false, message: 'Phone number must contain between 10 to 15 digits.' });
  }

  const currentData = readData();
  currentData.whatsappNumber = cleanNumber;
  writeData(currentData);

  res.json({
    success: true,
    whatsappNumber: cleanNumber,
    message: 'WhatsApp number updated successfully.',
  });
});

// 4. Admin API: Verify Session Token (Protected verification)
app.get('/api/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ authenticated: false, message: 'No authorization provided.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ authenticated: false, message: 'Invalid token.' });
  }

  const session = activeTokens.get(token);
  if (Date.now() > session.expiresAt) {
    activeTokens.delete(token);
    return res.status(401).json({ authenticated: false, message: 'Session expired.' });
  }

  res.json({
    authenticated: true,
    username: ADMIN_USER,
    expiresAt: session.expiresAt,
  });
});

// 5. Admin API: Logout
app.post('/api/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Root check
app.get('/', (req, res) => {
  res.send('Booking Panel WhatsApp Backend API is running.');
});

// Initialize default data file if not exists
if (!fs.existsSync(DATA_FILE)) {
  writeData({ whatsappNumber: '7366064847' });
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
