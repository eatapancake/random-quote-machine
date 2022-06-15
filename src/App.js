import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";

let url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

function App() {
  const [quote, setQuote] = useState(
    "Whatever the mind of man can conceive and believe, it can achieve."
  );
  const [author, setAuthor] = useState("Napoleon Hill");
  const [quotesArr, setQuotesArr] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [color, setColor] = useState("#FF6633");
  const [randomColor, setRandomColor] = useState(3);
  const colorArr = [
    "#FF6633",
    "#FFB399",
    "#b05db0",
    "#e0c370",
    "#00B3E6",
    "#cc7b10",
    "#3366E6",
    "#dea0cc",
    "#c44b4b",
    "#894bb8",
    "#49ba45",
  ];

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    setQuotesArr(json.quotes);
  };

  useEffect(() => {
    fetchQuotes(url);
  }, [url]);

  const generateRandomNumber = () => {
    setRandomNumber(Math.floor(quotesArr.length * Math.random()));
  };
  const generateRandomColor = () => {
    setRandomColor(Math.floor(colorArr.length * Math.random()));
  };

  const updateQuoteBox = () => {
    generateRandomNumber();
    generateRandomColor();
    setQuote(quotesArr[randomNumber].quote);
    setAuthor(quotesArr[randomNumber].author);
    setColor(colorArr[randomColor]);
  };

  return (
    <div className="App transition" style={{ backgroundColor: color }}>
      <div
        id="body"
        className="transition"
        style={{ backgroundColor: color, color: color }}
      >
        <header className="App-header" id="quote-box">
          <div id="text">
            <p id="quote">
              <FontAwesomeIcon icon={faQuoteLeft} />
              &nbsp;{quote}
            </p>
            <p id="author">- {author}</p>
            <span className="transition" id="button-row">
              <a
                style={{ backgroundColor: color }}
                href={encodeURI(
                  `http://www.twitter.com/intent/tweet?text=${quote} -${author}`
                )}
                id="tweet-quote"
                className="transition"
              >
                <FontAwesomeIcon
                  className="transition"
                  style={{
                    backgroundColor: color,
                    color: "white",
                    height: "30px",
                  }}
                  icon={faTwitter}
                />
              </a>
              <button
                className="transition"
                id="new-quote"
                onClick={() => updateQuoteBox()}
                style={{ backgroundColor: color }}
              >
                New Quote
              </button>
            </span>
          </div>
        </header>
        <div id="credits">By Janet </div>
      </div>
    </div>
  );
}

export default App;
