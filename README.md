# 🌐 Discord Webhook Proxy

A simple, lightweight, and easy-to-deploy Discord webhook proxy that works with both Cloudflare Workers and Vercel Serverless Functions.

## ✨ Features
- **One-click deployment** to Cloudflare Workers or Vercel
- **Works with any Discord webhook** - just pass the ID and token

## 🚀 Deploy in One Click - Ranked

| Platform | Deploy |
|----------|--------|
| **Cloudflare Workers** | [![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rhuda21/dcwebhookproxy.git) |
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frhuda21%2Fdcwebhookproxy.git) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/integration/start/deploy?repository=https://github.com/rhuda21/dcwebhookproxy.git) |

## 💻 Code

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/api\/webhooks\/(\d+)\/([^\/]+)/);
    
    return match 
      ? await fetch(`https://discord.com/api/webhooks/${match[1]}/${match[2]}`, {
          method: request.method,
          headers: request.headers,
          body: request.body
        })
      : new Response('Use: /api/webhooks/ID/TOKEN');
  }
}
