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
