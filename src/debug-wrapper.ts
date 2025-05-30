export function debugMcpHandler(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    console.log('MCP request:', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    });

    const response = await handler(request);

    console.log('MCP response:', {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (response.status === 401) {
      // Clone response to read body
      const cloned = response.clone();
      const body = await cloned.text();
      console.log('401 response body:', body);
    }

    return response;
  };
}
