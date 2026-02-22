#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");

const COMMANDS_DIR = path.join(os.homedir(), ".claude", "commands");
const REFS_DIR = path.join(COMMANDS_DIR, "skill-craft-references");

const COMMANDS = ["skill-create.md", "skill-review.md"];

try {
  // Remove commands
  for (const cmd of COMMANDS) {
    const dest = path.join(COMMANDS_DIR, cmd);
    if (fs.existsSync(dest)) {
      fs.unlinkSync(dest);
      console.log(`[skill-craft] Removed ${cmd}`);
    }
  }

  // Remove references directory
  if (fs.existsSync(REFS_DIR)) {
    fs.rmSync(REFS_DIR, { recursive: true });
    console.log("[skill-craft] Removed reference files");
  }

  console.log("[skill-craft] Uninstall complete.");
  console.log("[skill-craft] If you added the auto-detection snippet to CLAUDE.md, remove it manually.");
} catch (err) {
  console.error("[skill-craft] Uninstall failed:", err.message);
  process.exit(0);
}
