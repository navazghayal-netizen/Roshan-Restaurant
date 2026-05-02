# Roshan Restaurant - Online Food Ordering System

A complete food ordering system with authentication, admin panel, and WhatsApp order integration.

## Features

✅ **User Authentication**
- Registration (Mobile, Email, Password)
- Login with email and password
- Forgot Password with OTP via email
- Secure user accounts

✅ **Admin Panel**
- Restricted admin access (Mobile: 9978349653, Password: roshan321)
- Add, edit, delete products
- Product image management
- Real-time inventory management

✅ **Customer Features**
- Browse products
- Add to cart functionality (requires login)
- Buy now option (requires login)
- Shopping cart management
- Checkout with delivery details
- Order history tracking

✅ **Order Management**
- WhatsApp integration for order placement
- Automatic order history
- Address saved for faster checkout

✅ **Email OTP System**
- Reset password with OTP
- SMTP email sending via Gmail
- 10-minute OTP expiry

## Project Structure

```
├── index.html              # Main website (with login required for shopping)
├── register.html           # User registration page
├── login.html              # User login page
├── admin.html              # Admin panel (products management)
├── admin-login.html        # Admin login page
├── server.js               # Backend server (Node.js)
├── package.json            # Node dependencies
├── .env                    # Environment variables
├── Image/                  # Product images folder
└── README.md               # This file
```

## Setup Instructions

### 1. **Local Development Setup**

#### Prerequisites
- Node.js (v14 or higher)
- npm
- Git

#### Installation

```bash
# Navigate to project directory
cd c:\web 2

# Install dependencies
npm install

# Start backend server
npm start
```

The server will run on `http://localhost:5000`

#### Frontend
Simply open `index.html` in your browser or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

### 2. **Admin Login Credentials**

- **Mobile**: 9978349653
- **Password**: roshan321

Access admin panel at: `admin-login.html` → `admin.html`

### 3. **Test User Account**

Create an account during registration, or use:
- **Email**: test@example.com
- **Password**: test123

### 4. **Email Configuration**

Currently configured with:
- **Email**: replyotp252@gmail.com
- **Password**: dmzhwxtbbhcqzutk (App-specific password)
- **Service**: Gmail SMTP

#### To use your own email:
1. Generate an App-specific password in your Gmail account
2. Update `.env` file:
   ```
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. Restart the server

## Deployment Guide

### Option 1: Vercel (Recommended for Backend)

#### Deploy Frontend (index.html, etc.)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Deploy (automatically builds and deploys)

#### Deploy Backend (server.js)
1. Go to Vercel → New Project
2. Select your repository
3. Set environment variables in Vercel dashboard:
   - `SMTP_USER=replyotp252@gmail.com`
   - `SMTP_PASS=dmzhwxtbbhcqzutk`

### Option 2: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set SMTP_USER=replyotp252@gmail.com
heroku config:set SMTP_PASS=dmzhwxtbbhcqzutk

# Deploy
git push heroku main
```

### Option 3: Self-Hosted (VPS/Cloud)

1. **Upload files to server** (via FTP/SSH)
2. **Install Node.js** on server
3. **Install PM2** for process management:
   ```bash
   npm install -g pm2
   ```
4. **Start server with PM2**:
   ```bash
   pm2 start server.js --name "roshan-restaurant"
   ```
5. **Configure web server** (Nginx/Apache):
   - Serve static files (HTML, CSS, JS, images)
   - Proxy API requests to Node.js server on port 5000

### Image Path Configuration

**Important**: Use relative paths for images to work on all deployments

```html
<!-- Correct -->
<img src="Image/photo.jpg" alt="Photo">

<!-- Avoid -->
<img src="/Image/photo.jpg" alt="Photo">
<img src="c:\web 2\Image\photo.jpg" alt="Photo">
```

All images are stored in the `Image/` folder in the root directory.

## API Endpoints

### Email OTP System

**Send OTP**
```
POST /api/send-otp
Content-Type: application/json

{
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Verify OTP**
```
POST /api/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "OTP verified successfully"
}
```

## User Roles

### Regular User
- Register and login
- Browse products
- Add to cart (login required)
- Make purchases
- View order history
- Reset password

### Admin User
- Access admin panel (mobile: 9978349653)
- Add/Edit/Delete products
- Manage inventory
- Upload product images
- View all orders

## Security Notes

⚠️ **Warning**: This is a demo application. For production:
1. Use proper password hashing (bcryptjs)
2. Implement JWT tokens
3. Use HTTPS only
4. Don't hardcode credentials
5. Add rate limiting
6. Implement CSRF protection
7. Add proper input validation

## Troubleshooting

### Images Not Loading
- Check that `Image/` folder exists in the same directory as HTML files
- Use relative paths: `Image/filename.jpg`
- Ensure image file names are correct

### Email OTP Not Sending
- Verify SMTP credentials in `.env`
- Check if Gmail "Less secure app access" is enabled (for testing)
- Use App-specific passwords for production Gmail accounts
- Check firewall/port 587 is open

### Admin Panel Not Accessible
- Verify you're using correct credentials (9978349653 / roshan321)
- Check browser console for errors
- Clear localStorage if having issues: `localStorage.clear()`

### Backend Server Not Connecting
- Ensure server is running: `npm start`
- Check if port 5000 is available
- Verify CORS settings in server.js

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers

## Dependencies

### Frontend
- Tailwind CSS (CDN)
- Vanilla JavaScript (No frameworks)

### Backend
- Express.js
- Nodemailer
- CORS
- Body Parser

## Contact & Support

**Restaurant Contact**: 📞 9978349653

For issues or questions about deployment, contact the development team.

---

**Last Updated**: May 2, 2026
**Version**: 1.0.0
