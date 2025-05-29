export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return new Response("MCP Shop Server", { status: 200 });
  },
};

export interface Env {
  WORKOS_AUTHKIT_DOMAIN: string;
  WORKOS_API_HOSTNAME: string;
  WORKOS_API_KEY: string;
  WORKOS_CLIENT_ID: string;
}
