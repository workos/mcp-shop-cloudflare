import { OAuthProvider } from '@cloudflare/workers-oauth-provider';
import { McpShopServer } from './mcp-server';
import { AuthHandler } from './auth-handler';

export interface Env {
  WORKOS_CLIENT_ID: string;
  WORKOS_API_KEY: string;
  WORKOS_API_HOSTNAME: string;
  WORKOS_AUTHKIT_DOMAIN: string;

  OAUTH_KV: KVNamespace;
  ORDERS: KVNamespace;

  MCP_OBJECT: DurableObjectNamespace; // Changed from MCP_SHOP_SERVER
}

export default new OAuthProvider({
  apiRoute: '/mcp',
  apiHandler: McpShopServer.mount('/mcp'), // Note: using mount() not serve()
  defaultHandler: AuthHandler as any,
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  clientRegistrationEndpoint: '/register',
});

export { McpShopServer };
