# 📧 Email Setup Guide for OTP Feature

## 🎯 Overview

Your Smart Trip AI uses email to send OTP codes for user verification. This guide will help you set up email delivery in **2 minutes**.

---

## ⚡ Quick Setup (Gmail)

### Step 1: Enable 2-Step Verification

1. Go to: **https://myaccount.google.com/security**
2. Find "2-Step Verification"
3. Click "Get started" and follow instructions
4. ✅ Enable 2-Step Verification

### Step 2: Generate App Password

1. Go to: **https://myaccount.google.com/apppasswords**
   - (Or search "App passwords" in Google Account settings)
2. You'll be asked to sign in again
3. Select:
   - **App**: Mail
   - **Device**: Windows Computer (or your device)
4. Click **"Generate"**
5. You'll see a 16-character password like: `abcd wxyz 1234 5678`
6. ✅ **Copy this password** (remove spaces)

### Step 3: Update .env File

1. Open `backend/.env`
2. Update these lines:
   ```env
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_PASSWORD=abcdwxyz12345678
   ```
   (Replace with your email and the 16-char password)
3. Save the file

### Step 4: Restart the Server

```bash
# Stop the server (Ctrl+C)
# Then restart
npm start
```

✅ **Done! Your email is now configured!**

---

## 🧪 Testing

### Test Email Delivery:

1. Start the server: `npm start`
2. Register with a real email address
3. Check your inbox for the OTP
4. If not in inbox, check **Spam/Junk folder**

### Backend Console Output:

When a user registers, you should see:

```
============================================================
📧 OTP EMAIL DETAILS
============================================================
To: user@example.com
Name: John Doe
OTP: 123456
Expires: 10 minutes
============================================================

✅ OTP email sent successfully!
Message ID: <random-id@gmail.com>
Sent to: user@example.com
```

---

## 🔧 Troubleshooting

### Problem: "Email configuration error"

**Solution:**

- Make sure 2-Step Verification is enabled
- Use App Password, not your regular Gmail password
- Remove any spaces from the password
- Double-check EMAIL_USER is your full Gmail address

### Problem: "Invalid login"

**Solution:**

```env
# Wrong:
EMAIL_USER=myname
EMAIL_PASSWORD=my-regular-password

# Correct:
EMAIL_USER=myname@gmail.com
EMAIL_PASSWORD=abcdwxyz12345678
```

### Problem: OTP not in inbox

**Solution:**

1. Check Spam/Junk folder
2. Check Gmail "All Mail" folder
3. Wait 1-2 minutes (email delay)
4. Check backend console for email sent confirmation

### Problem: "Less secure app access"

**Solution:**

- ❌ Don't use "Less secure app access" (deprecated)
- ✅ Use App Password instead (more secure)

---

## 🛠️ Development Mode (No Email)

If you don't want to set up email right now, the system will work in **console mode**:

1. Leave `.env` as default:

   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password-here
   ```

2. When users register, the OTP will be printed in the **backend terminal**:

   ```
   ============================================================
   📧 OTP EMAIL DETAILS
   ============================================================
   To: user@example.com
   OTP: 123456
   ============================================================

   ⚠️  Email not sent (credentials not configured)
   💡 Use the OTP from console output above for testing
   ```

3. Copy the OTP from console and paste it in the verification screen

✅ **Perfect for development and testing!**

---

## 📧 Alternative: Using Other Email Services

### Using Outlook/Hotmail:

```javascript
// In backend/src/utils/emailService.js
const transporter = nodemailer.createTransporter({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Using Custom SMTP:

```javascript
const transporter = nodemailer.createTransporter({
  host: "smtp.your-email-provider.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

---

## ✅ Verification Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated (16 characters)
- [ ] EMAIL_USER updated in backend/.env
- [ ] EMAIL_PASSWORD updated in backend/.env
- [ ] Server restarted after .env changes
- [ ] Test registration with real email
- [ ] OTP received in inbox (or spam)

---

## 🎉 Success!

Once configured, your users will receive:

- ✅ Professional OTP emails
- ✅ Welcome emails after verification
- ✅ Beautiful HTML email templates
- ✅ 10-minute OTP expiry for security

---

## 💡 Tips

1. **Keep App Password secure** - Don't share it or commit it to Git
2. **Check spam folder** - First emails might go to spam
3. **Use real email for testing** - Don't use temporary/disposable emails
4. **Console logs always work** - Even without email setup, OTP is logged
5. **Restart after .env changes** - Environment variables need server restart

---

## 📞 Need Help?

If OTP emails still don't work after following this guide:

1. Check backend console for error messages
2. Verify 2-Step Verification is really enabled
3. Try generating a new App Password
4. Use console mode for testing
5. Check Gmail account for security alerts

**For testing purposes, you can always use the OTP from the console output!**

---

**Happy coding! 🚀**
