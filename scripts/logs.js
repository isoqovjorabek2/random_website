#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dataDir = process.env.DATA_DIR || path.join(__dirname, '..');
const logFile = path.join(dataDir, 'visitors.json');

try {
  if (!fs.existsSync(logFile)) {
    console.log('No visitors logged yet.');
    process.exit(0);
  }
  const logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
  if (logs.length === 0) {
    console.log('No visitors logged yet.');
    process.exit(0);
  }
  console.log('\n  IP Address          Timestamp');
  console.log('  ' + '-'.repeat(45));
  logs.forEach(({ ip, timestamp }) => {
    const ts = new Date(timestamp).toLocaleString();
    console.log(`  ${ip.padEnd(18)} ${ts}`);
  });
  console.log('  ' + '-'.repeat(45));
  console.log(`  Total: ${logs.length} visit(s)\n`);
} catch (e) {
  console.error('Error reading logs:', e.message);
  process.exit(1);
}
