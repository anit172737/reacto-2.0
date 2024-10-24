import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import "../../sass/pages/private/interviewQ.scss";
import Header from "../header";
import { ThreeDots } from "react-loader-spinner";
import { PlayCircle, PauseCircle } from "react-feather";
import Speech from "speak-tts";
import { useSelector } from "react-redux";
import CustomPagination from "../customPagination";

const UserComponent = ({
  search,
  setSearch,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loader,
  setLoader,
  searchMenu,
  setSearchMenu,
  master,
  title,
  fetchQtnList,
}) => {
  const { qtnList, total } = useSelector((state) => state[master]);
  const [speaking, setSpeaking] = useState(false);
  const [pause, setPause] = useState(false);
  const [loading, setLoading] = useState(false);
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
          /&nbsp;|<a>|<\/a>|<pre style=\"padding-left: 40px;\"><span style=\"font-size: 12pt;\"><span class=\"hljs-keyword\">|<span class=\"hljs-built_in\">|<span class=\"hljs-string\">|<span class=\"hljs-number\">|<\/span><\/pre>|<div>|\r\n|<div>|<\/div>\r\n<\/div>|<strong>|<\/strong>|<p style=\"padding-left: 40px;\"><span style=\"font-size: 12pt;\"><code>|<\/code><\/span>|<ul class=\"wp-block-list\">\r\n<li>|<\/li>|\r\n<\/ul>|<p>|<\/p>|<ul>|<\/ul>|<li>|<\/li>|<strong>|<\/strong>|&nbsp;/g,
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
    setCurrentPage(1);
  };

  useMemo(() => {
    let Menu;
    if (qtnList) {
      Menu = qtnList.map((e) => {
        return {
          ...e,
          pause: false,
        };
      });
    }
    setSearchMenu(Menu);
  }, [qtnList]);

  return (
    <div className="interviewQ">
      <Header
        title={`${title} Questions`}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />
      {!loader ? (
        searchMenu?.length !== 0 ? (
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
          <div className="interviewQ_sec interviewQ_sec-noData">
            No data found
          </div>
        )
      ) : (
        <div style={{ display: "grid", justifyContent: "center" }}>
          <ThreeDots size={10} color="#6c63ff" />
        </div>
      )}
      {!loader && qtnList && qtnList.length !== 0 && (
        <CustomPagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={total}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
          handlePageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default UserComponent;
