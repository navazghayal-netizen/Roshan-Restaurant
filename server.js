const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const bodyParser = require('body-parser');
const multer     = require('multer');
const fs         = require('fs');
const path       = require('path');
require('dotenv').config();

const app = express();

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// ─── JSONBin Config ────────────────────────────────────────────
// JSONBin.io se free permanent storage milti hai
// .env mein JSONBIN_BIN_ID aur JSONBIN_API_KEY daalna hoga
const JSONBIN_BIN_ID  = process.env.JSONBIN_BIN_ID  || '';
const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY || '`';
const JSONBIN_URL     = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

const USE_JSONBIN = !!(JSONBIN_BIN_ID && JSONBIN_API_KEY);

// ─── Image folder ──────────────────────────────────────────────
const IMAGE_DIR     = path.join(__dirname, 'Image');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// ─── Multer ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGE_DIR),
  filename: (req, file, cb) => {
    const ext      = path.extname(file.originalname).toLowerCase();
    const safeName = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .toLowerCase();
    cb(null, `${safeName}-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// ─── Default products ──────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { id: 'p1',  name: 'Gravy Chicken',  price: 200, desc: 'Made with homely taste & restaurant-style flavor',         img: 'Image/chicken-gravy-1.webp' },
  { id: 'p2',  name: 'Gravy Mutton',   price: 250, desc: 'Loaded with tender mutton & rich spices',                  img: 'Image/mutton-500x500.webp' },
  { id: 'p3',  name: 'Jinga',          price: 200, desc: "Ocean's freshness cooked with authentic masala",           img: 'Image/Prawn-Biryani-Recipe-480x270.webp' },
  { id: 'p4',  name: 'Fish',           price: 200, desc: 'Ocean Fresh Flavor',                                       img: 'Image/Fish-Curry-4.jpg' },
  { id: 'p5',  name: 'Chicken Biryani',price: 220, desc: 'Chicken Biryani — Tradition Served Hot',                  img: 'Image/Boneless-Chicken-Biryani-Meghanas-2-500x500.jpg' },
  { id: 'p6',  name: 'Mutton Biryani', price: 280, desc: 'Mutton Biryani — A taste of royal tradition',             img: 'Image/Mutton-Masala-min.jpg' },
  { id: 'p7',  name: 'Jinga Biryani',  price: 250, desc: 'Jinga Biryani — Coastal freshness meets royal spice',     img: 'Image/Prawn-Biryani-Recipe-480x270.webp' },
  { id: 'p9',  name: 'Fish Biryani',   price: 250, desc: 'Fish Biryani — Coastal taste with royal spice',           img: 'Image/Fish-Masala1_1200x.jpg' },
  { id: 'p10', name: 'Chicken Masala', price: 220, desc: 'Every bite bursting with masala magic',                   img: 'Image/GrChicken-Masala-Curryoup-1.jpg' },
  { id: 'p11', name: 'Mutton Masala',  price: 300, desc: 'Mutton Masala — Spiced with tradition, served with love', img: 'Image/Mutton-Masala-min.jpg' },
  { id: 'p12', name: 'Jinga Masala',   price: 250, desc: 'Jinga Masala — Ocean freshness with desi spices',         img: 'Image/Prawn-Biryani-Recipe-480x270.webp' },
  { id: 'p13', name: 'Fish Masala',    price: 250, desc: 'Fish Masala — Ocean flavor with desi spice',              img: 'Image/Fish-Masala1_1200x.jpg' },
  { id: 'p14', name: 'Rotla',          price: 25,  desc: 'Soft, fresh & homely — just like Ghar ka Rotla',          img: 'Image/Bajri-Rotla-Kutch.png' },
  { id: 'p15', name: 'Rotli',          price: 15,  desc: 'Soft & fresh Rotli — the soul of every meal',             img: 'Image/roti.jpg' }
];

// ─── JSONBin helpers ───────────────────────────────────────────
async function fetchFromJSONBin() {
  const res  = await fetch(`${JSONBIN_URL}/latest`, {
    headers: { 'X-Master-Key': JSONBIN_API_KEY }
  });
  if (!res.ok) throw new Error(`JSONBin read failed: ${res.status}`);
  const json = await res.json();
  return json.record;
}

async function saveToJSONBin(products) {
  const res = await fetch(JSONBIN_URL, {
    method:  'PUT',
    headers: {
      'Content-Type':  'application/json',
      'X-Master-Key':  JSONBIN_API_KEY,
      'X-Bin-Versioning': 'false'   // overwrites, no version history spam
    },
    body: JSON.stringify(products)
  });
  if (!res.ok) throw new Error(`JSONBin write failed: ${res.status}`);
  return true;
}

// ─── Local file fallback helpers ──────────────────────────────
function readLocalProducts() {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(DEFAULT_PRODUCTS, null, 2), 'utf8');
      return DEFAULT_PRODUCTS;
    }
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    return Array.isArray(data) && data.length ? data : DEFAULT_PRODUCTS;
  } catch { return DEFAULT_PRODUCTS; }
}

function writeLocalProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (e) { console.warn('Local write failed:', e.message); }
}

// ─── Unified read/write ────────────────────────────────────────
async function getProducts() {
  if (USE_JSONBIN) {
    try {
      const data = await fetchFromJSONBin();
      const list = Array.isArray(data) ? data : (Array.isArray(data?.products) ? data.products : null);
      if (list && list.length) {
        writeLocalProducts(list); // keep local copy in sync
        return list;
      }
    } catch (e) {
      console.warn('JSONBin read error, using local:', e.message);
    }
  }
  return readLocalProducts();
}

async function putProducts(products) {
  writeLocalProducts(products); // always save locally
  if (USE_JSONBIN) {
    await saveToJSONBin(products); // save to cloud
  }
}

// ─── Routes ───────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({
    status:       'ok',
    jsonbin:      USE_JSONBIN,
    time:         new Date().toISOString()
  });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (e) {
    console.error('GET /api/products:', e.message);
    res.status(500).json({ error: 'Could not load products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const products = Array.isArray(req.body) ? req.body : [];
    if (!products.length) return res.status(400).json({ error: 'Empty list' });
    await putProducts(products);
    res.json({ success: true, count: products.length });
  } catch (e) {
    console.error('POST /api/products:', e.message);
    res.status(500).json({ error: 'Could not save products: ' + e.message });
  }
});

app.post('/api/upload-image', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file received' });
    res.json({ success: true, imagePath: `Image/${req.file.filename}` });
  });
});

// ─── OTP ──────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'replyotp252@gmail.com',
    pass: process.env.SMTP_PASS || 'dmzhwxtbbhcqzutk'
  }
});
const otpStore = new Map();

app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, { otp, expiryTime: Date.now() + 10 * 60 * 1000 });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to:   email,
      subject: 'OTP — Roshan Restaurant',
      html: `<h2 style="color:#d97706">Your OTP: <b style="font-size:2rem;letter-spacing:4px">${otp}</b></h2><p>Valid 10 minutes.</p>`
    });
    res.json({ success: true });
  } catch (e) {
    console.error('send-otp:', e.message);
    res.status(500).json({ error: 'OTP send failed' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });
  const stored = otpStore.get(email);
  if (!stored)                          return res.status(400).json({ error: 'No OTP found' });
  if (Date.now() > stored.expiryTime) { otpStore.delete(email); return res.status(400).json({ error: 'OTP expired' }); }
  if (stored.otp !== String(otp))       return res.status(400).json({ error: 'Wrong OTP' });
  otpStore.delete(email);
  res.json({ success: true });
});

// ─── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled:', err.message);
  res.status(500).json({ error: 'Server error' });
});

// ─── Start ────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Roshan Restaurant server started on port ${PORT}`);
  console.log(`📦 Storage: ${USE_JSONBIN ? '☁️  JSONBin (cloud — permanent)' : '💾 Local file only (changes lost on restart!)'}`);
  console.log(`🌐 Health: http://localhost:${PORT}/api/health\n`);
});
