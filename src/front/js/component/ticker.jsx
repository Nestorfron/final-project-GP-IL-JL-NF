import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/ticker.css";

export const Ticker = () => {
  const { store } = useContext(Context);
  const { beers, breweries } = store;
  const [tickerText, setTickerText] = useState("");

  useEffect(() => {
    if (beers.length > 0 && breweries.length > 0) {
      const generateTickerText = () => {
        let text = "";
        for (let i = 0; i < 5; i++) {
          // Show 3 combinations
          const randomBeer = beers[Math.floor(Math.random() * beers.length)];
          const randomBrewery =
            breweries[Math.floor(Math.random() * breweries.length)];
          text += `${randomBeer.name}-<span class="brewery-name">${randomBrewery.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
        }
        return text;
      };

      const text = generateTickerText();
      setTickerText(text + text); // Duplicate the text for continuous effect

      const intervalId = setInterval(() => {
        setTickerText(generateTickerText() + generateTickerText());
      }, 60000); // Adjust the time interval as needed (10s to match the animation duration)

      return () => clearInterval(intervalId);
    }
  }, [beers, breweries]);

  return (
    <div className="ticker-container w-100">
      <div
        className="ticker-text w-100"
        dangerouslySetInnerHTML={{ __html: tickerText }}
      ></div>
    </div>
  );
};
