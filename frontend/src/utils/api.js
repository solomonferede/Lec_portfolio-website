/**
 * API utility functions for fetching data from the backend
 */

const getApiBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
};

/**
 * Generic fetch function with error handling
 * @param {string} endpoint - API endpoint (e.g., '/projects/')
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
export const fetchFromAPI = async (endpoint, options = {}) => {
  const base = getApiBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${base}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
};

/**
 * Fetch all items from an endpoint
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Array>} - Array of items
 */
export const fetchAll = async (endpoint) => {
  const data = await fetchFromAPI(endpoint);
  return Array.isArray(data) ? data : [];
};

/**
 * Fetch a single item by ID
 * @param {string} endpoint - API endpoint
 * @param {number|string} id - Item ID
 * @returns {Promise<Object>} - Item data
 */
export const fetchById = async (endpoint, id) => {
  return await fetchFromAPI(`${endpoint}${id}/`);
};

/**
 * Get API base URL
 * @returns {string} - API base URL
 */
export const getBaseUrl = () => getApiBaseUrl();

