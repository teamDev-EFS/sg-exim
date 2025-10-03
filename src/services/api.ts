// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "/api";

// API Response Types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product: string;
  quantity: string;
  requirements?: string;
}

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

// Generic API call function
async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle different response types
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response is not JSON, use the text as error message
        if (errorText) {
          errorMessage = errorText;
        }
      }

      return {
        success: false,
        error: errorMessage,
      };
    }

    // Try to parse JSON response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return {
        success: true,
        data,
        message: data.message,
      };
    } else {
      // Handle non-JSON responses
      const text = await response.text();
      return {
        success: true,
        data: text as T,
        message: "Request completed successfully",
      };
    }
  } catch (error) {
    console.error("API call failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

// API Functions
export const api = {
  // Quote submission
  async submitQuote(quoteData: QuoteRequest): Promise<ApiResponse> {
    return apiCall("/quote", {
      method: "POST",
      body: JSON.stringify(quoteData),
    });
  },

  // Contact form submission
  async submitContact(contactData: ContactRequest): Promise<ApiResponse> {
    return apiCall("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    });
  },

  // Get products
  async getProducts(): Promise<ApiResponse> {
    return apiCall("/products");
  },

  // Get single product
  async getProduct(id: string): Promise<ApiResponse> {
    return apiCall(`/products/${id}`);
  },

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    return apiCall("/health");
  },

  // Get documents
  async getDocuments(): Promise<ApiResponse> {
    return apiCall("/documents");
  },

  // Get team data
  async getTeam(): Promise<ApiResponse> {
    return apiCall("/team");
  },
};

// Utility function to get API base URL
export const getApiBaseUrl = () => API_BASE_URL;

// Utility function to check if API is available
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await api.healthCheck();
    return response.success;
  } catch {
    return false;
  }
};

export default api;
