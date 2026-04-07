const rawApiUrl = process.env.REACT_APP_API_URL;

// Default to /api so production (same host) works out of the box.
// In development, CRA proxy forwards /api calls to backend.
export const API_BASE_URL = (rawApiUrl && rawApiUrl.trim()) || '/api';
