export default {
  async fetch(request) {
    const url = new URL(request.url);
    const webhookMatch = url.pathname.match(/^\/api\/webhooks\/(\d+)\/([^\/]+)/);
    const apiMatch = url.pathname.match(/^\/discord(\/.*)?$/);

    let targetUrl;
    if (webhookMatch) {
      targetUrl = `https://discord.com/api/webhooks/${webhookMatch[1]}/${webhookMatch[2]}`;
    } else if (apiMatch) {
      targetUrl = `https://discord.com/api${apiMatch[1] || ""}${url.search}`;
    } else {
      return new Response("Use: /api/webhooks/ID/TOKEN or /discord/v10/...");
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
    });

    const body = response.status === 204 ? null : await response.text();
    return new Response(body, { status: response.status });
  }
}