const ACCESS_KEY = "access";
const REFRESH_KEY = "refresh";
const EXP_KEY = "access_exp"; // access expiry timestamp (ms)

export const setTokens = (access, refresh, accessExpMs) => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(EXP_KEY, String(accessExpMs));
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXP_KEY);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem(ACCESS_KEY) && !!localStorage.getItem(REFRESH_KEY);
};

export const getAccess = () => localStorage.getItem(ACCESS_KEY);
export const getRefresh = () => localStorage.getItem(REFRESH_KEY);
export const getAccessExp = () => Number(localStorage.getItem(EXP_KEY) || "0");

// Fake refresh: if access expired but refresh exists, create new access
export const refreshAccessIfNeeded = () => {
  const refresh = getRefresh();
  if (!refresh) return false;

  const exp = getAccessExp();
  const now = Date.now();

  if (now < exp) return true; // still valid

  // create a new access token (fake)
  const newAccess = "access_" + Math.random().toString(36).slice(2);
  const newExp = now + 5 * 60 * 1000; // 5 minutes validity
  localStorage.setItem(ACCESS_KEY, newAccess);
  localStorage.setItem(EXP_KEY, String(newExp));
  return true;
};
