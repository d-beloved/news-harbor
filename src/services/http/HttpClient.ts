export interface HttpConfig {
  timeout?: number;
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

export class HttpClient {
  private static readonly DEFAULT_TIMEOUT = 10000;

  constructor(private config: HttpConfig) {}

  async fetch<T>(url: string, options?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.config.timeout || HttpClient.DEFAULT_TIMEOUT,
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...this.config.defaultHeaders,
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
