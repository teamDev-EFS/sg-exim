# Deployment Guide - The11EximOverSeas Ventures

This guide covers deploying the frontend to Netlify and backend to Render with production-ready configurations.

## 🚀 Frontend Deployment (Netlify)

### Prerequisites

- Netlify account
- GitHub repository with your code
- Node.js 18+ installed locally

### Steps

1. **Connect Repository to Netlify**

   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Select the repository

2. **Build Settings**

   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18

3. **Environment Variables**
   Set these in Netlify Dashboard > Site settings > Environment variables:

   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   VITE_APP_NAME=The11EximOverSeas Ventures
   VITE_CONTACT_EMAIL=trustglobalexports@gmail.com
   VITE_CONTACT_PHONE_PRIMARY=+91 9xxxxxxxxx
   VITE_CONTACT_PHONE_SECONDARY=+91 9xxxxxxxxxx
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Your site will be available at `https://your-site-name.netlify.app`

## 🔧 Backend Deployment (Render)

### Prerequisites

- Render account
- MongoDB Atlas account (already configured)
- GitHub repository

### Steps

1. **Create New Web Service**

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" > "Web Service"
   - Connect your GitHub repository

2. **Service Configuration**

   - **Name**: `the11eximoverseas-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free (or upgrade as needed)

3. **Environment Variables**
   Set these in Render Dashboard > Environment:

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://the11eximuser:TjNy5QpiJu%23E%40%25S@cluster-namasteexim.kwpijax.mongodb.net/the11eximoverseas?retryWrites=true&w=majority&appName=Cluster-namasteexim
   SMTP_USER=the11eximoverseas@gmail.com
   SMTP_PASS=ygio vunt hlca peel
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ADMIN_EMAIL=the11eximoverseas@gmail.com
   CORS_ORIGIN=https://your-frontend-url.netlify.app
   JWT_SECRET=your-super-secret-jwt-key
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your backend
   - Your API will be available at `https://your-service-name.onrender.com`

## 🔗 Connect Frontend to Backend

1. **Update Frontend Environment**

   - In Netlify, update `VITE_API_URL` to your Render backend URL
   - Redeploy the frontend

2. **Test the Connection**
   - Visit your Netlify site
   - Test the contact form and document preview
   - Check browser console for any CORS errors

## 📱 Mobile Optimization

The application is fully responsive and optimized for:

- **Mobile phones** (320px - 640px)
- **Tablets** (641px - 1024px)
- **Laptops** (1025px - 1440px)
- **Desktops** (1441px+)

### Mobile Features

- Touch-friendly buttons with `touch-manipulation`
- Responsive PDF modal with proper scaling
- Optimized loading states and error handling
- Smooth animations and transitions

## 🔒 Security Features

### Frontend Security

- Content Security Policy (CSP) headers
- XSS protection
- Frame options protection
- Secure PDF viewing without download controls

### Backend Security

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- Secure MongoDB connection

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure `CORS_ORIGIN` in backend matches your frontend URL
   - Check that both URLs use HTTPS in production

2. **PDF Not Loading**

   - Verify PDF files are in the `public/documents/` directory
   - Check browser console for 404 errors
   - Ensure PDF files are accessible via direct URL

3. **Email Not Sending**

   - Verify SMTP credentials in backend environment
   - Check Render logs for email errors
   - Ensure Gmail app password is correct

4. **Mobile Issues**
   - Test on actual devices, not just browser dev tools
   - Check touch events and scrolling
   - Verify responsive breakpoints

### Debug Mode

Set `VITE_ENABLE_DEBUG=true` in frontend environment for detailed logging.

## 📊 Monitoring

### Frontend (Netlify)

- Build logs in Netlify dashboard
- Function logs for serverless functions
- Analytics and performance metrics

### Backend (Render)

- Service logs in Render dashboard
- Health check endpoints
- Performance monitoring

## 🔄 Updates and Maintenance

### Frontend Updates

1. Push changes to GitHub
2. Netlify automatically rebuilds and deploys
3. Check deployment status in Netlify dashboard

### Backend Updates

1. Push changes to GitHub
2. Render automatically rebuilds and deploys
3. Check deployment status in Render dashboard

### Database Updates

- MongoDB Atlas handles automatic scaling
- Monitor usage in MongoDB Atlas dashboard
- Set up alerts for storage and performance

## 📞 Support

For deployment issues:

- Check the logs in respective dashboards
- Verify environment variables
- Test locally first before deploying
- Contact support if issues persist

---

**Production URLs:**

- Frontend: `https://your-site-name.netlify.app`
- Backend: `https://your-service-name.onrender.com`
- Database: MongoDB Atlas (managed)
