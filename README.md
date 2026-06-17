# ProHire Nexus

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-CC0000?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)](https://kafka.apache.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Razorpay](https://img.shields.io/badge/Razorpay-0B72E7?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

**ProHire Nexus** is a full-stack, microservice-based job portal built to connect job seekers and recruiters in one intelligent platform.  
It combines job discovery, application management, ATS resume analysis, AI-powered career guidance, asynchronous email notifications, and premium subscriptions.

Developed and maintained by **[Satvik Jambagi](https://github.com/7vik2005?tab=repositories)**.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [AI and Integration Flows](#ai-and-integration-flows)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [License](#license)

---

## Overview

ProHire Nexus is designed as a decoupled system where each backend service owns a focused responsibility. The frontend consumes these services through clean HTTP APIs, while supporting systems such as Redis, Kafka, Cloudinary, Gemini, and Razorpay power caching, automation, AI, storage, and payments.

This architecture keeps the platform modular, scalable, and easy to extend.

---

## Key Features

- **Job portal for both seekers and recruiters** with separate flows for profile management, company creation, job posting, and applications.
- **AI-powered career guidance** using Gemini to recommend next roles, learning paths, and skill gaps.
- **ATS resume analysis** to evaluate resume quality, structure, and keyword alignment.
- **Asynchronous email notifications** through Kafka and Nodemailer.
- **Premium subscriptions** secured with Razorpay payment verification.
- **Cloudinary-based media handling** for resumes, profile pictures, and company logos.
- **Redis-backed session caching** for faster auth/session validation.
- **Microservice architecture** with independent services for auth, users, jobs, payments, and utilities.

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI

### Backend
- Node.js
- Express 5
- TypeScript

### Data and Infrastructure
- PostgreSQL on Neon Serverless
- Redis on Upstash
- Apache Kafka
- Cloudinary
- Gmail SMTP
- Razorpay
- Google Gemini AI

---

## Architecture

### High-level flow

```mermaid
graph TD
    Client["Next.js Client (Port 3000)"]

    Client -->|HTTP| Auth["Auth Service (Port 5000)"]
    Client -->|HTTP| Utils["Utils Service (Port 5001)"]
    Client -->|HTTP| User["User Service (Port 5002)"]
    Client -->|HTTP| Job["Job Service (Port 5003)"]
    Client -->|HTTP| Payment["Payment Service (Port 5004)"]

    Auth --> DB[("PostgreSQL / Neon")]
    Utils --> DB
    User --> DB
    Job --> DB
    Payment --> DB

    Auth --> Redis[("Redis / Upstash")]
    Job --> Kafka["Apache Kafka"]
    Kafka --> Utils

    Utils --> Gemini["Google Gemini AI"]
    Utils --> Cloudinary["Cloudinary"]
    Utils --> SMTP["Gmail SMTP"]

    Payment --> Razorpay["Razorpay API"]
```

### Service responsibilities

- **Auth Service**: registration, login, password reset, JWT/session handling.
- **User Service**: profile management, resume upload, skill mapping, job applications.
- **Job Service**: company management, job posting, job browsing, application review.
- **Utils Service**: file uploads, AI career guidance, ATS analysis, email consumption.
- **Payment Service**: checkout creation and payment verification.

---

## Repository Structure

```text
ProHire Nexus/
├── frontend/                 # Next.js client application
│   └── src/
│       ├── app/              # App Router pages and layouts
│       ├── components/       # Shared UI components
│       └── context/          # Client-side state and API wrappers
└── services/
    ├── auth/                 # Authentication service
    ├── utils/                # AI, upload, and email service
    ├── user/                 # User profile and application service
    ├── job/                  # Company and job listing service
    └── payment/              # Razorpay payment service
```

---

## Database Design

The services create and use a shared PostgreSQL schema.

### Core entities

- **users**: stores profile, auth, resume, profile picture, and subscription data.
- **skills**: master list of skills.
- **user_skills**: many-to-many mapping between users and skills.
- **companies**: recruiter-managed company profiles.
- **jobs**: job listings posted by companies.
- **applications**: job applications submitted by users.

### ENUMs

- `user_role`: `jobseeker`, `recruiter`
- `job_type`: `Full-time`, `Part-time`, `Contract`, `Internship`
- `work_location`: `On-site`, `Remote`, `Hybrid`
- `application_status`: `Submitted`, `Rejected`, `Hired`

---

## API Endpoints

### Auth Service (`:5000`)
- `POST /api/auth/register` — create a new user account
- `POST /api/auth/login` — authenticate a user and issue a JWT
- `POST /api/auth/forgot` — generate a password reset token
- `POST /api/auth/reset/:token` — reset password using token

### User Service (`:5002`)
- `GET /api/user/me` — fetch logged-in user profile
- `GET /api/user/:userId` — fetch public profile by ID
- `PUT /api/user/update/profile` — update name, phone number, and bio
- `PUT /api/user/update/pic` — update profile picture
- `PUT /api/user/update/resume` — upload or replace resume
- `POST /api/user/skill/add` — add a skill to a user
- `PUT /api/user/skill/delete` — remove a skill from a user
- `POST /api/user/apply/job` — apply to a job
- `GET /api/user/application/all` — list the user’s applications

### Job Service (`:5003`)
- `POST /api/job/company/new` — create a company
- `DELETE /api/job/company/:companyId` — delete a company
- `POST /api/job/new` — create a job listing
- `PUT /api/job/:jobId` — update a job listing
- `GET /api/job/company/all` — list all companies
- `GET /api/job/company/:id` — get company details
- `GET /api/job/all` — list active jobs with search support
- `GET /api/job/:jobId` — get a specific job
- `GET /api/job/application/:jobId` — list applicants for a job
- `PUT /api/job/application/update/:id` — update application status and trigger notification

### Utils Service (`:5001`)
- `POST /api/utils/upload` — upload files to Cloudinary
- `POST /api/utils/career` — generate AI career guidance
- `POST /api/utils/resume-analyser` — generate ATS resume analysis

### Payment Service (`:5004`)
- `POST /api/payment/checkout` — create a Razorpay order
- `POST /api/payment/verify` — verify payment signature and activate subscription

---

## AI and Integration Flows

### Gemini-powered career guidance
The utils service takes a user’s skills and career context, then returns a structured recommendation payload with role suggestions, skill gaps, and learning advice.

### ATS resume analysis
The resume analyzer processes PDF resumes and produces a structured evaluation containing:
- ATS score
- score breakdown
- strengths
- suggestions
- summary

### Kafka-based email delivery
When job applications are updated or user events occur, the job service publishes an email event to Kafka. The utils service consumes the message and sends the email through Gmail SMTP.

### Razorpay subscription flow
1. A checkout order is created in the payment service.
2. The frontend opens the Razorpay checkout window.
3. Razorpay returns payment confirmation fields.
4. The payment service validates the signature with HMAC SHA256.
5. The user’s subscription is updated on success.

---

## Setup and Installation

### Prerequisites

Make sure you have:

- Node.js v18 or above
- Git
- PostgreSQL or a Neon Serverless database
- Redis (local or Upstash)
- Apache Kafka
- Cloudinary account
- Google Gemini API key
- Gmail account with App Password
- Razorpay account and test credentials

### Clone the repository

```bash
git clone https://github.com/7vik2005/ProHire-Nexus.git
cd ProHire-Nexus
```

### Install dependencies

```bash
# Frontend
cd frontend
npm install
cd ..

# Auth service
cd services/auth
npm install
cd ../..

# Utils service
cd services/utils
npm install
cd ../..

# User service
cd services/user
npm install
cd ../..

# Job service
cd services/job
npm install
cd ../..

# Payment service
cd services/payment
npm install
cd ../..
```

### Run the project

Open separate terminals and start each service:

```bash
# Frontend
cd frontend
npm run dev

# Auth
cd services/auth
npm run dev

# Utils
cd services/utils
npm run dev

# User
cd services/user
npm run dev

# Job
cd services/job
npm run dev

# Payment
cd services/payment
npm run dev
```

---

## Environment Variables

Create `.env` files for each service.

### `services/auth/.env`
```env
PORT=5000
DB_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST/DB_NAME?sslmode=require
UPLOAD_SERVICE=http://localhost:5001
JWT_SEC=your_jwt_secret_key_here
Kafka_Broker=localhost:9092
Frontend_Url=http://localhost:3000
Redis_url=rediss://default:REDIS_PASSWORD@REDIS_HOST:REDIS_PORT
```

### `services/utils/.env`
```env
PORT=5001
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
Kafka_Broker=localhost:9092
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_gmail_app_password
API_KEY_GEMINI=your_gemini_api_key
```

### `services/user/.env`
```env
PORT=5002
DB_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST/DB_NAME?sslmode=require
UPLOAD_SERVICE=http://localhost:5001
JWT_SEC=your_jwt_secret_key_here
```

### `services/job/.env`
```env
PORT=5003
DB_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST/DB_NAME?sslmode=require
UPLOAD_SERVICE=http://localhost:5001
JWT_SEC=your_jwt_secret_key_here
Kafka_Broker=localhost:9092
```

### `services/payment/.env`
```env
PORT=5004
Razorpay_Key=rzp_test_your_razorpay_key
Razorpay_Secret=your_razorpay_secret
DB_URL=postgresql://DB_USER:DB_PASSWORD@DB_HOST/DB_NAME?sslmode=require
JWT_SEC=your_jwt_secret_key_here
```

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.
