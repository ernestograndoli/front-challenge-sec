interface FetchParams {
  url: string;
  body?: object;
}

class FetchService {
  private static getHeaders() {
    return new Headers({
      "Content-Type": "application/json",
    });
  }

  public static async get(params: FetchParams) {
    const { url } = params;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: FetchService.getHeaders(),
      });

      return response.json();
    } catch (error: any) {
      return "Error: " + error.message;
    }
  }

  public static async put(params: FetchParams) {
    const { url, body } = params;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: FetchService.getHeaders(),
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error: any) {
      return "Error: " + error.message;
    }
  }

  public static async post(params: FetchParams) {
    const { url, body } = params;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: FetchService.getHeaders(),
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error: any) {
      return "Error: " + error.message;
    }
  }

  public static async delete(params: FetchParams) {
    const { url, body } = params;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: FetchService.getHeaders(),
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error: any) {
      return "Error: " + error.message;
    }
  }
}

export default FetchService;
