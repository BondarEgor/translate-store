export class NetworkService {
    private baseUrl = "http://localhost:3001";

    private async request<T>(url: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            ...options,
            headers: {
                ...options?.headers,
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }

        const text = await response.text();

        if (!text) {
            return undefined as T;
        }

        const parsedJson = JSON.parse(text);

        if ('message' in parsedJson) {
            throw new Error(parsedJson.message);
        }

        return parsedJson;
    }


    async get<T>(url: string) {
        return this.request<T>(url);
    }

    async delete<T>(url: string) {
        return this.request<T>(url, {
            method: "DELETE",
        });
    }

    async post<T>(url: string, payload: Record<string, unknown>, options?: RequestInit) {
        return this.request<T>(url, {
            body: JSON.stringify(payload),
            method: "POST",
            ...options
        });
    }

    async put<T>(url: string, payload: Record<string, unknown>, options?: RequestInit) {
        return this.request<T>(url, {
            body: JSON.stringify(payload),
            method: "PUT",
            ...options
        });
    }
}