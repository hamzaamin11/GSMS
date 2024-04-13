export const saveinLs = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};
export const getFromLs = (key) => {
  const token = localStorage.getItem(key);
  if (token) return JSON.parse(token);
  return false;
};
