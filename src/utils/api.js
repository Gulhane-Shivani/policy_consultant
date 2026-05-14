const getApiUrl = () => {
  // Try to get from env first, then fallback to local


  // Local fallback (Uvicorn defaults to 8000)
  // return "http://127.0.0.1:8000";
  return "https://policy-consultant-backend-1.onrender.com"

};
const API_URL = getApiUrl();
console.log('[API] Base URL:', API_URL);



/**
 * Reusable API utility using fetch
 * @param {string} endpoint - The API endpoint (e.g., '/login')
 * @param {Object} options - Fetch options (method, body, headers, etc.)
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    if (!API_URL) {
      throw new Error('API Base URL is not configured. Please set VITE_API_URL.');
    }
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle unauthorized
      if (response.status === 401) {
        localStorage.removeItem('access_token');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }

      // Handle FastAPI 422 errors or other detail structures
      let errorMessage = 'Something went wrong';
      if (data.detail) {
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(err => `${err.loc[err.loc.length - 1]}: ${err.msg}`).join(', ');
        } else if (typeof data.detail === 'string') {
          errorMessage = data.detail;
        }
      } else if (data.message) {
        errorMessage = data.message;
      }

      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const api = {
  get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => apiRequest(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => apiRequest(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};
