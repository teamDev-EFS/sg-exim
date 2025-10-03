# Google Maps Billing Setup Guide

This guide helps you fix the `BillingNotEnabledMapError` by enabling billing for your Google Cloud project.

## 🚨 Current Error

**Error**: `BillingNotEnabledMapError`  
**Cause**: Google Maps API requires billing to be enabled for your Google Cloud project  
**Solution**: Enable billing and add a payment method

## 🔧 Step-by-Step Fix

### Step 1: Access Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Sign in** with your Google account
3. **Select your project** (or create a new one if needed)

### Step 2: Enable Billing

1. **Navigate to Billing**:

   - Click the hamburger menu (☰) in the top-left
   - Select "Billing" from the menu
   - Or go directly: https://console.cloud.google.com/billing

2. **Link a Billing Account**:

   - Click "Link a billing account"
   - If you don't have one, click "Create billing account"
   - Follow the prompts to set up billing

3. **Add Payment Method**:
   - Add a credit/debit card
   - Or use other payment methods available in your region
   - **Note**: Google provides $200 free credits for new accounts

### Step 3: Enable Required APIs

1. **Go to APIs & Services > Library**:

   - https://console.cloud.google.com/apis/library

2. **Enable these APIs** (search for each):

   - **Maps JavaScript API** - Required for map display
   - **Places API** - Required for place search
   - **Geocoding API** - Required for address conversion
   - **Maps Embed API** - Required for embedded maps

3. **Click "Enable"** for each API

### Step 4: Configure API Key

1. **Go to APIs & Services > Credentials**:

   - https://console.cloud.google.com/apis/credentials

2. **Find your API key**: `AIzaSyDoy4xd7POgSrkLzxi8Z3b5DT4nrDA-zmw`

3. **Click on the API key** to edit it

4. **Set Application Restrictions**:

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

5. **Set API Restrictions**:

   - Select "Restrict key"
   - Choose "Maps JavaScript API" and "Places API"

6. **Save** the changes

### Step 5: Test the Fix

1. **Wait 5-10 minutes** for changes to propagate
2. **Test locally**:
   ```bash
   npm run dev
   ```
3. **Check browser console** for success messages:
   - "Google Maps: Script loaded successfully"
   - "Google Maps: Map initialized successfully"

## 💰 Cost Information

### Free Tier Limits

- **Maps JavaScript API**: 28,000 map loads per month
- **Places API**: 1,000 requests per month
- **Geocoding API**: 40,000 requests per month

### Pricing (After Free Tier)

- **Maps JavaScript API**: $7 per 1,000 map loads
- **Places API**: $17 per 1,000 requests
- **Geocoding API**: $5 per 1,000 requests

### Cost Management

- **Set up billing alerts** to monitor usage
- **Set daily quotas** to prevent unexpected charges
- **Monitor usage** in the Google Cloud Console

## 🔄 Fallback Implementation

The application now includes a billing-aware fallback:

```javascript
// When billing is not enabled, users see:
<div style="background: #fef3c7; border: 1px solid #f59e0b;">
  <div>⚠️</div>
  <div>Google Maps requires billing to be enabled</div>
  <div>Location: Lat: 22.7196, Lng: 75.8577</div>
  <a href="https://maps.google.com/?q=22.7196,75.8577">Open in Google Maps</a>
</div>
```

## 🧪 Testing the Fix

### Local Testing

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
# Check Contact page for map display
# Check browser console for success messages
```

### Production Testing

1. **Deploy to Netlify**
2. **Check if maps load correctly**
3. **Verify no billing errors in console**

## 🚨 Troubleshooting

### Common Issues

1. **"BillingNotEnabledMapError"**

   - **Solution**: Enable billing in Google Cloud Console
   - **Time**: Changes take 5-10 minutes to propagate

2. **"API key not valid"**

   - **Solution**: Check API key restrictions and enabled APIs
   - **Verify**: Key is enabled for your domain

3. **"Quota exceeded"**

   - **Solution**: Check usage in Google Cloud Console
   - **Increase**: Quotas if needed

4. **"For development purposes only"**
   - **Solution**: Add your domain to API key restrictions
   - **Verify**: Billing is enabled

### Debug Steps

1. **Check Google Cloud Console**:

   - Billing status
   - API enablement
   - API key restrictions

2. **Check Browser Console**:

   ```javascript
   // Look for these messages:
   "Google Maps: Using API key: AIzaSyDoy4...";
   "Google Maps: Script loaded successfully";
   "Google Maps: Map initialized successfully";
   ```

3. **Test API Key Directly**:
   ```html
   <!-- Test in browser -->
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
   ```

## 📊 Monitoring

### Google Cloud Console

- **Billing**: Monitor costs and usage
- **APIs & Services > Dashboard**: View API usage
- **APIs & Services > Quotas**: Check limits

### Application

- **Browser Console**: Check for errors
- **Network Tab**: Monitor API requests
- **Fallback Display**: Check if fallback is shown

## 🔐 Security Best Practices

### API Key Security

- **Restrict by Domain**: Only allow specific domains
- **Restrict by API**: Only enable required APIs
- **Monitor Usage**: Check quotas and usage regularly
- **Rotate Keys**: Change keys periodically

### Cost Management

- **Set Alerts**: Get notified when approaching limits
- **Set Quotas**: Prevent unexpected charges
- **Monitor Usage**: Check usage regularly

## 📞 Support

### Google Support

- **Google Cloud Support**: https://cloud.google.com/support
- **Maps API Documentation**: https://developers.google.com/maps/documentation
- **Billing Support**: Available in Google Cloud Console

### Application Support

- **Fallback System**: Works without Google Maps
- **Direct Links**: Users can open maps in new tab
- **Error Handling**: Clear error messages for users

## ✅ Success Checklist

- [ ] Billing enabled in Google Cloud Console
- [ ] Payment method added
- [ ] Required APIs enabled
- [ ] API key restrictions configured
- [ ] Domain restrictions set
- [ ] Tested locally
- [ ] Tested in production
- [ ] Monitoring set up
- [ ] Cost alerts configured

The application will work with or without Google Maps - users will see a clean location card as fallback if billing is not enabled.
