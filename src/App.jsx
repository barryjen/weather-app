import React, { useState, useEffect } from 'react';
import { auth, signInWithEmail, signOut } from './utils/auth';
import { fetchWeather } from './utils/weather';
import { getCachedWeather, cacheWeather } from './utils/storage';

export default function App() {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  const getWeather = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = position.coords;
      const data = await fetchWeather(latitude, longitude);
      setWeather(data);
      cacheWeather(data);
    } catch (err) {
      console.error("Error fetching location or weather:", err);
      const cached = getCachedWeather();
      if (cached) setWeather(cached);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) getWeather();
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <button onClick={() => signInWithEmail(prompt("Email:"), prompt("Password:"))}>
          Login with Email
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user.email}</h2>
      <button onClick={signOut}>Sign Out</button>
      <hr />
      <h3>Current Weather</h3>
      {loading ? (
        <p>Loading weather...</p>
      ) : weather ? (
        <div>
          <p><strong>{weather.name}</strong></p>
          <p>{weather.weather[0].description}</p>
          <p>🌡 {weather.main.temp}°C</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
}
