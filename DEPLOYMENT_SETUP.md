# Deployment Setup Guide for The11EximOverSeas

## Overview

This application is configured for deployment with:

- **Frontend**: Netlify (www.the11eximoverseas.com)
- **Backend**: Render (the11eximoverseas-backend.onrender.com)
- **Domain**: GoDaddy (www.the11eximoverseas.com)

## Prerequisites

- [x] Linting errors fixed
- [x] Build process tested and working
- [x] Configuration files updated for custom domain

## Frontend Deployment (Netlify)

### 1. Netlify Configuration

The `netlify.toml` file is configured with:

- Build command: `npm run build`
- Publish directory: `dist`
- Custom domain: `www.the11eximoverseas.com`
- Environment variables for production

### 2. Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`
4. Add custom domain: `www.the11eximoverseas.com`
5. Configure DNS in GoDaddy to point to Netlify

### 3. Environment Variables in Netlify

```
VITE_API_URL = https://the11eximoverseas-backend.onrender.com/api
VITE_APP_NAME = TrustGlobalExports
VITE_DOMAIN = www.the11eximoverseas.com
VITE_CANONICAL_URL = https://www.the11eximoverseas.com
VITE_GOOGLE_MAPS_API_KEY = API_KEY
```

## Backend Deployment (Render)

### 1. Render Configuration

The `render.yaml` file is configured with:

- Service type: Web
- Environment: Node.js
- Build command: `cd backend && npm install`
- Start command: `cd backend && npm start`
- CORS origin: `https://www.the11eximoverseas.com`

### 2. Deploy to Render

1. Connect your GitHub repository to Render
2. Use the `render.yaml` configuration file
3. The service will automatically deploy

### 3. Environment Variables in Render

```
NODE_ENV = production
PORT = 10000
CORS_ORIGIN = https://www.the11eximoverseas.com
MONGODB_URI = (from database)
SMTP_USER = the11eximoverseas@gmail.com
JWT_SECRET = (auto-generated)
```

## Domain Configuration (GoDaddy)

### 1. DNS Settings

Configure the following DNS records in GoDaddy:

**A Record:**

- Name: `@`
- Value: Netlify's IP address (get from Netlify)

**CNAME Record:**

- Name: `www`
- Value: `the11eximoverseas.netlify.app`

**CNAME Record (for API):**

- Name: `api`
- Value: `the11eximoverseas-backend.onrender.com`

### 2. SSL Certificate

- Netlify will automatically provision SSL for your custom domain
- Render provides SSL for the backend API

## Build Commands

### Frontend

```bash
npm run build          # Standard build
npm run build:production  # Production build with optimizations
```

### Backend

```bash
cd backend
npm install           # Install dependencies
npm start            # Start production server
```

## Verification Steps

1. **Frontend**: Visit `https://www.the11eximoverseas.com`
2. **Backend API**: Test `https://the11eximoverseas-backend.onrender.com/api/health`
3. **CORS**: Ensure frontend can communicate with backend
4. **SSL**: Verify HTTPS is working on both domains

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS_ORIGIN in Render matches your domain
2. **Build Failures**: Ensure all dependencies are installed
3. **Domain Not Working**: Check DNS propagation (can take 24-48 hours)
4. **SSL Issues**: Verify domain is properly configured in Netlify

### Debug Commands

```bash
npm run lint          # Check for linting errors
npm run type-check    # Check TypeScript types
npm run build         # Test build locally
npm run preview       # Preview built application
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to repository
2. **API Keys**: Store Google Maps API key securely
3. **CORS**: Properly configure CORS for production domain
4. **Rate Limiting**: Backend has rate limiting configured
5. **HTTPS**: Both frontend and backend use HTTPS

## Monitoring

- **Netlify**: Monitor build status and site performance
- **Render**: Monitor backend service health and logs
- **GoDaddy**: Monitor domain status and DNS propagation

## Next Steps

1. Deploy backend to Render first
2. Deploy frontend to Netlify
3. Configure custom domain in both services
4. Update DNS in GoDaddy
5. Test all functionality
6. Monitor for any issues
