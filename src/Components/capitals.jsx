import React, { useState } from "react";
import "./capitals.scss";

const Capitals = ({
  capitals,
  correctCapital,
  country,
  countryCapitalPairs,
}) => {
  const [message, setMessage] = useState("");

  const handleButtonClick = (selectedCapital) => {
    if (selectedCapital === correctCapital) {
      setMessage(`Correct! The capital of ${country} is ${correctCapital}.`);
    } else {
      const correctCountry =
        countryCapitalPairs.find((pair) => pair.capital === selectedCapital)
          ?.country || "unknown country";
      setMessage(
        `Incorrect! The capital of ${country} is ${correctCapital}. ${selectedCapital} is the capital of ${correctCountry}.`
      );
    }
  };

  return (
    <div className="capitals-container">
      {capitals.map((capital, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(capital)}
          aria-label={`${capital} Capital`}
          data-testid="capital_options_button"
          className="capital_button"
        >
          {capital}
        </button>
      ))}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Capitals;