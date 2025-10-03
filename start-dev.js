#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting 11 EXIM Overseas Development Environment...\n");

// Start backend
console.log("📡 Starting backend server...");
const backend = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true,
});

// Start frontend
console.log("🎨 Starting frontend development server...");
const frontend = spawn("npm", ["run", "dev"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down development servers...");
  backend.kill("SIGINT");
  frontend.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down development servers...");
  backend.kill("SIGTERM");
  frontend.kill("SIGTERM");
  process.exit(0);
});

// Handle errors
backend.on("error", (err) => {
  console.error("❌ Backend error:", err);
});

frontend.on("error", (err) => {
  console.error("❌ Frontend error:", err);
});

console.log("✅ Development environment started!");
console.log("📱 Frontend: http://localhost:5173");
console.log("🔧 Backend: http://localhost:5000");
console.log("📊 API Health: http://localhost:5000/api/health");
console.log("\nPress Ctrl+C to stop all servers\n");
