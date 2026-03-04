export default {
  async fetch(request) {
    const url = new URL(request.url);
    const webhookMatch = url.pathname.match(/^\/api\/webhooks\/(\d+)\/([^\/]+)/);
    const apiMatch = url.pathname.match(/^\/discord(\/.*)?$/);
    const forwardHeaders = new Headers();
    const allowedHeaders = ["content-type", "authorization", "user-agent", "x-audit-log-reason"];
    for (const key of allowedHeaders) {
      if (request.headers.get(key)) {
        forwardHeaders.set(key, request.headers.get(key));
      }
    }
    let targetUrl;
    if (webhookMatch) {
      targetUrl = `https://discord.com/api/webhooks/${webhookMatch[1]}/${webhookMatch[2]}`;
    } else if (apiMatch) {
      targetUrl = `https://discord.com/api${apiMatch[1] || ""}${url.search}`;
    } else {
      return new Response("Use: /api/webhooks/ID/TOKEN or /discord/v10/...", { status: 200 });
    }
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
    });
    const responseBody = response.status === 204 ? null : await response.text();
    return new Response(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}