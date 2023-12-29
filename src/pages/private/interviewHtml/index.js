import React, { useEffect, useState } from "react";
import "../../../sass/pages/private/interviewQ.scss";
import Menu from "./menuHtml";
import { searchFunction } from "../../../utility/helperFunctions";
import Header from "../../../components/header";
import { PlayCircle, PauseCircle } from "react-feather";
import Speech from "speak-tts";

const Html = () => {
  const [search, setSearch] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const [loading, setLoading] = useState(false);
  const [searchMenu, setSearchMenu] = useState(Menu);

  const speech = new Speech(); // will throw an exception if not browser supported

  // Example with full conf
  speech.init({
    volume: 1,
    lang: "en-GB",
    rate: 1,
    pitch: 1,
    voice: "Google UK English Male",
    splitSentences: true,
  });
  const handleSpeech = (text) => {
    for (let i = 0; i < searchMenu.length; i++) {
      if (searchMenu[i].answer === text) {
        setLoading(true);
        searchMenu[i].loading = true;
        speech
          .speak({
            preload: true,
            text: text,
            queue: false, // current speech will be interrupted,
            listeners: {
              onstart: () => {
                console.log("Start utterance");
                searchMenu[i].loading = false;
                searchMenu[i].speaking = true;
                setSpeaking(true);
                setLoading(false);
              },
              onend: () => {
                console.log("End utterance");
              },
              // onresume: () => {
              //   console.log("Resume utterance");
              // },
              // onboundary: (event) => {
              //   console.log(
              //     event.name +
              //       " boundary reached after " +
              //       event.elapsedTime +
              //       " milliseconds."
              //   );
              // },
            },
          })
          .then(() => {
            setSpeaking(false);
            searchMenu[i].speaking = false;
          })
          .catch((e) => {
            console.error("An error occurred :", e);
          });
      } else {
        searchMenu[i].speaking = false;
        if (speaking) {
          setSpeaking(false);
        }
      }
    }
  };

  useEffect(() => {
    searchFunction(search, Menu, setSearchMenu);
    console.log("loading", loading);
  }, [search, speaking]);

  return (
    <div className="interviewQ">
      <Header title="HTML Interview Questions" setSearch={setSearch} />
      {searchMenu.length !== 0 ? (
        searchMenu.map((qtn) => {
          return (
            <div className="interviewQ_sec">
              <div className="interviewQ_sec-1">
                <h3>{qtn?.question}</h3>
                <div className="interviewQ_sec-1-speech">
                  {qtn?.speaking === false ? (
                    <PlayCircle
                      // className="interviewQ_sec-1-speech-speak"
                      className={`${
                        qtn?.loading
                          ? "animate"
                          : "interviewQ_sec-1-speech-speak"
                      }`}
                      onClick={() => handleSpeech(qtn?.answer)}
                    />
                  ) : (
                    <PauseCircle className="interviewQ_sec-1-speech-speak" />
                  )}
                </div>
              </div>

              <p style={{ lineHeight: "30px" }}>{qtn?.answer}</p>
            </div>
          );
        })
      ) : (
        <div
          className="interviewQ_sec"
          style={{ paddingBottom: "0px", textAlign: "center" }}
        >
          No data found
        </div>
      )}
    </div>
  );
};

export default Html;
