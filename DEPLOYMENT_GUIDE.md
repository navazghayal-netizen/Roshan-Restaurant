# Roshan Restaurant - Complete Deployment Guide

## Quick Start (Local Testing)

### 1. Install Backend Dependencies
```bash
cd c:\web 2
npm install
```

### 2. Start Backend Server
```bash
npm start
```
Server will start on `http://localhost:5000`

### 3. Serve Frontend
Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Open `http://localhost:8000` in your browser

---

## Complete User Flow

### Registration (New User)
1. Click "Register" button on homepage
2. Enter:
   - Mobile Number: 10 digits
   - Email: Valid email address
   - Password: At least 6 characters
3. Click "Create Account"
4. Redirected to homepage (logged in)

### Login (Existing User)
1. Click "Login" button on homepage
2. Enter Email and Password
3. Click "Sign In"
4. Redirected to homepage (logged in)

### Forgot Password
1. Click "Sign in" → "Forgot Password?"
2. Enter email address
3. System sends OTP (check email or console for demo)
4. Enter OTP received
5. Set new password
6. Login with new password

### Shopping
1. **Login Required** - Must be logged in to shop
2. Click "Add" → Item added to cart (visible as number on cart icon)
3. Click "Buy" → Checkout form opens
4. Enter delivery details:
   - Name
   - Mobile
   - Address
5. Review order summary
6. Send to WhatsApp (automatically opens WhatsApp with order details)
7. Order saved to history

### Order History
1. Click "Orders" button in navbar
2. View all previous orders
3. See order details, items, and totals

### Admin Panel
1. Go to `admin-login.html`
2. Login with:
   - Mobile: 9978349653
   - Password: roshan321
3. Admin dashboard opens with:
   - Product management form
   - Product list
   - Options to add/edit/delete products
4. Click "Logout" to exit admin panel

---

## Important Credentials

### Admin Login
- **Mobile**: 9978349653
- **Password**: roshan321
- **Access**: `/admin-login.html` → `/admin.html`

### Email Configuration
- **Email**: replyotp252@gmail.com
- **Password**: dmzhwxtbbhcqzutk

### WhatsApp Integration
- **Restaurant Number**: 919978349653
- Orders are sent via WhatsApp to this number

---

## File Structure & What Each File Does

### Frontend Files
| File | Purpose |
|------|---------|
| `index.html` | Main website with products & shopping cart |
| `register.html` | User registration form |
| `login.html` | User login & forgot password |
| `admin.html` | Admin panel for product management |
| `admin-login.html` | Admin authentication |

### Backend Files
| File | Purpose |
|------|---------|
| `server.js` | Express server for email OTP |
| `package.json` | Node dependencies |
| `.env` | Configuration (email, admin credentials) |

### Folder
| Folder | Purpose |
|--------|---------|
| `Image/` | Store product images here |

---

## Deployment Steps (All in One)

### Step 1: Prepare Code
```bash
# Ensure all files are ready
- index.html
- register.html
- login.html
- admin.html
- admin-login.html
- server.js
- package.json
- .env
- README.md
- Image/ folder with product images
```

### Step 2: Test Locally First
```bash
# Install dependencies
npm install

# Start server
npm start

# Open browser
http://localhost:8000
```

### Step 3: Deploy Backend to Cloud

#### Option A: Vercel (Easiest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

#### Option B: Heroku
```bash
# Login
heroku login

# Create app
heroku create your-restaurant-app

# Deploy
git push heroku main
```

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add environment variables
4. Deploy

### Step 4: Deploy Frontend

#### Option A: Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Deploy

#### Option B: Netlify
1. Go to netlify.com
2. Drag and drop your files
3. Deploy

#### Option C: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy
firebase deploy
```

---

## Environment Variables Setup

Create `.env` file in project root:

```env
PORT=5000
SMTP_USER=replyotp252@gmail.com
SMTP_PASS=dmzhwxtbbhcqzutk
ADMIN_MOBILE=9978349653
ADMIN_PASSWORD=roshan321
```

For deployment, set these in your hosting platform's dashboard.

---

## Image Path Configuration (CRITICAL!)

**Use relative paths - NOT absolute paths**

```javascript
// ✅ CORRECT - Works on all deployments
<img src="Image/product.jpg">

// ❌ WRONG - Won't work after deployment
<img src="/Image/product.jpg">
<img src="c:\web 2\Image\product.jpg">
<img src="file:///c:/web 2/Image/product.jpg">
```

All images must be:
1. In the `Image/` folder
2. Referenced as `Image/filename.jpg`
3. No leading slashes

---

## Testing Checklist

- [ ] User can register
- [ ] User can login
- [ ] Forgot password sends OTP
- [ ] User can reset password
- [ ] Add to cart requires login
- [ ] Buy now requires login
- [ ] Cart displays correct items
- [ ] Checkout accepts delivery details
- [ ] Order sends to WhatsApp
- [ ] Admin can login with 9978349653/roshan321
- [ ] Admin can add products
- [ ] Admin can edit products
- [ ] Admin can delete products
- [ ] Products display with correct images
- [ ] Order history shows all orders
- [ ] Images load correctly on all pages
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works

---

## Troubleshooting

### Images Not Showing
- Check `Image/` folder exists
- Check image filenames match exactly
- Use relative paths: `Image/filename.jpg`
- Open browser console (F12) for errors

### Backend Not Responding
- Check if server is running
- Verify port 5000 is available
- Check firewall settings
- Restart server: `npm start`

### Email OTP Not Working
- Verify SMTP credentials
- Check email service allows SMTP
- For Gmail: use App-specific password
- Check port 587 is open

### Admin Panel Access Denied
- Verify credentials: 9978349653 / roshan321
- Check localStorage: `localStorage.clear()`
- Try incognito/private browser

### Cart Not Working After Login
- Refresh page
- Clear cookies and cache
- Check browser console for errors
- Ensure JavaScript is enabled

---

## Production Checklist

- [ ] Use HTTPS only
- [ ] Update admin password
- [ ] Update SMTP credentials
- [ ] Update WhatsApp number
- [ ] Enable email verification
- [ ] Add rate limiting
- [ ] Add CSRF protection
- [ ] Use password hashing
- [ ] Set up monitoring
- [ ] Regular backups
- [ ] SSL certificate configured
- [ ] Database configured (if using)

---

## Support

For issues:
1. Check browser console (F12)
2. Check server logs
3. Review README.md
4. Check email configuration
5. Verify credentials

**Contact**: 📞 9978349653

---

**Version**: 1.0.0
**Last Updated**: May 2, 2026
