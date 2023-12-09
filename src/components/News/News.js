import React, { useState, useEffect } from "react";
import "./News.css";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState("00-00-0000");
  const [currTime, setCurrTime] = useState("00:00:00");

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=Apple&from=2023-12-08&sortBy=popularity&apiKey=940c363eef8a4c629d0b435905488fec"
      )
      .then((res) => setNews(res.data.articles));
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      const ddmmyyyy = new Date(news[0].publishedAt);
      let day = ddmmyyyy.getDate();
      let month = ddmmyyyy.getMonth() + 1; // Months are zero-based
      let year = ddmmyyyy.getFullYear();
      if (day < 10) day = `0${day}`;
      if (month < 10) month = `0${month}`;
      const dateFormated = `${day}-${month}-${year}`;
      setDate(dateFormated);
    }
  }, [date, news]);

  useEffect(() => {
    if (news.length > 0) {
      const time = new Date(news[0].publishedAt);
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let tzone = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;

      const timeFormated = `${hours}:${minutes}:${tzone}`;
      setCurrTime(timeFormated);
    }
  }, [currTime, news]);

  return (
    <>
      {news.length !== 0 ? (
        <div className="news">
          <div
            className="news__image__title"
            style={{
              backgroundImage: `url(${news[0].urlToImage})`,
              backgroundSize: "cover",
            }}
          >
            <h3>{news[0].title}</h3>
            <h3>
              {date} | {currTime}
            </h3>
          </div>
          <div className="news__description">
            <p>{news[0].description}</p>
          </div>
        </div>
      ) : (
        <div className="news_lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
}

export default News;
