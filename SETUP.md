# 11 EXIM Overseas - Setup Instructions

## Project Overview

This is a full-stack application for 11 EXIM Overseas, an export-import company specializing in agricultural products and international trade.

## Frontend (React + TypeScript + Vite)

- **Location**: Root directory
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Backend (Node.js + Express + MongoDB)

- **Location**: `backend/` directory
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## Setup Instructions

### 1. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration:
# SMTP_USER=the11eximoverseas@gmail.com
# SMTP_PASS=your-app-password
# ADMIN_EMAIL=the11eximoverseas@gmail.com
# MONGODB_URI=mongodb+srv://the11eximuser:TjNy5QpiJu%23E%40%25S@cluster-namasteexim.kwpijax.mongodb.net/the11eximoverseas?retryWrites=true&w=majority&appName=Cluster-namasteexim

# Start development server
npm run dev

# Start production server
npm start
```

### 3. Environment Variables

#### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)

```
SMTP_USER=the11eximoverseas@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=the11eximoverseas@gmail.com
MONGODB_URI=mongodb+srv://the11eximuser:TjNy5QpiJu%23E%40%25S@cluster-namasteexim.kwpijax.mongodb.net/the11eximoverseas?retryWrites=true&w=majority&appName=Cluster-namasteexim
```

## Features Implemented

### Documents Page

- ✅ Shows only the 3 actual PDF documents from `src/assets/documents/`
- ✅ Secure PDF preview with download/screenshot protection
- ✅ Professional document cards with proper categorization
- ✅ Search and filter functionality

### Team Page

- ✅ Updated with correct team members: Hukam Chand Gupta (Director) and Yawal Gupta (Director)
- ✅ Uses actual images from `src/assets/images/`
- ✅ Professional team member profiles with detailed information
- ✅ Responsive design with modal details

### Backend API

- ✅ RESTful API endpoints for documents and team data
- ✅ Contact form submission with email notifications
- ✅ Quote request handling
- ✅ Database integration with MongoDB
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Error handling and validation

## File Structure

```
├── src/
│   ├── assets/
│   │   ├── documents/          # PDF documents (3 files)
│   │   └── images/            # Team member images (2 files)
│   ├── components/            # Reusable React components
│   ├── pages/                # Page components
│   │   ├── Documents.tsx     # Documents page with secure preview
│   │   └── Team.tsx          # Team page with director profiles
│   └── services/
│       └── api.ts            # API service layer
├── backend/
│   ├── config/
│   │   └── db.js            # Database configuration
│   ├── server.js            # Express server with API endpoints
│   └── package.json         # Backend dependencies
└── package.json             # Frontend dependencies
```

## Security Features

- PDF documents are protected from downloading and screenshots
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers

## Development Notes

- The PDF preview uses iframe with disabled interactions for security
- Team member data is synchronized between frontend and backend
- Email notifications are sent for contact forms and quote requests
- All API responses follow a consistent format with success/error handling
