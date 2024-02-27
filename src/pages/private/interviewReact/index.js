import React, { useEffect, useState } from "react";
import "../../../sass/pages/private/interviewQ.scss";
// import Menu from "./menureact";
import Header from "../../../components/header";
import { searchFunction } from "../../../utility/helperFunctions";
import { PlayCircle, PauseCircle } from "react-feather";
import Speech from "speak-tts";
import { useDispatch, useSelector } from "react-redux";
import { fetchReactQtnList } from "../../admin/interview/react/store";
import CustomPagination from "../../../components/customPagination";

const InterviewReact = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { reactQtnList, openForm, openDeleteForm, selected, total } =
    useSelector((state) => state.reactMaster);
  const [speaking, setSpeaking] = useState(false);
  const [pause, setPause] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchMenu, setSearchMenu] = useState();
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
    for (let i = 0; i < searchMenu?.length; i++) {
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
    for (let i = 0; i < searchMenu?.length; i++) {
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
    for (let i = 0; i < searchMenu?.length; i++) {
      if (searchMenu[i].pause === true) {
        searchMenu[i].pause = false;
      }
      if (searchMenu[i].answer === text) {
        let voice = text.replace(
          /<p>|<\/p>|<div>|<\/div>|<ul>|<\/ul>|<li>|<\/li>|<strong>|<\/strong>|&nbsp;/g,
          ""
        );
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
                searchMenu[i].pause = false;
                setSpeaking(true);
                setLoading(false);
                setPause(false);
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

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  useEffect(() => {
    const payload = { search, pageSize, pageNumber: currentPage };
    dispatch(fetchReactQtnList(payload));
  }, [search, pageSize, currentPage]);

  useEffect(() => {
    let Menu;
    if (reactQtnList) {
      Menu = reactQtnList.map((e) => {
        return {
          ...e,
          pause: false,
        };
      });
    }
    setSearchMenu(Menu);
  }, [reactQtnList]);

  // console.log("searchMenu", searchMenu);
  console.log("pause", pause);

  return (
    <div className="interviewQ">
      <Header title="React Interview Questions" setSearch={setSearch} />
      {searchMenu?.length !== 0 ? (
        searchMenu?.map((qtn) => {
          return (
            <div className="interviewQ_sec">
              <div className="interviewQ_sec-1">
                <h3>{qtn?.question}</h3>

                <abbr title="listen answer" style={{ justifySelf: "end" }}>
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
                </abbr>
              </div>
              <div className="interviewQ_sec-2">
                <p
                  className="interviewQ_sec-2-p"
                  dangerouslySetInnerHTML={{ __html: qtn?.answer }}
                ></p>
                {qtn.descTitle && (
                  <h4 className="interviewQ_sec-2-h4">{qtn.descTitle}</h4>
                )}

                {qtn?.desc && (
                  <img className="interviewQ_sec-2-img" src={qtn?.desc}></img>
                )}
              </div>
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
      <CustomPagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={total}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default InterviewReact;
