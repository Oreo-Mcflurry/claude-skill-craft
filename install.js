#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");

const COMMANDS_DIR = path.join(os.homedir(), ".claude", "commands");
const REFS_DIR = path.join(os.homedir(), ".claude", "commands", "skill-craft-references");

const COMMANDS = ["skill-create.md", "skill-review.md"];
const REFERENCES = [
  "five-rules.md",
  "description-patterns.md",
  "body-template.md",
  "review-checklist.md",
];

try {
  // Install commands
  fs.mkdirSync(COMMANDS_DIR, { recursive: true });
  for (const cmd of COMMANDS) {
    const src = path.join(__dirname, "commands", cmd);
    if (!fs.existsSync(src)) {
      console.log(`[skill-craft] Source not found: ${cmd}, skipping.`);
      continue;
    }
    fs.copyFileSync(src, path.join(COMMANDS_DIR, cmd));
  }
  console.log(`[skill-craft] Installed /skill-create and /skill-review commands`);

  // Install references
  fs.mkdirSync(REFS_DIR, { recursive: true });
  for (const ref of REFERENCES) {
    const src = path.join(__dirname, "references", ref);
    if (!fs.existsSync(src)) {
      console.log(`[skill-craft] Reference not found: ${ref}, skipping.`);
      continue;
    }
    fs.copyFileSync(src, path.join(REFS_DIR, ref));
  }
  console.log(`[skill-craft] Installed ${REFERENCES.length} reference files`);

  // Show snippet info
  const snippetPath = path.join(__dirname, "claude-md-snippet.md");
  if (fs.existsSync(snippetPath)) {
    console.log("");
    console.log("[skill-craft] For auto-detection (optional), add to your CLAUDE.md:");
    console.log(`  cat ${snippetPath}`);
  }

  console.log("");
  console.log("[skill-craft] Usage:");
  console.log("  /skill-create <description of skill you want to build>");
  console.log("  /skill-review <path to existing skill or skill name>");
} catch (err) {
  console.error("[skill-craft] Install failed:", err.message);
  process.exit(0);
}
