#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Environment Setup...\n');

// Test 1: Check if environment files exist
console.log('1. Checking environment files:');
const envFiles = [
  'env.development',
  'env.staging', 
  'env.uat',
  'env.production',
  'backend/env.development',
  'backend/env.staging',
  'backend/env.uat',
  'backend/env.production'
];

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - Missing`);
  }
});

// Test 2: Check if .env files can be created
console.log('\n2. Testing .env file creation:');
try {
  // Test frontend .env
  if (fs.existsSync('env.development')) {
    fs.copyFileSync('env.development', '.env');
    console.log('   ✅ Created .env from env.development');
  }
  
  // Test backend .env
  if (fs.existsSync('backend/env.development')) {
    fs.copyFileSync('backend/env.development', 'backend/.env');
    console.log('   ✅ Created backend/.env from backend/env.development');
  }
} catch (error) {
  console.log(`   ❌ Error creating .env files: ${error.message}`);
}

// Test 3: Check Google Maps API key
console.log('\n3. Checking Google Maps API key:');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const apiKeyMatch = envContent.match(/VITE_GOOGLE_MAPS_API_KEY=(.+)/);
  if (apiKeyMatch) {
    const apiKey = apiKeyMatch[1];
    console.log(`   ✅ API Key found: ${apiKey.substring(0, 10)}...`);
    console.log(`   📝 Key length: ${apiKey.length} characters`);
  } else {
    console.log('   ❌ VITE_GOOGLE_MAPS_API_KEY not found in .env');
  }
} catch (error) {
  console.log(`   ❌ Error reading .env: ${error.message}`);
}

// Test 4: Check render.yaml
console.log('\n4. Checking render.yaml:');
try {
  const renderContent = fs.readFileSync('render.yaml', 'utf8');
  const yaml = require('js-yaml');
  const doc = yaml.load(renderContent);
  
  if (doc.services && doc.services.length > 0) {
    console.log(`   ✅ Services: ${doc.services.length}`);
    console.log(`   ✅ Service name: ${doc.services[0].name}`);
  }
  
  if (doc.databases && doc.databases.length > 0) {
    console.log(`   ✅ Databases: ${doc.databases.length}`);
    console.log(`   ✅ Database name: ${doc.databases[0].name}`);
  }
} catch (error) {
  console.log(`   ❌ Error parsing render.yaml: ${error.message}`);
}

// Test 5: Check netlify.toml
console.log('\n5. Checking netlify.toml:');
try {
  const netlifyContent = fs.readFileSync('netlify.toml', 'utf8');
  if (netlifyContent.includes('VITE_GOOGLE_MAPS_API_KEY')) {
    console.log('   ✅ Google Maps API key configured in netlify.toml');
  } else {
    console.log('   ❌ Google Maps API key not found in netlify.toml');
  }
} catch (error) {
  console.log(`   ❌ Error reading netlify.toml: ${error.message}`);
}

console.log('\n🎉 Environment test complete!');
console.log('\n📝 Next steps:');
console.log('1. Fix Google Maps API key domain restrictions in Google Cloud Console');
console.log('2. Test the application: npm run dev');
console.log('3. Check browser console for Google Maps errors');
console.log('4. Deploy to test the production setup');
