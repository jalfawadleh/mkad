const getApiBaseUrl = (isProd) =>
  (isProd ? "https://mkadifference.com/" : "http://localhost:3000/") + "api/";

export { getApiBaseUrl };
