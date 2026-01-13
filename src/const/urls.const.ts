const API_BASE_URL = import.meta.env.VITE_API_PROXY_URL
export const URL = {
  baseUrl: API_BASE_URL,
} as const;

export default URL;
