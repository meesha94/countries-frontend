import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Country from "../Components/country";
import Capitals from "../Components/capitals";
import { shuffleArray } from "./shuffleArray";
import "./game.scss";

const Game = () => {
  const [country, setCountry] = useState("");
  const [capitals, setCapitals] = useState([]);
  const [correctCapital, setCorrectCapital] = useState("");
  const [countryCapitalPairs, setCountryCapitalPairs] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/country");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();

        if (
          !responseData ||
          !responseData.data ||
          !Array.isArray(responseData.data) ||
          responseData.data.length < 3
        ) {
          throw new Error("Invalid data structure received");
        }

        const data = responseData.data;
        const shuffledData = shuffleArray(data);
        const randomCountries = shuffledData
          .slice(0, 3)
          .map((country) => ({ name: country.name, capital: country.capital }));

        const allCapitals = data.map((country) => country.capital);
        const countryCapitalPairs = data.map((country) => ({
          country: country.name,
          capital: country.capital,
        }));

        setCountry(randomCountries[0].name);
        setCorrectCapital(randomCountries[0].capital);
        setCapitals(allCapitals);
        setCountryCapitalPairs(countryCapitalPairs);
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchCountriesData();
  }, [key]);

  const handlePlayAgain = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="game-container">
      <h1 className="title">Guess the correct capital</h1>
      {country && <Country country={country} />}
      {capitals.length > 0 && (
        <Capitals
          capitals={capitals}
          correctCapital={correctCapital}
          country={country}
          countryCapitalPairs={countryCapitalPairs}
        />
      )}
      <button className="play_again_button" onClick={handlePlayAgain}>
        Play Again
      </button>
      <Link to="/exit" className="exit_link">
        <button className="exit_button">Exit</button>
      </Link>
    </div>
  );
};

export default Game;