# Smart Trip AI - Authentication Setup

## 🎉 Authentication System Implemented!

Your Smart Trip AI now has a complete authentication system with:

✅ **User Registration with Email OTP Verification**
✅ **Login System**
✅ **Email Notifications**
✅ **Protected Routes**
✅ **Session Management**

---

## 📧 Email Configuration

### Setting up Gmail for OTP Emails:

1. **Enable 2-Step Verification** for your Gmail account:

   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**:

   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password

3. **Update `.env` file** in `/backend`:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   ```

---

## 🚀 How to Use

### 1. Start the Application:

```bash
npm start
```

### 2. Navigate to the App:

Open http://localhost:3000

### 3. Register a New User:

- Click "Register"
- Fill in your details
- Enter your real email address
- You'll receive a 6-digit OTP via email

### 4. Verify Email:

- Check your email for the OTP
- Enter the 6-digit code
- Click "Verify OTP"

### 5. Start Using:

- You'll be automatically logged in
- Explore tourist attractions
- Create itineraries
- Get crowd predictions

---

## 🔒 Features

### Registration Flow:

1. User enters name, email, password, and preferences
2. System sends 6-digit OTP to email
3. User verifies OTP
4. Account is created and user is logged in
5. Welcome email is sent

### Login Flow:

1. User enters email and password
2. System checks if email is verified
3. If not verified, prompts OTP verification
4. If verified, logs in and redirects to home

### Security:

- Passwords are hashed with bcrypt
- JWT tokens for session management
- OTP expires in 10 minutes
- Email verification required
- Protected routes

---

## 📝 API Endpoints

### POST `/api/users/register`

Register a new user and send OTP

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "preferences": ["museums", "beaches"]
}
```

### POST `/api/users/verify-otp`

Verify OTP and complete registration

```json
{
  "userId": "user_id",
  "otp": "123456"
}
```

### POST `/api/users/resend-otp`

Resend OTP if expired

```json
{
  "userId": "user_id"
}
```

### POST `/api/users/login`

Login with email and password

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🎨 UI Features

- Beautiful gradient design
- Responsive layout
- Real-time validation
- Loading states
- Error handling
- Success messages
- OTP input with auto-focus
- Resend OTP functionality

---

## 🔧 Testing Without Email (Optional)

If you want to test without setting up email, you can check the OTP in the backend console logs. The OTP is printed when generated.

---

## 📱 User Flow

```
┌─────────────┐
│   Visit App │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Auth Page  │◄────────┐
└──────┬──────┘         │
       │                │
       ├─►Register      │
       │   ├─►Enter details
       │   ├─►Receive OTP via email
       │   ├─►Verify OTP
       │   └─►Welcome email sent
       │
       └─►Login
           ├─►Enter credentials
           ├─►Check verification
           └─►Access home page
```

---

## 💡 Tips

1. Use a real email address for testing
2. Check spam folder if OTP doesn't arrive
3. OTP expires in 10 minutes
4. You can resend OTP if needed
5. Only verified users can login

---

## 🛠️ Troubleshooting

**OTP not received?**

- Check spam/junk folder
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Check backend console for errors
- Try resending OTP

**Can't login?**

- Make sure you verified your email
- Check password is correct
- Clear browser cache and try again

**Server errors?**

- Make sure MongoDB is running
- Check all services are started with `npm start`
- Verify .env file is configured

---

## 🎊 Ready to Go!

Your Smart Trip AI is now fully equipped with a professional authentication system. Users can securely register, verify their email, and access all features!

Enjoy your Smart Trip AI! 🌍✈️
