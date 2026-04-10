# Secure Password Manager with MFA

This repository contains a full-stack secure password manager using:

- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, AES encryption, Nodemailer
- Frontend: React, Vite, Tailwind CSS, Axios

## Structure

- `backend/` - Express API server
- `frontend/` - React app

## Setup

### Backend

1. Open terminal in `backend/`
2. Copy `.env.example` to `.env`
3. Fill in `MONGO_URI`, `JWT_SECRET`, `AES_SECRET` and email SMTP fields
4. Install dependencies:

```bash
cd backend
npm install
```

5. Start the backend server:

```bash
npm run dev
```

### Frontend

1. Open terminal in `frontend/`
2. Copy `.env.example` to `.env`
3. Install dependencies:

```bash
cd frontend
npm install
```

4. Start the frontend:

```bash
npm run dev
```

## Notes

- The frontend expects the backend API at `http://localhost:5000/api` by default.
- Passwords stored in MongoDB are encrypted with AES-256 and decrypted only by the API layer.
- Login uses email-based OTP verification for multi-factor authentication.
