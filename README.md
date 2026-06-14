# ProHire Nexus

A full-stack job portal platform connecting job seekers with recruiters — featuring AI-powered career guidance, resume analysis, and seamless job application management.

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Node.js, Express 5, TypeScript (microservices architecture)
- **Database:** PostgreSQL (Neon Serverless)
- **Messaging:** Apache Kafka
- **Caching:** Redis
- **Payments:** Razorpay
- **AI:** Google GenAI
- **Storage:** Cloudinary

## Project Structure

```
ProHire Nexus/
├── frontend/          # Next.js frontend application
└── services/
    ├── auth/          # Authentication service (port 5000)
    ├── job/           # Job management service (port 5003)
    ├── payment/       # Payment & subscription service (port 5004)
    ├── user/          # User management service (port 5002)
    └── utils/         # Utility service - email, uploads, AI (port 5001)
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (or Neon DB)
- Redis
- Apache Kafka

### Installation

```bash
# Install frontend dependencies
cd frontend && npm install

# Install service dependencies
cd services/auth && npm install
cd services/job && npm install
cd services/payment && npm install
cd services/user && npm install
cd services/utils && npm install
```

### Running the Project

Start each service in a separate terminal:

```bash
# Frontend (http://localhost:3000)
cd frontend && npm run dev

# Backend services
cd services/auth && npm run dev
cd services/job && npm run dev
cd services/payment && npm run dev
cd services/user && npm run dev
cd services/utils && npm run dev
```

## Features

- **Job Listings** — Browse, search, and filter jobs by title and location
- **Easy Apply** — One-click job applications for job seekers
- **Company Profiles** — Recruiters can create companies and post jobs
- **AI Career Guidance** — Get personalized career recommendations based on your skills
- **AI Resume Analyzer** — Instant ATS compatibility analysis for your resume
- **Premium Subscriptions** — Priority application placement via Razorpay
- **Email Notifications** — Automated status updates via Kafka + Nodemailer
- **Dark Mode** — Full dark/light theme support
