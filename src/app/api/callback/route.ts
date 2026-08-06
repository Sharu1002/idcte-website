import { NextRequest, NextResponse } from "next/server";

function htmlResponse(body: string) {
  return new NextResponse(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return htmlResponse(
      `<script>window.opener && window.opener.postMessage("authorization:github:error:${JSON.stringify(
        "Missing code or OAuth credentials."
      )}", "*");</script>`
    );
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });
  const data = await tokenRes.json();

  if (!tokenRes.ok || data.error || !data.access_token) {
    return htmlResponse(
      `<script>window.opener && window.opener.postMessage("authorization:github:error:${JSON.stringify(
        JSON.stringify(data)
      )}", "*");</script>`
    );
  }

  const payload = JSON.stringify({
    token: data.access_token,
    provider: "github",
  });

  const script = `<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:${payload}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>`;

  return htmlResponse(script);
}
