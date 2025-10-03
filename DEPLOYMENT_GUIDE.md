# Deployment Guide for The11EximOverSeas

This guide covers deploying the frontend to Netlify and backend to Render.

## 🚀 Frontend Deployment (Netlify)

### Prerequisites

- Netlify account
- GitHub repository connected to Netlify

### Environment Variables for Netlify

Set these in Netlify Dashboard > Site Settings > Environment Variables:

```
VITE_API_URL=https://the11eximoverseas-backend.onrender.com/api
VITE_APP_NAME=TrustGlobalExports Ventures
VITE_APP_VERSION=1.0.0
VITE_CONTACT_EMAIL=EMAIL
VITE_CONTACT_PHONE_PRIMARY=XXXXXXXXXX
VITE_CONTACT_PHONE_SECONDARY=XXXXXXXXXXX
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
VITE_GOOGLE_MAPS_API_KEY=API_KEY
```

### Deployment Steps

1. **Connect Repository**: Connect your GitHub repo to Netlify
2. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Environment Variables**: Add all variables listed above
4. **Deploy**: Click "Deploy site"

### Custom Domain (Optional)

- Go to Domain Management in Netlify
- Add your custom domain
- Update CORS_ORIGIN in backend accordingly

## 🔧 Backend Deployment (Render)

### Prerequisites

- Render account
- MongoDB Atlas account (for database)

### Environment Variables for Render

Set these in Render Dashboard > Service > Environment:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/the11eximoverseas
SMTP_USER=the11eximoverseas@gmail.com
SMTP_PASS=your-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
ADMIN_EMAIL=the11eximoverseas@gmail.com
CORS_ORIGIN=https://the11eximoverseas.netlify.app
JWT_SECRET=your-jwt-secret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Deployment Steps

1. **Create Web Service**:
   - Connect GitHub repository
   - Select "Web Service"
2. **Build Settings**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
3. **Environment Variables**: Add all variables listed above
4. **Database**: Create MongoDB database in Render or use MongoDB Atlas
5. **Deploy**: Click "Create Web Service"

## 📁 Project Structure

```
the11eximoverseas/
├── src/                    # Frontend source code
├── backend/               # Backend source code
├── dist/                  # Frontend build output
├── netlify.toml          # Netlify configuration
├── render.yaml           # Render configuration
├── env.example           # Environment variables template
└── package.json          # Frontend dependencies
```

## 🔄 Deployment Workflow

### 1. Frontend (Netlify)

- **Automatic**: Deploys on every push to main branch
- **Manual**: Trigger deployment from Netlify dashboard
- **Preview**: Deploy previews for pull requests

### 2. Backend (Render)

- **Automatic**: Deploys on every push to main branch
- **Manual**: Trigger deployment from Render dashboard
- **Logs**: Available in Render dashboard

## 🌐 URLs After Deployment

- **Frontend**: https://the11eximoverseas.netlify.app
- **Backend API**: https://the11eximoverseas-backend.onrender.com
- **API Health Check**: https://the11eximoverseas-backend.onrender.com/api/health

## 🔧 Local Development

### Frontend

```bash
# Install dependencies
npm install

# Create .env.local file with:
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=API_KEY

# Start development server
npm run dev
```

### Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with:
MONGODB_URI=your-mongodb-uri
SMTP_USER=the11eximoverseas@gmail.com
SMTP_PASS=your-app-password
# ... other variables

# Start development server
npm start
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Check CORS_ORIGIN in backend matches frontend URL
   - Ensure both services are deployed

2. **Google Maps Not Loading**

   - Verify VITE_GOOGLE_MAPS_API_KEY is set correctly
   - Check browser console for API key errors
   - Ensure API key has correct domain restrictions

3. **API Connection Issues**

   - Verify VITE_API_URL points to correct backend URL
   - Check backend is running and accessible
   - Test API health endpoint

4. **Email Not Sending**
   - Verify SMTP credentials are correct
   - Check Gmail app password is used (not regular password)
   - Ensure SMTP settings match Gmail requirements

### Debugging Steps

1. **Check Logs**:

   - Frontend: Browser console
   - Backend: Render dashboard logs

2. **Test Endpoints**:

   - Health check: `/api/health`
   - API info: `/api`

3. **Environment Variables**:
   - Verify all required variables are set
   - Check variable values are correct

## 📝 Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] Google Maps displays correctly
- [ ] Contact form submits successfully
- [ ] Quote form submits successfully
- [ ] API endpoints respond correctly
- [ ] Email notifications work
- [ ] All pages load properly
- [ ] Mobile responsiveness works
- [ ] SEO meta tags are correct

## 🔐 Security Notes

- Never commit .env files to repository
- Use environment variables for all sensitive data
- Regularly rotate API keys and passwords
- Monitor logs for suspicious activity
- Keep dependencies updated

## 📞 Support

For deployment issues:

- Check Netlify/Render documentation
- Review application logs
- Test locally first
- Contact development team
