export default {
  async fetch(request) {
    const url = new URL(request.url);
    const webhookMatch = url.pathname.match(/^\/api\/webhooks\/(\d+)\/([^\/]+)/);
    const apiMatch = url.pathname.match(/^\/discord(\/.*)?$/);

    if (webhookMatch) {
      return fetch(`https://discord.com/api/webhooks/${webhookMatch[1]}/${webhookMatch[2]}`, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
    } else if (apiMatch) {
      return fetch(`https://discord.com/api${apiMatch[1] || ""}${url.search}`, {
        method: request.method,
        headers: request.headers,
        body: request.method !== "GET" ? request.body : null
      });
    }

    return new Response("Use: /api/webhooks/ID/TOKEN or /discord/v10/...");
  }
}
