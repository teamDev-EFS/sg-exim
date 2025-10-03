# Environment Management Guide

This guide covers all environment configurations for The11EximOverSeas application.

## 📁 Environment Files Structure

```
the11eximoverseas/
├── env.development          # Frontend - Development
├── env.staging             # Frontend - Staging
├── env.uat                 # Frontend - UAT
├── env.production          # Frontend - Production
├── backend/
│   ├── env.development     # Backend - Development
│   ├── env.staging         # Backend - Staging
│   ├── env.uat             # Backend - UAT
│   └── env.production      # Backend - Production
├── netlify.toml            # Netlify - Production
├── netlify.staging.toml    # Netlify - Staging
├── netlify.uat.toml        # Netlify - UAT
├── render.yaml             # Render - Production
├── render.staging.yaml     # Render - Staging
└── render.uat.yaml         # Render - UAT
```

## 🚀 Quick Start

### Switch Environment

```bash
# Switch to development
node switch-env.js development

# Switch to staging
node switch-env.js staging

# Switch to UAT
node switch-env.js uat

# Switch to production
node switch-env.js production
```

### Manual Setup

```bash
# Copy environment file to .env
cp env.development .env
cp backend/env.development backend/.env
```

## 🌍 Environment Details

### Development

- **Frontend URL**: http://localhost:5173
- **Backend URL**: http://localhost:5000
- **Database**: Local MongoDB
- **Debug**: Enabled
- **Analytics**: Disabled

### Staging

- **Frontend URL**: https://the11eximoverseas-staging.netlify.app
- **Backend URL**: https://the11eximoverseas-backend-staging.onrender.com
- **Database**: MongoDB Atlas (staging)
- **Debug**: Enabled
- **Analytics**: Enabled

### UAT (User Acceptance Testing)

- **Frontend URL**: https://the11eximoverseas-uat.netlify.app
- **Backend URL**: https://the11eximoverseas-backend-uat.onrender.com
- **Database**: MongoDB Atlas (UAT)
- **Debug**: Enabled
- **Analytics**: Enabled

### Production

- **Frontend URL**: https://the11eximoverseas.netlify.app
- **Backend URL**: https://the11eximoverseas-backend.onrender.com
- **Database**: MongoDB Atlas (production)
- **Debug**: Disabled
- **Analytics**: Enabled

## 🔧 Environment Variables

### Frontend Variables (All Environments)

```bash
VITE_API_URL=                    # Backend API URL
VITE_APP_NAME=                   # Application name
VITE_APP_VERSION=                # Application version
VITE_CONTACT_EMAIL=              # Contact email
VITE_CONTACT_PHONE_PRIMARY=      # Primary phone
VITE_CONTACT_PHONE_SECONDARY=    # Secondary phone
VITE_ENABLE_ANALYTICS=           # Analytics enabled
VITE_ENABLE_DEBUG=               # Debug mode
VITE_GOOGLE_MAPS_API_KEY=        # Google Maps API key
```

### Backend Variables (All Environments)

```bash
NODE_ENV=                        # Environment name
PORT=                            # Server port
MONGODB_URI=                     # MongoDB connection string
SMTP_USER=                       # Email username
SMTP_PASS=                       # Email password
SMTP_HOST=                       # SMTP host
SMTP_PORT=                       # SMTP port
ADMIN_EMAIL=                     # Admin email
CORS_ORIGIN=                     # Allowed frontend origin
JWT_SECRET=                      # JWT secret key
RATE_LIMIT_WINDOW_MS=            # Rate limit window
RATE_LIMIT_MAX_REQUESTS=         # Max requests per window
```

## 🚀 Deployment Process

### 1. Development

```bash
# Switch to development
node switch-env.js development

# Start development servers
npm run dev              # Frontend
cd backend && npm start  # Backend
```

### 2. Staging Deployment

```bash
# Deploy to staging
# Frontend: Use netlify.staging.toml
# Backend: Use render.staging.yaml
```

### 3. UAT Deployment

```bash
# Deploy to UAT
# Frontend: Use netlify.uat.toml
# Backend: Use render.uat.yaml
```

### 4. Production Deployment

```bash
# Deploy to production
# Frontend: Use netlify.toml
# Backend: Use render.yaml
```

## 🔐 Security Considerations

### Environment-Specific Security

- **Development**: Debug enabled, local database
- **Staging**: Debug enabled, separate database
- **UAT**: Debug enabled, separate database
- **Production**: Debug disabled, production database

### Secrets Management

- **Database Passwords**: Different for each environment
- **JWT Secrets**: Unique for each environment
- **API Keys**: Same key, different domain restrictions
- **Email Passwords**: Same Gmail app password

## 📊 Environment Monitoring

### Health Checks

- **Frontend**: Check if app loads without errors
- **Backend**: `/api/health` endpoint
- **Database**: Connection status
- **Email**: SMTP connectivity

### Logs

- **Frontend**: Browser console, Netlify logs
- **Backend**: Render dashboard logs
- **Database**: MongoDB Atlas logs

## 🔄 Environment Switching

### Automatic Switching

```bash
# Use the switch script
node switch-env.js <environment>
```

### Manual Switching

```bash
# Copy specific environment file
cp env.development .env
cp backend/env.development backend/.env
```

### Verification

```bash
# Check current environment
cat .env | grep NODE_ENV
cat backend/.env | grep NODE_ENV
```

## 🚨 Troubleshooting

### Common Issues

1. **Environment not switching**: Check file permissions
2. **Variables not loading**: Restart development server
3. **Database connection**: Verify MongoDB URI
4. **CORS errors**: Check CORS_ORIGIN setting

### Debug Steps

1. **Check current environment**: `node switch-env.js --help`
2. **Verify files exist**: Check all env.\* files
3. **Test API connection**: Use health check endpoint
4. **Check logs**: Review console and server logs

## 📝 Environment Checklist

### Before Deployment

- [ ] Environment files created
- [ ] Database URIs updated
- [ ] Email passwords set
- [ ] CORS origins configured
- [ ] API keys valid
- [ ] JWT secrets generated

### After Deployment

- [ ] Health checks pass
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connected
- [ ] Email sending works
- [ ] Google Maps loads

## 🔧 Customization

### Adding New Environment

1. Create `env.<name>` files
2. Create deployment configs
3. Update switch script
4. Test deployment

### Modifying Variables

1. Edit environment files
2. Switch to environment
3. Restart servers
4. Test changes

## 📞 Support

For environment issues:

- Check this guide first
- Review environment files
- Test locally before deploying
- Contact development team
