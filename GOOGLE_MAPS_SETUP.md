# Google Maps API Setup Guide

This guide helps you configure Google Maps API key to fix the "This page can't load Google Maps correctly" error.

## 🚨 Current Issue

The error "This page can't load Google Maps correctly" with "Do you own this website?" typically occurs due to:

1. **API Key Domain Restrictions** - The API key is restricted to specific domains
2. **API Key Not Enabled** - Required APIs are not enabled
3. **Billing Not Set Up** - Google Maps requires billing to be enabled
4. **API Quota Exceeded** - Daily quota has been exceeded

## 🔧 Solution Steps

### Step 1: Check Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select Your Project** (or create a new one)
3. **Navigate to APIs & Services > Credentials**
4. **Find your API key**: `AIzaSyDoy4xd7POgSrkLzxi8Z3b5DT4nrDA-zmw`

### Step 2: Configure API Key Restrictions

1. **Click on your API key** to edit it
2. **Application restrictions**:
   - Select "HTTP referrers (web sites)"
   - Add these domains:
     ```
     localhost:5173/*
     localhost:3000/*
     *.netlify.app/*
     *.onrender.com/*
     the11eximoverseas.netlify.app/*
     the11eximoverseas-staging.netlify.app/*
     the11eximoverseas-uat.netlify.app/*
     ```

### Step 3: Enable Required APIs

1. **Go to APIs & Services > Library**
2. **Enable these APIs**:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Maps Embed API

### Step 4: Set Up Billing

1. **Go to Billing** in Google Cloud Console
2. **Link a billing account** (required for Maps API)
3. **Add a payment method**

### Step 5: Check API Quotas

1. **Go to APIs & Services > Quotas**
2. **Check Maps JavaScript API quotas**
3. **Increase limits if needed**

## 🔄 Alternative Solution: Use Fallback

If you can't fix the API key immediately, the application now includes a fallback:

- **Fallback Content**: Shows location info with "Open in Google Maps" link
- **No Error Display**: Users see a clean location card instead of error
- **Direct Link**: Clicking opens Google Maps in a new tab

## 🧪 Testing the Fix

### Local Testing

```bash
# Start development server
npm run dev

# Check browser console for:
# "Google Maps: Script loaded successfully"
# "Google Maps: Map initialized successfully"
```

### Production Testing

1. **Deploy to Netlify**
2. **Check if maps load correctly**
3. **Verify no console errors**

## 🔐 Security Best Practices

### API Key Security

- **Restrict by Domain**: Only allow specific domains
- **Restrict by API**: Only enable required APIs
- **Monitor Usage**: Check quotas and usage regularly
- **Rotate Keys**: Change keys periodically

### Environment Variables

```bash
# Development
VITE_GOOGLE_MAPS_API_KEY=API_KEY

# Production
VITE_GOOGLE_MAPS_API_KEY=API_KEY
```

## 🚨 Troubleshooting

### Common Issues

1. **"This page can't load Google Maps correctly"**

   - Check domain restrictions
   - Verify API is enabled
   - Check billing is set up

2. **"For development purposes only"**

   - Add your domain to restrictions
   - Enable billing

3. **"API key not valid"**

   - Check API key is correct
   - Verify APIs are enabled

4. **"Quota exceeded"**
   - Check usage in Google Cloud Console
   - Increase quotas if needed

### Debug Steps

1. **Check Browser Console**:

   ```javascript
   // Look for these messages:
   "Google Maps: Using API key: AIzaSyDoy4...";
   "Google Maps: Script loaded successfully";
   "Google Maps: Map initialized successfully";
   ```

2. **Test API Key Directly**:

   ```html
   <!-- Test in browser -->
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
   ```

3. **Check Network Tab**:
   - Look for failed requests to Google Maps API
   - Check response status codes

## 📊 Monitoring

### Google Cloud Console

- **APIs & Services > Dashboard**: View API usage
- **Billing**: Monitor costs
- **Quotas**: Check limits and usage

### Application Logs

- **Browser Console**: Check for JavaScript errors
- **Network Tab**: Monitor API requests
- **Application**: Check if fallback is shown

## 🔄 Fallback Implementation

The application now includes a robust fallback system:

```javascript
// Fallback content when maps fail to load
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center;">
  <div style="font-size: 24px; margin-bottom: 10px;">📍</div>
  <div style="font-weight: 600; margin-bottom: 5px;">${markerTitle}</div>
  <div style="color: #6b7280; font-size: 14px;">
    Lat: ${center.lat.toFixed(6)}, Lng: ${center.lng.toFixed(6)}
  </div>
  <div style="color: #6b7280; font-size: 12px; margin-top: 10px;">
    <a
      href="https://maps.google.com/?q=${center.lat},${center.lng}"
      target="_blank"
      style="color: #3b82f6; text-decoration: none;"
    >
      Open in Google Maps
    </a>
  </div>
</div>
```

## 📞 Support

If you continue to have issues:

1. **Check Google Cloud Console** for API status
2. **Verify billing** is set up correctly
3. **Test with a new API key** if needed
4. **Contact Google Support** for API issues

The application will work with or without Google Maps - users will see a clean location card as fallback.
