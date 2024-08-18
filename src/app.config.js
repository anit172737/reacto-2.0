export const baseUrl = window.location.origin.includes("localhost")
  ? process.env.REACT_APP_API_BASE_URL_UAT
  : process.env.REACT_APP_API_BASE_URL_LIVE;
