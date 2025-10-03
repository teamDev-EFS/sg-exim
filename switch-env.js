#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const environments = ["development", "staging", "uat", "production"];

function showHelp() {
  console.log("🚀 Environment Switcher for The11EximOverSeas\n");
  console.log("Usage: node switch-env.js <environment>");
  console.log("\nAvailable environments:");
  environments.forEach((env) => {
    console.log(`  - ${env}`);
  });
  console.log("\nExample: node switch-env.js development");
}

function switchEnvironment(env) {
  if (!environments.includes(env)) {
    console.error(`❌ Invalid environment: ${env}`);
    showHelp();
    process.exit(1);
  }

  console.log(`🔄 Switching to ${env} environment...\n`);

  try {
    // Frontend environment
    const frontendEnvFile = `env.${env}`;
    const frontendTarget = ".env";

    if (fs.existsSync(frontendEnvFile)) {
      fs.copyFileSync(frontendEnvFile, frontendTarget);
      console.log(
        `✅ Frontend: Copied ${frontendEnvFile} to ${frontendTarget}`
      );
    } else {
      console.log(`⚠️  Frontend: ${frontendEnvFile} not found`);
    }

    // Backend environment
    const backendEnvFile = `backend/env.${env}`;
    const backendTarget = "backend/.env";

    if (fs.existsSync(backendEnvFile)) {
      fs.copyFileSync(backendEnvFile, backendTarget);
      console.log(`✅ Backend: Copied ${backendEnvFile} to ${backendTarget}`);
    } else {
      console.log(`⚠️  Backend: ${backendEnvFile} not found`);
    }

    console.log(`\n🎉 Successfully switched to ${env} environment!`);
    console.log("\n📝 Next steps:");
    console.log("1. Update database URIs and passwords in the .env files");
    console.log("2. Restart your development servers");
    console.log("3. Test the application");
  } catch (error) {
    console.error("❌ Error switching environment:", error.message);
    process.exit(1);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  showHelp();
} else {
  switchEnvironment(args[0]);
}
