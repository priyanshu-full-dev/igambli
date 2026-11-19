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
const TMP_DATA_FILE = '/tmp/data.json';

// Admin Credentials
const ADMIN_USER = process.env.ADMIN_USER || 'prish07';
const ADMIN_PASS = process.env.ADMIN_PASS || '31012002';
const SECRET_KEY = process.env.JWT_SECRET || 'igambli_jwt_secret_31012002_prish07';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

let inMemoryNumber = '7366064847';

app.use(cors());
app.use(express.json());

// Token Helpers (Stateless HMAC - works seamlessly across Vercel serverless instances)
function generateToken() {
  const expiresAt = Date.now() + SESSION_EXPIRY_MS;
  const payload = `${ADMIN_USER}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  return `${expiresAt}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [expiresAtStr, signature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const payload = `${ADMIN_USER}:${expiresAt}`;
  const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

// Helper to read data safely (supports local and Vercel serverless /tmp)
function readData() {
  // 1. Try reading from /tmp/data.json (Vercel serverless writable storage)
  try {
    if (fs.existsSync(TMP_DATA_FILE)) {
      const content = fs.readFileSync(TMP_DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && parsed.whatsappNumber) {
        inMemoryNumber = parsed.whatsappNumber;
        return parsed;
      }
    }
  } catch (e) {}

  // 2. Try reading from project data.json
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      if (parsed && parsed.whatsappNumber) {
        inMemoryNumber = parsed.whatsappNumber;
        return parsed;
      }
    }
  } catch (err) {}

  return { whatsappNumber: inMemoryNumber };
}

// Helper to write data safely (handles Vercel read-only filesystem gracefully)
function writeData(data) {
  inMemoryNumber = data.whatsappNumber;

  // 1. Try writing to /tmp/data.json (always writable on Vercel)
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {}

  // 2. Try writing to local project data.json (for local development)
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Expected on Vercel read-only filesystem, safe to ignore since /tmp is updated
  }
}

// Strict Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Authentication required. Access denied.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session. Please login.' });
  }

  next();
}

// 1. Public API: Get Current WhatsApp Number
app.get('/api/number', (req, res) => {
  const data = readData();
  res.json({
    success: true,
    whatsappNumber: data.whatsappNumber || inMemoryNumber || '7366064847',
  });
});

// 2. Admin Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Admin ID and password are required.' });
  }

  const cleanUser = String(username).trim();
  const cleanPass = String(password).trim();

  if (cleanUser === ADMIN_USER && cleanPass === ADMIN_PASS) {
    const token = generateToken();
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

  const cleanNumber = whatsappNumber.replace(/[\s\-\(\)\+]/g, '');

  if (!/^\d{10,15}$/.test(cleanNumber)) {
    return res.status(400).json({ success: false, message: 'Phone number must contain between 10 to 15 digits.' });
  }

  writeData({ whatsappNumber: cleanNumber });

  res.json({
    success: true,
    whatsappNumber: cleanNumber,
    message: 'WhatsApp number updated successfully.',
  });
});

// 4. Admin API: Verify Session Token
app.get('/api/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ authenticated: false, message: 'No authorization provided.' });
  }

  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token || !verifyToken(token)) {
    return res.status(401).json({ authenticated: false, message: 'Invalid or expired session.' });
  }

  res.json({
    authenticated: true,
    username: ADMIN_USER,
  });
});

// 5. Admin API: Logout
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Root check
app.get('/', (req, res) => {
  res.send('Booking Panel WhatsApp Backend API is running on Vercel.');
});

// Export app for Vercel Serverless Functions
export default app;

// Listen locally if run directly
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}
