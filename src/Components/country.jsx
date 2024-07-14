import React from "react";
import "./country.scss";

const Country = ({ country }) => {
  return (
    <div className="country_container">
      <h2 className="country_name">Country: {country}</h2>
    </div>
  );
};

export default Country;