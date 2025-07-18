const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

export const fetchWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  return await res.json();
};
