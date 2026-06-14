# 🚀 ProHire Nexus - Complete Startup Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js 18+ installed (`node --version`)
- ✅ All `.env` files configured in each service folder
- ✅ PostgreSQL database (Neon) accessible
- ✅ Redis instance running
- ✅ Apache Kafka running locally or accessible

---

## 🔧 Step 1: Install Dependencies

Open **PowerShell** or **Command Prompt** and run these commands:

```powershell
# Go to project root
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus"

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install auth service
cd services\auth
npm install
cd ..\..

# Install job service
cd services\job
npm install
cd ..\..

# Install payment service
cd services\payment
npm install
cd ..\..

# Install user service
cd services\user
npm install
cd ..\..

# Install utils service
cd services\utils
npm install
cd ..\..
```

---

## 🏃 Step 2: Start Services (Open 6 Terminal Windows)

**IMPORTANT:** Start services in this order in separate terminals:

### Terminal 1: Utils Service (Port 5001)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\services\utils"
npm run dev
```

✅ **Wait for:** `Utils Service is running on http://localhost:5001`

---

### Terminal 2: Auth Service (Port 5000)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\services\auth"
npm run dev
```

✅ **Wait for:** `✅ connected to kafka producer` and `Auth service is running`

---

### Terminal 3: User Service (Port 5002)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\services\user"
npm run dev
```

✅ **Wait for:** `User service is running on http://localhost:5002`

---

### Terminal 4: Job Service (Port 5003)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\services\job"
npm run dev
```

✅ **Wait for:** `Job service is running on http://localhost:5003`

---

### Terminal 5: Payment Service (Port 5004)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\services\payment"
npm run dev
```

✅ **Wait for:** `Payment Service is running on http://localhost:5004`

---

### Terminal 6: Frontend (Port 3000)

```powershell
cd "C:\Users\Satvik\OneDrive\Desktop\Chai\ProHire Nexus\frontend"
npm run dev
```

✅ **Wait for:** `▲ Next.js 16.0.2`

---

## 🌐 Access the Application

Once all services are running:

- **Frontend:** http://localhost:3000
- **Backend Services:**
  - Auth: http://localhost:5000
  - Utils: http://localhost:5001
  - User: http://localhost:5002
  - Job: http://localhost:5003
  - Payment: http://localhost:5004

---

## 📝 Testing Features

### 1. **Sign Up (Fixed)**

- Go to http://localhost:3000
- Click "Register"
- Choose role: "Job Seeker" or "Recruiter"
- Upload resume (if job seeker)
- Submit ✅

### 2. **Resume Analysis (Fixed)**

- After signup/login
- Go to home page
- Scroll to "Resume Analyzer"
- Upload a PDF resume
- Click "Analyze"
- View ATS score and recommendations ✅

### 3. **Career Guidance**

- Home page → "Career Guide"
- Enter your skills (comma-separated)
- Get AI-powered career recommendations

### 4. **Browse & Apply Jobs**

- Navigate to `/jobs`
- Apply to jobs
- View applications in profile

---

## ⚠️ Troubleshooting

### Issue: "Cannot GET /api/..."

**Solution:** Ensure all services are running in order (Utils → Auth → User → Job → Payment)

### Issue: "Resume analysis fails"

**Solution:**

- Ensure API_KEY_GEMINI is valid in services/utils/.env
- Resume must be PDF format, max 5MB

### Issue: "Signup fails"

**Solution:**

- Ensure auth service is running on port 5000
- Check that database connection is working
- Verify JWT_SEC is same in all services

### Issue: "Cannot connect to Kafka"

**Solution:**

- If Kafka not running locally, update Kafka_Broker in .env files
- Or install Kafka locally on port 9092

### Issue: "Database errors"

**Solution:**

- Verify DB_URL in .env is correct and accessible
- Ensure Neon DB URL has `?sslmode=require&channel_binding=require`

---

## 🔄 Restart Services

If something breaks, restart in reverse order:

1. Stop Frontend
2. Stop Payment Service
3. Stop Job Service
4. Stop User Service
5. Stop Auth Service
6. Stop Utils Service

Then start again from Step 2.

---

## 📦 Environment Files Summary

Each service already has `.env` configured:

| Service  | Port | File      |
| -------- | ---- | --------- |
| Frontend | 3000 | N/A       |
| Auth     | 5000 | `.env` ✅ |
| Utils    | 5001 | `.env` ✅ |
| User     | 5002 | `.env` ✅ |
| Job      | 5003 | `.env` ✅ |
| Payment  | 5004 | `.env` ✅ |

---

## ✅ All Features Ready

- ✅ User Authentication & JWT
- ✅ Resume Upload & Storage
- ✅ Career Guidance with AI
- ✅ Job Posting & Applications
- ✅ Payment Processing (Razorpay)
- ✅ Email Notifications (Kafka)
- ✅ Dark Mode Support

**Happy coding! 🎉**
