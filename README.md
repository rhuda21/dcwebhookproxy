# 🌐 Discord Proxy
A simple, lightweight, and easy-to-deploy Discord proxy that works with both Cloudflare Workers and Vercel Serverless Functions.

## ✨ Features
- **One-click deployment** to Cloudflare Workers or Vercel
- **Works with any Discord webhook** - just pass the ID and token
- **Works with any Discord API** 

## 🚀 Deploy in One Click - Ranked

| Platform | Deploy |
|----------|--------|
| **Cloudflare Workers** | [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rhuda21/dcproxy.git) |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frhuda21%2Fdcproxy.git) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/integration/start/deploy?repository=https://github.com/rhuda21/dcproxy.git) |

## 💻 Code - Standalone

```javascript
import http from "http";
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const webhookMatch = url.pathname.match(/^\/api\/webhooks\/(\d+)\/([^\/]+)/);
  const apiMatch = url.pathname.match(/^\/discord(\/.*)?$/);
  let targetUrl;
  if (webhookMatch) {
    targetUrl = `https://discord.com/api/webhooks/${webhookMatch[1]}/${webhookMatch[2]}`;
  } else if (apiMatch) {
    targetUrl = `https://discord.com/api${apiMatch[1] || ""}${url.search}`;
  } else {
    res.writeHead(200);
    return res.end("Use: /api/webhooks/ID/TOKEN or /discord/v10/...");
  }
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req : null,
  });
  const body = response.status === 204 ? "" : await response.text();
  res.writeHead(response.status);
  res.end(body);
}).listen(3000);
