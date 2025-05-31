import type { ExportedHandler } from '@cloudflare/workers-types';
import type { Env } from './index';
import { WorkOS } from '@workos-inc/node';
import * as jose from 'jose';

interface OAuthRequest {
  responseType: string;
  clientId: string;
  redirectUri: string;
  scope: string[];
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
}

export const AuthHandler: ExportedHandler<Env & { OAUTH_PROVIDER: any }> = {
  async fetch(request: Request, env: Env & { OAUTH_PROVIDER: any }): Promise<Response> {
    const url = new URL(request.url);
    console.log('AuthHandler:', url.pathname);

    if (url.pathname === '/authorize') {
      // Parse the OAuth request from the OAuth provider
      const oauthReqInfo = (await env.OAUTH_PROVIDER.parseAuthRequest(request)) as OAuthRequest;
      if (!oauthReqInfo.clientId) {
        return new Response('Invalid request', { status: 400 });
      }

      // Initialize WorkOS
      const workos = new WorkOS(env.WORKOS_API_KEY, {
        apiHostname: env.WORKOS_API_HOSTNAME,
      });

      // Create WorkOS authorization URL
      const authUrl = workos.userManagement.getAuthorizationUrl({
        provider: 'authkit',
        clientId: env.WORKOS_CLIENT_ID,
        redirectUri: new URL('/callback', url.origin).href,
        state: btoa(JSON.stringify(oauthReqInfo)), // Store OAuth request in state
      });

      console.log('Redirecting to WorkOS:', authUrl);
      return Response.redirect(authUrl);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (!code || !state) {
        return new Response('Missing code or state', { status: 400 });
      }

      // Decode the OAuth request info
      const oauthReqInfo = JSON.parse(atob(state));

      // Exchange WorkOS code for user info
      const workos = new WorkOS(env.WORKOS_API_KEY, {
        apiHostname: env.WORKOS_API_HOSTNAME,
      });

      try {
        const response = await workos.userManagement.authenticateWithCode({
          clientId: env.WORKOS_CLIENT_ID,
          code,
        });

        const { accessToken, user } = response;

        // Decode permissions from the access token
        const decoded = jose.decodeJwt(accessToken) as any;
        const permissions = decoded.permissions || [];

        console.log('WorkOS auth successful:', user.email);

        // Complete the OAuth authorization
        const { redirectTo } = await env.OAUTH_PROVIDER.completeAuthorization({
          request: oauthReqInfo,
          userId: user.id,
          metadata: {},
          scope: permissions,
          props: {
            user,
            accessToken,
            permissions,
            email: user.email,
          },
        });

        console.log('OAuth complete, redirecting to:', redirectTo);
        return Response.redirect(redirectTo);
      } catch (error) {
        console.error('Authentication error:', error);
        return new Response('Authentication failed', { status: 400 });
      }
    }

    if (url.pathname === '/') {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head><title>MCP Shop on Cloudflare - WorkOS Demo</title></head>
        <body>
          <h1>MCP Shop - WorkOS AuthKit Demo</h1>
          <p>Connect your MCP client to: <code>${url.origin}/mcp</code></p>
        </body>
        </html>
      `,
        { headers: { 'Content-Type': 'text/html' } },
      );
    }

    return new Response('Not Found', { status: 404 });
  },
};
