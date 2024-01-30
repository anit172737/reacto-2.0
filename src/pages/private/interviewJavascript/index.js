import React, { useEffect, useState } from "react";
import "../../../sass/pages/private/interviewQ.scss";
// import Menu from "./menuJavascript";
import Header from "../../../components/header";
import { searchFunction } from "../../../utility/helperFunctions";
import { PlayCircle, PauseCircle } from "react-feather";
import Speech from "speak-tts";
import { useDispatch, useSelector } from "react-redux";
import { fetchJsQtnList } from "../../admin/interview/javascript/store";

const InterviewJavascript = () => {
  const { jsQtnList } = useSelector((state) => state.javascriptMaster);
  const [search, setSearch] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [pause, setPause] = useState(false);
  const [loading, setLoading] = useState(false);

  let Menu;
  const [searchMenu, setSearchMenu] = useState(Menu);
  const dispatch = useDispatch();

  const speech = new Speech(); // will throw an exception if not browser supported

  // Example with full conf
  speech.init({
    volume: 1,
    lang: "en-GB",
    rate: 1,
    pitch: 1,
    voice: "Google UK English Female",
    splitSentences: true,
  });

  const handlePause = (text) => {
    for (let i = 0; i < searchMenu.length; i++) {
      if (searchMenu[i].answer === text) {
        setLoading(false);
        searchMenu[i].loading = false;
        setSpeaking(false);
        setPause(true);
        searchMenu[i].speaking = false;
        searchMenu[i].pause = true;
        speech.pause();
      } else {
        searchMenu[i].speaking = false;
        if (speaking) {
          setSpeaking(false);
        }
      }
    }
  };

  const handleResume = (text) => {
    for (let i = 0; i < searchMenu.length; i++) {
      if (searchMenu[i].answer === text) {
        setLoading(false);
        searchMenu[i].loading = false;
        setSpeaking(true);
        setPause(true);
        searchMenu[i].speaking = true;
        searchMenu[i].pause = false;
        speech.resume();
      } else {
        searchMenu[i].speaking = false;
        if (speaking) {
          setSpeaking(false);
        }
      }
    }
  };

  const handleSpeech = (text) => {
    for (let i = 0; i < searchMenu.length; i++) {
      if (searchMenu[i].answer === text) {
        let voice = text.replace(/<p>|<\/p>|<ul>|<\/ul>|<li>|<\/li>/g, "");
        setLoading(true);
        searchMenu[i].loading = true;
        speech
          .speak({
            preload: true,
            text: voice,
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
              onpause: () => {
                console.log("Pause utterance");
              },
              onresume: () => {
                console.log("Resume utterance");
              },

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

  // useEffect(() => {
  //   searchFunction(search, jsQtnList, setSearchMenu);
  //   console.log("loading", loading);
  // }, [search, speaking]);

  useEffect(() => {
    dispatch(fetchJsQtnList());
    if (jsQtnList) {
      Menu = jsQtnList.map((e) => {
        return {
          ...e,
          pause: false,
        };
      });
    }
    setSearchMenu(Menu);
  }, []);

  console.log("searchMenu", searchMenu);
  return (
    <div className="interviewQ">
      <Header title="Javascript Interview Questions" setSearch={setSearch} />
      {searchMenu?.length !== 0 ? (
        searchMenu?.map((qtn) => {
          return (
            <div className="interviewQ_sec">
              <div className="interviewQ_sec-1">
                <h3>{qtn?.question}</h3>
                <div className="interviewQ_sec-1-speech">
                  {qtn?.speaking === false && qtn?.pause === false ? (
                    <PlayCircle
                      // className="interviewQ_sec-1-speech-speak"
                      className={`${
                        qtn?.loading
                          ? "animate"
                          : "interviewQ_sec-1-speech-speak"
                      }`}
                      onClick={() => handleSpeech(qtn?.answer)}
                    />
                  ) : qtn?.speaking === true && qtn?.pause === false ? (
                    <PauseCircle
                      className="interviewQ_sec-1-speech-speak"
                      onClick={() => handlePause(qtn?.answer)}
                    />
                  ) : (
                    <PlayCircle
                      // className="interviewQ_sec-1-speech-speak"
                      className={`${
                        // qtn?.loading
                        //   ? "animate"
                        //       :
                        "interviewQ_sec-1-speech-speak"
                      }`}
                      onClick={() => handleResume(qtn?.answer)}
                    />
                  )}
                </div>
              </div>

              <p
                style={{ lineHeight: "30px" }}
                dangerouslySetInnerHTML={{ __html: qtn?.answer }}
              ></p>
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

export default InterviewJavascript;
