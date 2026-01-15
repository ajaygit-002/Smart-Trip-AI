# 🚀 Quick Start Guide - Smart Trip AI with Authentication

## ✅ What's Been Implemented

Your Smart Trip AI now has a complete authentication system with:

- ✅ User Registration with Email OTP Verification
- ✅ Login System
- ✅ Email Notifications (OTP + Welcome emails)
- ✅ Protected Routes (requires authentication)
- ✅ Session Management with JWT
- ✅ Beautiful Auth UI

---

## 🔧 Setup in 3 Steps

### Step 1: Configure Email (IMPORTANT!)

Edit `backend/.env` file and add your Gmail credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
```

**How to get Gmail App Password:**

1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Go to https://myaccount.google.com/apppasswords
4. Create app password for "Mail"
5. Copy the 16-character password

### Step 2: Start the Application

```bash
npm start
```

This will start:

- Backend (port 5000)
- Frontend (port 3000)
- ML Model (port 8000)

### Step 3: Register & Login

1. Open http://localhost:3000
2. You'll see the login/register page
3. Click "Register"
4. Fill in your details with **real email**
5. Check your email for 6-digit OTP
6. Enter OTP to verify
7. Start using the app!

---

## 📱 User Flow

```
1. Open App → Redirected to /auth
2. Register with email → OTP sent to email
3. Verify OTP → Account created
4. Welcome email sent → Auto login
5. Access home page → Browse attractions
```

---

## 🎯 Key Features

### Registration:

- Real-time validation
- Password strength check (min 6 chars)
- Travel preferences selection
- OTP via email (10-minute expiry)
- Beautiful gradient UI

### Login:

- Email/password authentication
- Automatic verification check
- JWT token-based sessions
- Remember user (localStorage)

### Security:

- Password hashing (bcrypt)
- Email verification required
- JWT tokens (7-day expiry)
- Protected routes
- Secure session management

---

## 🔐 API Endpoints

### Register User

```bash
POST http://localhost:5000/api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "preferences": ["museums", "beaches"]
}
```

### Verify OTP

```bash
POST http://localhost:5000/api/users/verify-otp
{
  "userId": "user_id",
  "otp": "123456"
}
```

### Resend OTP

```bash
POST http://localhost:5000/api/users/resend-otp
{
  "userId": "user_id"
}
```

### Login

```bash
POST http://localhost:5000/api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🧪 Testing

### Test Without Real Email (Development):

The OTP is logged in the backend console when generated. You can check there if you don't want to set up email yet.

### Test With Real Email:

1. Configure Gmail credentials in `.env`
2. Register with your real email
3. Check inbox (or spam) for OTP
4. Verify and start using

---

## 📂 File Structure

```
backend/
├── src/
│   ├── models/
│   │   └── User.js (Added: isVerified, otp, otpExpires)
│   ├── controllers/
│   │   └── userController.js (Added: verifyOTP, resendOTP)
│   ├── utils/
│   │   └── emailService.js (NEW - Email functionality)
│   └── routes/
│       └── userRoutes.js (Added OTP routes)
└── .env (Added EMAIL_USER, EMAIL_PASSWORD)

frontend/
├── src/
│   ├── pages/
│   │   └── AuthPage.js (NEW - Login/Register/OTP UI)
│   └── App.js (Updated with auth routes and protection)
```

---

## 🎨 UI Screenshots

### Login Page:

- Gradient background (blue → purple → pink)
- Clean white card design
- Email and password fields
- Toggle to register

### Register Page:

- Same beautiful design
- Name, email, password fields
- Travel preferences checkboxes
- Submit sends OTP

### OTP Verification:

- Email icon
- Large OTP input field
- Resend OTP button
- Back navigation

---

## ⚡ Quick Commands

```bash
# Start everything
npm start

# Create user via command line (backend folder)
node create-user.js "John Doe" john@example.com password123 "museums,parks"

# Check logs
# Backend logs show OTP when generated
# Check terminal output for any errors
```

---

## 🐛 Troubleshooting

**Problem: OTP not received**

- Check spam/junk folder
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- Check backend console for errors
- Make sure Gmail 2FA is enabled

**Problem: Can't login**

- Verify your email first (check inbox for OTP)
- Make sure password is correct
- Clear browser cache

**Problem: "Email not verified" error**

- Click resend OTP
- Verify using the OTP from email
- Or register again with same email

**Problem: Server not running**

- Run `npm start` from root directory
- Check MongoDB is running
- Check all ports are free (3000, 5000, 8000)

---

## 🎉 Success!

Your Smart Trip AI is now a complete, production-ready application with:

- ✅ Secure authentication
- ✅ Email verification
- ✅ Beautiful UI
- ✅ Protected routes
- ✅ Session management

**Next Steps:**

1. Configure your Gmail credentials
2. Run `npm start`
3. Open http://localhost:3000
4. Register and enjoy!

For detailed setup, see [AUTH_SETUP.md](AUTH_SETUP.md)

Happy traveling with Smart Trip AI! 🌍✈️🎊
