# Prank Website (Educational)

A simple prank website that shows a fake "security alert" and logs visitor IP addresses for **educational purposes** (learning how web servers capture client info).

## ⚠️ Disclaimer

- For educational use only. Do not use to collect data without proper consent/disclosure.
- IP addresses may be considered personal data under GDPR and similar laws.
- Use responsibly and ethically.

## Setup

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## How It Works

1. **Frontend**: Shows a fake "CRITICAL SECURITY ALERT" that looks scary but is harmless. Click "FIX NOW" or wait 5 seconds to see the prank reveal.
2. **Backend**: Logs each visitor's IP address (and timestamp) to `visitors.json` when they load the page.

## View Logged IPs

Visit `http://localhost:3000/admin/logs` to see the collected visitor data (JSON).

## Docker Deployment

Build and run:

```bash
docker build -t prank-site .
docker run -d -p 3000:3000 -e DATA_DIR=/data -v prank-data:/data --name prank prank-site
```

Or with Docker Compose:

```bash
docker compose up -d
```

The `visitor-data` volume persists `visitors.json` across container restarts. On your server, open port 3000 (or put it behind nginx as a reverse proxy).

**View IPs from terminal:**

```bash
# Local
npm run logs

# Docker
docker compose exec prank-site npm run logs
```

## Files

- `server.js` - Express server with IP logging middleware
- `public/index.html` - Prank frontend
- `visitors.json` - Created automatically, stores logged IPs
- `Dockerfile` - Docker image definition
