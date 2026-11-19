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

// Default Admin Credentials (can be overridden via environment variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

// Active tokens in-memory (or single shared secret token)
const activeTokens = new Set();

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
  // Default data
  return { whatsappNumber: '7366064847' };
}

// Helper to write data safely
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }

  next();
}

// 1. Public API: Get Current WhatsApp Number
app.get('/api/number', (req, res) => {
  const data = readData();
  res.json({
    success: true,
    whatsappNumber: data.whatsappNumber || '7366064847',
  });
});

// 2. Admin Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.add(token);
    return res.json({
      success: true,
      token,
      message: 'Login successful',
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid ID or Password' });
});

// 3. Admin API: Update WhatsApp Number
app.post('/api/number', requireAuth, (req, res) => {
  const { whatsappNumber } = req.body || {};

  if (!whatsappNumber || typeof whatsappNumber !== 'string') {
    return res.status(400).json({ success: false, message: 'Valid WhatsApp number is required' });
  }

  // Clean the number - strip spaces, dashes, parentheses and leading '+'
  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)\+]/g, '');

  if (cleanNumber.length < 10) {
    return res.status(400).json({ success: false, message: 'Phone number must have at least 10 digits' });
  }

  const currentData = readData();
  currentData.whatsappNumber = cleanNumber;
  writeData(currentData);

  res.json({
    success: true,
    whatsappNumber: cleanNumber,
    message: 'WhatsApp number updated successfully',
  });
});

// 4. Admin API: Verify Token Status
app.get('/api/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ authenticated: false });
  }
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  res.json({ authenticated: activeTokens.has(token) });
});

// 5. Admin API: Logout
app.post('/api/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    activeTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully' });
});

// Root check
app.get('/', (req, res) => {
  res.send('Booking Panel API is running.');
});

// Initialize default data file if not exists
if (!fs.existsSync(DATA_FILE)) {
  writeData({ whatsappNumber: '7366064847' });
}

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
