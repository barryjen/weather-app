const KEY = "cached_weather";

export const cacheWeather = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

export const getCachedWeather = () => {
  const cached = localStorage.getItem(KEY);
  return cached ? JSON.parse(cached) : null;
};
