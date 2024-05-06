import React, { useState, useEffect, useContext } from "react";
import "./ProgramAbout.css";
import closeImg from "../../assets/close.png";
import progrmas1Img from "../../assets/imagePrograms/programs1.png";
import progrmas2Img from "../../assets/imagePrograms/programs2.png";
import progrmas3Img from "../../assets/imagePrograms/programs3.png";
import progrmas4Img from "../../assets/imagePrograms/programs4.png";
// import ReactVidioPlayer from "./ReactVidioPlayer";
import { useNavigate } from "react-router-dom";
// import { CountDown } from "../countdown/CountDown";
import { UserContext } from "../../UserContext";
import { toast } from "react-toastify";

const ProgramAbout = () => {
  const [all, setAll] = useState(false);
  const { userState, userActions } = useContext(UserContext);

  const navigate = useNavigate();

  // onfocus forms
  const [showLifestyle, setShowLifestyle] = useState(false);
  const [showTasty, setShowTasty] = useState(false);
  const [showDiscovering, setShowDiscovering] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);

  // logeout

  const [modalAboutProgram, setModalAboutProgram] = useState({
    program1: false,
    program2: false,
    program3: false,
    program4: false,
  });

  useEffect(() => {
    const storedPassword = localStorage.getItem("password");
    const storedEmail = localStorage.getItem("email");

    if (storedEmail && storedPassword) {
      userActions.setEmail(JSON.parse(storedEmail));
      userActions.setPassword(JSON.parse(storedPassword));
      userActions.setRememberMe(true);
      userActions.setLogeOut(false);
    } else if (storedEmail) {
      userActions.setLogeOut(false);
    } else if (!storedEmail) {
      userActions.setLogeOut(true);
      localStorage.removeItem("userId");

    }
  }, []);

  useEffect(() => {
    // localStorage.removeItem("password");
    const storedPassword = localStorage.getItem("password");
    const storedEmail = localStorage.getItem("email");

    if (storedEmail && storedPassword) {
      userActions.setEmail(JSON.parse(storedEmail));
      userActions.setPassword(JSON.parse(storedPassword));
      userActions.setRememberMe(true);
      userActions.setLogeOut(false);
    } else if (storedEmail) {
      userActions.setLogeOut(false);
    } else if (!storedEmail) {
      userActions.setLogeOut(true);
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleModalAboutProgram = (program) => {
    setModalAboutProgram(!modalAboutProgram);

    if (program === "Healthy lifestyle in a playful way") {
      let updateProgram = {
        program1: true,
      };

      setModalAboutProgram(updateProgram);
    } else if (
      program === "Discovering the World of Healthy lifestyle: Our Research"
    ) {
      let updateProgram = {
        program2: true,
      };

      setModalAboutProgram(updateProgram);
    } else if (program === "My Healthy Community") {
      let updateProgram = {
        program3: true,
      };

      setModalAboutProgram(updateProgram);
    } else {
      let updateProgram = {
        program4: true,
      };

      setModalAboutProgram(updateProgram);
    }
  };

  const toggleModalAboutProgramClose = () => {
    setModalAboutProgram({
      program1: false,
      program2: false,
      program3: false,
      program4: false,
    });
  };

  const handleFocuse = (id) => {
    if (id == 1) {
      setShowLifestyle(true);
    } else if (id == 2) {
      setShowDiscovering(true);
    } else if (id == 3) {
      setShowCommunity(true);
    } else if (id == 4) {
      setShowTasty(true);
    }
  };
  const handleFocuseLeave = (id) => {
    if (id == 1) {
      setShowLifestyle(false);
    } else if (id == 2) {
      setShowDiscovering(false);
    } else if (id == 3) {
      setShowCommunity(false);
    } else if (id == 4) {
      setShowTasty(false);
    }
  };
  const getInTouchClick = () => [navigate("./touch")];

  // fetch data by Arman
  const onclickPdfFile = () => {
    fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/download_pdf/")
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onlickPartispate = () => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      navigate("/forms");
    } else if (storedEmail) {
      navigate("/forms");
    } else {
      navigate("/login");
    }

    window.scrollTo(0, 0);
  };

  // function handleDownload() {
  //   const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
  //     pdf
  //   )}`;
  //   window.open(googleDocsUrl, "_blank");

  const handleSubmitLogeOut = () => {
    fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Դուք դուրս եք եկել համակարգից");
          userActions.setLogeOut(true);
          localStorage.removeItem("email");
          localStorage.removeItem("userId");
          localStorage.removeItem("password");
          localStorage.removeItem("resetemail");
        }
      })
      .catch((err) => {
        toast.warning("Չհաջողվեց");
      });
  };

  const handleSubmitLogin = () => {
    navigate("/login");
  };

  const userName = localStorage.getItem("name");

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={require("../../assets/logo.png")} />
        </div>
        {userState.logeOut ? (
          <div className=" see loginButton">
            <button onClick={handleSubmitLogin}>Մուտք/Գրանցվել</button>
          </div>
        ) : (
          <div className="see loginButton">
            <button onClick={handleSubmitLogeOut}>Դուրս Գալ </button>
          </div>
        )}
      </div>
      <div className="programAbout">
        <div className="programAboutRow">
          <div className="programAboutRowItem">
            <div className="programAboutRowItemBlock">
              <div className="programAboutRowItemImage">
                <img src={progrmas1Img} />
              </div>
              <div
                className="programAboutRowText"
                onMouseEnter={() => handleFocuse(1)}
                onMouseLeave={() => handleFocuseLeave(1)}
              >
                {showLifestyle ? (
                  <button
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Healthy lifestyle in a playful way"
                      )
                    }
                  >
                    Տեսնել ավելին
                  </button>
                ) : (
                  <p
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Healthy lifestyle in a playful way"
                      )
                    }
                  >
                    «Առողջ ապրելակերպը՝ խաղի ձևով»
                  </p>
                )}
              </div>
            </div>
            {modalAboutProgram.program1 && (
              <div className="modalProgramAbout">
                <div
                  className="overlay"
                  onClick={toggleModalAboutProgramClose}
                ></div>
                <div className="modalProgramAboutContent">
                  <button
                    onClick={toggleModalAboutProgramClose}
                    className="close-btn close-btn-program"
                  >
                    <img src={closeImg} />
                  </button>
                  <h2>
                    «Առողջ ապրելակերպը՝ խաղի ձևով»․ մշակել նոր խաղ՝ ֆիզիկական
                    ակտիվությունը և առողջ սնվելու գաղափարը հանրայնացնելու համար
                    և ներկայացնել այն:
                  </h2>
                  <div
                    className={`modalProgramAboutContentTextBlock ${
                      all ? "heightNone" : "height"
                    }`}
                  >
                    <h3>
                      Ընդհանուր հրահանգներ, որոնք կօգնեն պատրաստել նախագիծը․
                    </h3>
                    <ol>
                      <li>Ընտրեք առողջ ապրելակերպի հետ կապված որևէ թեմա։</li>
                      <li>
                        Մշակեք այդ թեմայի հետ կապված խաղ և որոշեք ձեր խաղի
                        կանոններն ու նպատակը:
                      </li>
                      <li>
                        Ընտրեք խաղի տեսակը (շարժուն, սպորտային, սեղանի խաղ,
                        ինտելեկտուալ վիկտորինա և այլն):
                      </li>
                      <li>
                        Մտածեք, թե ինչ նյութեր կարող են ձեզ անհրաժեշտ լինել խաղի
                        համար: Համոզվեք, որ դրանք հեշտությամբ հասանելի են:
                      </li>
                      <li>
                        Խաղացեք և փորձարկեք ձեր խաղը ընկերների կամ ընտանիքի հետ՝
                        համոզվելու համար, որ այն հաճելի է, հասկանալի և
                        համապատասխանում է առողջ ապրելակերպի սկզբունքներին:
                      </li>
                    </ol>

                    <h3>
                      Մասնակից թիմը պետք է ներկայացնի խաղի նախագիծ, որը
                      կպարունակի հետևյալ նյութերը.
                    </h3>
                    <div className="countsMembers">
                      <div className="membersOne">
                        <div className="rule">
                          <h4>Մրցութային հայտադիմումի բովանդակությունը</h4>
                          <h4>Միավորների քանակը</h4>
                        </div>
                        <div className="countConcept">
                          <div className="countConceptOne">
                            <span>Խաղի հայեցակարգ</span>
                          </div>
                          <div>20 միավոր</div>
                        </div>

                        <div className="presentPhotos">
                          <span>Լուսանկարներ</span>
                          <span className="onecount">1 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Եռածալ բուկլետ</span>
                          <span>5 միավոր</span>
                        </div>

                        <div className="videoContent">
                          <div className="videoContentOne">
                            <span className="tesaholovak">Տեսահոլովակ</span>
                          </div>
                          <span>10 միավոր</span>
                        </div>

                        <div className="thatsAll">
                          <span>Ընդամենը</span>
                          <span className="threecount">36 միավոր</span>
                        </div>

                        <div>
                          <span>
                            Չափանիշներին ավելի մանրամասն ծանոթանալու համար
                            խնդրում ենք ներբեռնել մրցույթի պայմանները:
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalProgramAboutContentBtnBlock">
                    <button onClick={getInTouchClick} className={"btnKap"}>
                      {" "}
                      հետադարձ կապ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="programAboutRowItem">
            <div className="programAboutRowItemBlock">
              <div className="programAboutRowItemImage">
                <img src={progrmas4Img} />
              </div>
              <div
                className="programAboutRowText"
                onMouseEnter={() => handleFocuse(4)}
                onMouseLeave={() => handleFocuseLeave(4)}
              >
                {showTasty ? (
                  <button
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Tasty and Healthy: My Favorite Healthy Recipes"
                      )
                    }
                  >
                    Տեսնել ավելին
                  </button>
                ) : (
                  <p
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Tasty and Healthy: My Favorite Healthy Recipes"
                      )
                    }
                  >
                    «Համեղ և առողջարար. իմ սիրելի առողջ բաղադրատոմսը»
                  </p>
                )}
              </div>
            </div>
            {modalAboutProgram.program4 && (
              <div className="modalProgramAbout">
                <div
                  className="overlay"
                  onClick={toggleModalAboutProgramClose}
                ></div>
                <div className="modalProgramAboutContent">
                  <button
                    onClick={toggleModalAboutProgramClose}
                    className="close-btn close-btn-program"
                  >
                    <img src={closeImg} alt={""} />
                  </button>
                  <h2>
                    «Համեղ և առողջարար. իմ սիրելի առողջ բաղադրատոմսը»․ ստեղծել
                    առողջ ուտեստի կամ նախաճաշի բաղադրատոմս, եփել այն և
                    գործընթացը ներկայացնել:
                  </h2>
                  <div
                    className={`modalProgramAboutContentTextBlock ${
                      all ? "heightNone" : "height"
                    }`}
                  >
                    <h3>
                      Ընդհանուր հրահանգներ, որոնք կօգնեն պատրաստել նախագիծը․
                    </h3>
                    <ol>
                      <li>
                        Մտաբերեք այն մթերքները, որոնք ամենից շատն եք սիրում
                        (ընտրեք այնպիսի բաղադրիչներ, որոնք հեշտությամբ հասանելի
                        են Հայաստանում):
                      </li>
                      <li>
                        Մտաբերեք այն ուտեստը, որը դուք ամենաշատն եք սիրում
                        (խորտիկ, աղցան, ապուր, սոուս և այլն):
                      </li>
                      <li>
                        Փորձեք ստեղծել այս ուտեստի առողջ տարբերակը և որոշեք դրա
                        պատրաստման եղանակը։
                      </li>
                      <li>
                        Փորձեք ինքնուրույն պատրաստել ձեր ուտեստը և համոզվեք, որ
                        այն համեղ է։ Կարող եք հարցնել ձեր ընկերների կամ ընտանիքի
                        անդամների կարծիքը պատրաստի ուտեստի վերաբերյալ։
                      </li>
                    </ol>

                    <h3>
                      Մասնակից թիմը պետք է ներկայացնի խաղի նախագիծ, որը
                      կպարունակի հետևյալ նյութերը.
                    </h3>
                    

                    <div className="countsMembers">
                      <div className="membersOne">
                        <div className="rule">
                          <h4>Մրցութային հայտադիմումի բովանդակությունը</h4>
                          <h4>Միավորների քանակը</h4>
                        </div>
                        <div className="countConcept">
                          <div className="countConceptOne">
                            <span>Առողջ նախաճաշի/խորտիկի/ճաշատեսակի</span>
                            <p>բաղադրատոմսի հայեցակարգ</p>
                          </div>
                          <div>20 միավոր</div>
                        </div>

                        <div className="presentPhotos">
                          <span>Լուսանկարներ</span>
                          <span className="onecount">1 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Եռածալ բուկլետ</span>
                          <span>5 միավոր</span>
                        </div>

                        <div className="videoContent">
                          <div className="videoContentOne">
                            <span className="tesaholovak">Տեսահոլովակ</span>
                          </div>
                          <span>10 միավոր</span>
                        </div>

                        <div className="thatsAll">
                          <span>Ընդամենը</span>
                          <span className="threecount">36 միավոր</span>
                        </div>
                        <div>
                          <span>
                            Չափանիշներին ավելի մանրամասն ծանոթանալու համար
                            խնդրում ենք ներբեռնել մրցույթի պայմանները։
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalProgramAboutContentBtnBlock">
                    <button onClick={getInTouchClick} className={"btnKap"}>
                      {" "}
                      հետադարձ կապ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
        <div className="programAboutRow">
          <div className="programAboutRowItem">
            <div className="programAboutRowItemBlock">
              <div className="programAboutRowItemImage">
                <img src={progrmas3Img} className={"programthreeimg"} />
              </div>
              <div
                className="programAboutRowText"
                onMouseEnter={() => handleFocuse(3)}
                onMouseLeave={() => handleFocuseLeave(3)}
              >
                {showCommunity ? (
                  <button
                    onClick={() =>
                      toggleModalAboutProgram("My Healthy Community")
                    }
                  >
                    Տեսնել ավելին
                  </button>
                ) : (
                  <p
                    onClick={() =>
                      toggleModalAboutProgram("My Healthy Community")
                    }
                  >
                    «Իմ առողջ համայնքը»
                  </p>
                )}
              </div>
            </div>
            {modalAboutProgram.program3 && (
              <div className="modalProgramAbout">
                <div
                  className="overlay"
                  onClick={toggleModalAboutProgramClose}
                ></div>
                <div className="modalProgramAboutContent">
                  <button
                    onClick={toggleModalAboutProgramClose}
                    className="close-btn close-btn-program"
                  >
                    <img src={closeImg} />
                  </button>
                  <h2>
                    «Իմ առողջ համայնքը». ստեղծել  իրենց
                    քաղաքում/գյուղում/դպրոցում առողջ ապրելակերպի գաղափարին
                    նպաստող սոցիալական նախագիծ և ներկայացնել այն:
                  </h2>
                  <div
                    className={`modalProgramAboutContentTextBlock ${
                      all ? "heightNone" : "height"
                    }`}
                  >
                    <h3>
                      Ընդհանուր հրահանգներ, որոնք կօգնեն պատրաստել նախագիծը․
                    </h3>
                    <ol>
                      <li>
                        Փորձեք մտածել և բացահայտել ձեր համայնքի առողջապահական
                        հատուկ կարիքները՝ հաշվի առնելով այնպիսի գործոններ,
                        ինչպիսիք են սնունդը, ֆիզիկական ակտիվությունը, հոգեկան
                        առողջությունը և առողջապահական խնամքի հասանելիությունը:
                        Դա կարող է լինել շինարարական ծրագիր, կանաչապատում,
                        միջոցառումների կազմակերպում, վերապատրաստման և իրազեկման
                        արշավներ:
                      </li>
                      <li>
                        Մտածեք մի այնպիսի նախագիծ, որը կբավարարի ձեր համայնքի
                        կարիքները և կբարելավի «առողջ բաղադրիչը» նրա
                        ապրելակերպում:
                      </li>
                      <li>Համոզվեք, որ ձեր նախագիծը հնարավոր է իրականացնել:</li>
                      <li>
                        Տեղացի փորձագետներից (առողջապահության ոլորտի
                        մասնագետներ, սննդաբաններ կամ համայնքային
                        կազմակերպություններ) ուղղորդում խնդրեք (մենթորություն,
                        խորհրդատվություն)՝ պատկերացումներ ձեռք բերելու և ձեր
                        նախագծի ճշգրտությունն ու համապատասխանությունը ապահովելու
                        համար:
                      </li>
                    </ol>

                    <h3>
                      Մասնակից թիմը պետք է ներկայացնի խաղի նախագիծ, որը
                      կպարունակի հետևյալ նյութերը.
                    </h3>

                    <div className="countsMembers">
                      <div className="membersOne">
                        <div className="rule">
                          <h4>Մրցութային հայտադիմումի բովանդակությունը</h4>
                          <h4>Միավորների քանակը</h4>
                        </div>
                        <div className="countConcept">
                          <div className="countConceptOne">
                            <span>Սոցիալական նախագծի հայեցակարգ</span>
                          </div>
                          <div>20 միավոր</div>
                        </div>

                        <div className="leafletContent">
                          <span>Իրականացման պլանի շնորհանդես</span>
                          <span>5 միավոր</span>
                        </div>
                        <div className="leafletContent">
                          <span>
                            Լուսանկարներ/գծագրեր/մանրապատկեր կամ գովազդային
                            գաղափարներ
                          </span>
                          <span>1 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Եռածալ բուկլետ</span>
                          <span>5 միավոր</span>
                        </div>

                        <div className="presentPhotos">
                          <div className="countConceptOne">
                            <span>Տեսահոլովակ</span>
                          </div>

                          <span className="onecount">5 միավոր</span>
                        </div>

                        <div className="thatsAll">
                          <span>Ընդամենը</span>
                          <span className="threecount">36 միավոր</span>
                        </div>

                        <div>
                          <span>
                            Չափանիշներին ավելի մանրամասն ծանոթանալու համար
                            խնդրում ենք ներբեռնել մրցույթի պայմանները։
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalProgramAboutContentBtnBlock">
                    <button onClick={getInTouchClick} className={"btnKap"}>
                      հետադարձ կապ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="programAboutRowItem">
            <div className="programAboutRowItemBlock">
              <div className="programAboutRowItemImage">
                <img src={progrmas2Img} />
              </div>
              <div
                className="programAboutRowText"
                onMouseEnter={() => handleFocuse(2)}
                onMouseLeave={() => handleFocuseLeave(2)}
              >
                {showDiscovering ? (
                  <button
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Discovering the World of Healthy lifestyle: Our Research"
                      )
                    }
                  >
                    Տեսնել ավելին
                  </button>
                ) : (
                  <p
                    onClick={() =>
                      toggleModalAboutProgram(
                        "Discovering the World of Healthy lifestyle: Our Research"
                      )
                    }
                  >
                    «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր
                    հետազոտությունը»{" "}
                  </p>
                )}
              </div>
            </div>
            {modalAboutProgram.program2 && (
              <div className="modalProgramAbout">
                <div
                  className="overlay"
                  onClick={toggleModalAboutProgramClose}
                ></div>
                <div className="modalProgramAboutContent">
                  <button
                    onClick={toggleModalAboutProgramClose}
                    className="close-btn close-btn-program"
                  >
                    <img src={closeImg} />
                  </button>
                  <h2>
                    «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր
                    հետազոտությունը»․ իրականացնել առողջ ապրելակերպի սկզբունքների
                    վերաբերյալ հետազոտություն  ևվ ներկայացնել այն:
                  </h2>
                  <div
                    className={`modalProgramAboutContentTextBlock ${
                      all ? "heightNone" : "height"
                    }`}
                  >
                    <h3>
                      Ընդհանուր հրահանգներ, որոնք կօգնեն պատրաստել նախագիծը․
                    </h3>
                    <ol>
                      <li>
                        Ընտրեք թեմա, ընտրեք առողջ ապրելակերպի որոշակի
                        ուղղություն, որը ձեզ հետաքրքրում է (օրինակ՝ առողջ
                        սնվելը, ֆիզիկական վարժություններ կամ մտավոր
                        բարեկեցություն):
                      </li>
                      <li>
                        Ի՞նչ հարցեր են ձեզ մոտ առաջանում ձեր ընտրած թեմայի
                        վերաբերյալ: Օրինակ, եթե ընտրում եք առողջ սնվելը, կարող
                        եք հարցնել. «Որո՞նք են ամեն օր միրգ և բանջարեղեն ուտելու
                        առավելությունները»:
                      </li>
                      <li>
                        Որոշեք այն աղբյուրները, որոնցից կարող եք գտնել ձեր
                        հարցերի պատասխանները: Դուք կարող եք տեղեկություններ
                        փնտրել վստահելի աղբյուրներից, ինչպիսիք են գրքերը,
                        հոդվածները կամ հեղինակավոր կայքերը: Օգտվեք գրադարանից
                        կամ խնդրեք ձեր ուսուցչին ձեզ խորհուրդ տալ:
                      </li>
                      <li>
                        Դուք կարող եք որոշել մարդկանց որոշակի խումբ, որոնց
                        շրջանում դուք պետք է կատարեք ձեր հետազոտությունը (դա
                        կոչվում է ֆոկուս խումբ) և նրանց հարցեր ուղղեք:
                      </li>
                      <li>
                        Եթե ​​ձեր հետազոտության թեման ընդհանուր է և կապված չէ
                        մարդկանց որոշակի խմբի հետ (ձեր դպրոցի, համայնքի), կարող
                        եք հարցազրույց վերցնել մի քանի պատահական մարդկանցից:
                      </li>
                      <li>
                        Նշումներ կատարեք այն մասին, թե ինչ եք հայտնաբերել տարբեր
                        աղբյուրներից ստացված տեղեկատվության և/կամ մարդկանց հետ
                        հարցազրույցների միջոցով: Փորձեք վերլուծել
                        տեղեկատվությունը: Ի՞նչ եզրակացության է դա բերում։
                        Ներառեք հետաքրքիր փաստեր, վիճակագրություն և ցանկացած
                        մեջբերում, որը ձեզ հետաքրքիր է թվում:
                      </li>
                    </ol>

                    <h3>
                      Մասնակից թիմը պետք է ներկայացնի խաղի նախագիծ, որը
                      կպարունակի հետևյալ նյութերը․
                    </h3>

                    <div className="countsMembers">
                      <div className="membersOne">
                        <div className="rule">
                          <h4>Մրցութային հայտադիմումի բովանդակությունը</h4>
                          <h4>Միավորների քանակը</h4>
                        </div>
                        <div className="countConcept">
                          <div className="countConceptOne">
                            <span>Հետազոտության հայեցակարգ</span>
                          </div>
                          <div>20 միավոր</div>
                        </div>

                        <div className="presentPhotos">
                          <div className="countConceptOne">
                            <span>Շնորհանդես</span>
                          </div>

                          <span className="onecount">5 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Լուսանկարներ/սկանավորումներ </span>
                          <span>1 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Եռածալ բուկլետ</span>
                          <span>5 միավոր</span>
                        </div>

                        <div className="leafletContent">
                          <span>Տեսահոլովակ</span>
                          <span>5 միավոր</span>
                        </div>

                        <div className="thatsAll">
                          <span>Ընդամենը</span>
                          <span className="threecount">36 միավոր</span>
                        </div>

                        <div>
                          <span>
                            Չափանիշներին ավելի մանրամասն ծանոթանալու համար
                            խնդրում ենք ներբեռնել մրցույթի պայմանները։
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modalProgramAboutContentBtnBlock">
                    <button onClick={getInTouchClick} className={"btnKap"}>
                      {" "}
                      հետադարձ կապ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="introducion">
          <div className="introducion-info">
            <h4>«Առողջ ապրելակերպի դեսպան» մրցույթի մասին</h4>
            <p>
              «Առողջ ապրելակերպի դեսպան» մրցույթը այն դպրոցականների համար է,
              ովքեր հետաքրքրված են առողջ ապրելակերպով և ստեղծագործական
              աշխատանքով։ 
            </p>
            <p>
              Այս մրցույթի շրջանակներում մասնակիցներին առաջարկվում է առողջ
              ապրելակերպի գաղափարի վրա հիմնված նախագծեր ստեղծել: Լավագույն
              նախագծերի հեղինակները հնարավորություն կստանան մի ողջ շաբաթ
              անցկացնել առողջ ապրելակերպի ճամբարում: Այստեղ նրանք կսովորեն ամեն
              ինչ առողջ ապրելու մասին, որ հետագայում իրենց ձեռք բերած գիտելիքով
              կիսվեն ընկերների և մտերիմների հետ՝ դառնալով  առողջ ապրելակերպի
              իսկական դեսպաններ։ 
            </p>

            <p className="participateRulle">
              Մրցույթին կարող են մասնակցել 5-8-րդ դասարանների աշակերտները։
            </p>
            <h4>Մրցույթի փուլերը</h4>
            <p className="participateRulle">
              <span>Փուլ 1. Գրանցում:</span>  Իրենց մասնակցության մասին հայտնելու համար թիմերից ակնկալվում է լրացնել <span className="bold">Գրանցման ձևը՝</span> մինչև 2024թ. մայիսի 15-ը։
            </p>

            <p className="participateRulle">
              <span>
                Փուլ 2. Նախագծի ներկայացում` հայտադիմումը լրացնելու միջոցով:
              </span>{" "}
              Թիմերից ակնկալվում է ներկայացնել իրենց նախագծերը՝ համապատասխան ձևաչափով լրացնելով հայտադիմումը՝ մինչև 2024թ. հունիսի 17-ը: 
            </p>
            <p className="participateRulle">
              <span>Փուլ 3. Որակավորման փուլ: </span>Ընտրող հանձնաժողովը կդիտարկի ստացված նախագծերը և կհայտարարի յուրաքանչյուր անվանակարգում 5 լավագույններին մինչև 2024թ. հուլիսի 1-ը: 

            </p>
            <p className="participateRulle">
              <span>Փուլ 4. Քվեարկության փուլ։ </span>
              Որակավորված նախագծերը կհրապարակվեն մրցույթի կայքում, որից հետո Հայաստանի բոլոր դպրոցականները կկարողանան առցանց քվեարկել իրենց նախընտրած նախագծի համար մինչև 2024թ. հուլիսի 1-ը: 
            </p>
          </div>
          <div className="introducion-info">
            <h4>Մրցույթի կազմակերպիչները</h4>
            <p>
              «Առողջ ապրելակերպի դեսպան» մրցույթի կազմակերպիչներն են ՀՀ
              առողջապահության նախարարությունը, ՀՀ կրթության, գիտության,
              մշակույթի և սպորտի նախարարությունը, ՄԱԿ-ի Պարենի համաշխարհային
              ծրագիրը, «Դպրոցական սնունդ և երեխաների բարեկեցություն» հիմնարկը,
              ՌԴ Ճյուղային սննդի ինստիտուտը։
            </p>
          </div>
          <div className="introducion-info">
            <h4>ՄԱՍՆԱԿԻՑՆԵՐԻՆ</h4>

            <p>
              <span>Ով կարող է մասնակցել․ </span>
              Մրցույթին կարող են մասնակցել 5-8-րդ դասարանների աշակերտները՝  4
              հոգանոց թիմերով։ Ամեն թիմում կարող է ընդգրկվել 4 հոգի՝ 5-6-րդ կամ
              7-8-րդ դասարանների տարիքային խմբերից։
            </p>
            <p>
              Յուրաքանչյուր դպրոցից կարող է մասնակցել ամենաշատը 2 թիմ՝ մեկական
              թիմ յուրաքանչյուր տարիքային խմբից (օրինակ՝ 1 թիմ կազմված  5-6-րդ
              դասարանցիներից, և 1 թիմ կազմված  7-8-րդ դասարանցիներից):
            </p>
          </div>

          <div className="introducion-info">
            <h4 className="exercise">Առաջադրանքը</h4>

            <p>
              <span>
                5-6-րդ դասարանների աշակերտներին առաջարկվում է կազմել հետևյալ
                նախագծերը․
              </span>
            </p>
            <ul className="disc">
              <li>«Առողջ ապրելակերպը՝ խաղի ձևով»</li>
              <li>«Համեղ և առողջարար. իմ սիրելի առողջ բաղադրատոմսը»</li>
            </ul>

            <p className="classes">
              <span>
                7-8-րդ դասարանների աշակերտներին առաջարկվում է կազմել հետևյալ
                նախագծերը․
              </span>
            </p>
            <ul className="disc">
              <li>
                «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր հետազոտությունը»
              </li>
              <li>«Իմ առողջ համայնքը» սոցիալական նախագիծ </li>
            </ul>
          </div>

          <div className="introducion-info">
            <h4 className="exercise">
              Հայտադիմումներին ներկայացվող պահանջները
            </h4>

            <p>
              Նախագծերը մշակելուց հետո անհրաժեշտ է դրանք ներբեռնել կայքում՝
              լրացնելով հայտադիմումը, որը կներառի տվյալ տարիքային խմբի թեմային
              համապատասխան բոլոր անհրաժեշտ նյութերը՝ համապատասխան ձևաչափով:
            </p>
            <ul className="decimal">
              <li>
                «Առողջ ապրելակերպը՝ խաղի ձևով» և «Համեղ և առողջ. իմ սիրելի առողջ
                բաղադրատոմսը» նախագծերի հայտադիմումը պետք է պարունակի հայեցակարգ
                (տեքստային տարբերակ MS Word փաստաթղթի ձևաչափով),
                լուսանկարներ/գծագրեր և մանրակերտ, թռուցիկ և տեսանյութ։
              </li>
              <li>
                «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր հետազոտությունը» և
                «Իմ առողջ համայնքը» նախագծերի հայտադիմումը պետք է պարունակի
                հայեցակարգ, շնորհանդես, լուսանկարներ, թռուցիկ և
                տեսանյութ:
              </li>
            </ul>

            <p className="participateRulle">
              Նախագծի հիմնական գաղափարները պետք է ձևավորված լինեն թռուցիկի մեջ՝ PDF ձևաչափով (նյութը տպելու կարիք չկա): Այս պահանջը
              վերաբերում է բոլոր չորս անվանակարգերին։ Այս ձևաչափով նյութը
              կազմակերպված կերպով ներկայացնելու տեսողականորեն գրավիչ միջոց է։
            </p>
          </div>

          <div className="introducion-info">
            <h4 className="exercise">Ընտրության չափանիշները</h4>

            <p>Բոլոր նախագծերը կգնահատվեն հետևյալ չափանիշներով.</p>
            <ul className="disc">
              <li>ուսումնական բաղադրիչը,</li>
              <li>
                հասակակիցների և ավելի կրտսեր դպրոցականների համար նախագծի
                ընկալման մատչելիությունը,
              </li>
              <li>
                սոցիալական նշանակությունը (նախագիծն ուղղված է համայնքում
                սոցիալական կարևոր փոփոխությունների՝ հաշվի առնելով մշակութային
                զգայունությունը և ներառականությունը),
              </li>
              <li>
                ստեղծարարությունը (ստեղծագործական մոտեցում, արտասովոր
                լուծումների կիրառում),
              </li>
              <li>
                ինտերակտիվ ներկայացումը, նախագծի պատրաստման ընթացքում
                ժամանակակից գործիքների կիրառումը,
              </li>
              <li>հետագա իրագործման համար հարմարությունը։</li>
            </ul>
          </div>

          <div className="introducion-info">
            <h4>ԳՆԱՀԱՏՈՒՄԸ</h4>
            <h4 className="exercise">Ընտրող հանձնաժողովը և գնահատումը</h4>
            <p>
              Ստացված բոլոր նախագծերը կորակավորվեն և կգնահատվեն ընտրող
              հանձնաժողովի կողմից։
            </p>
            <p>
              Ընտրող հանձնաժողովը ձևավորվում է մրցույթի կազմակերպիչների
              ներկայացուցիչներից։
            </p>
            <p className="evaluate">
              Ընտրող հանձնաժողովի բոլոր անդամները միմյանցից անկախ կգնահատեն
              հայտերը և ներկայացված նախագծերը՝ ըստ ընտրության չափանիշների:
            </p>
            <p>
              Ընտրող հանձնաժողովի յուրաքանչյուր անդամից մասնակիցները կարող են
              ստանալ առավելագույնը 36 միավոր: Արդյունքում կհաշվարկվի միջին
              միավորը՝ ելնելով հանձնաժողովի անդամների թվից:
            </p>
            <p className="evaluate">
              Ընտրող հանձնաժողովի յուրաքանչյուր անդամից մասնակիցները կարող են
              ստանալ առավելագույնը 36 միավոր: Գնահատման այս փուլում կհաշվարկվի
              միջին միավորը՝ ելնելով հանձնաժողովի անդամների թվից և նրանց
              գնահատականից։
            </p>
            <p>
            Որակավորված 20 նախագծերը կհրապարակվեն մրցույթի վեբկայքում և Հայաստանի բոլոր դպրոցականները կկարողանան առցանց քվեարկել իրենց նախընտրած նախագծի համար։ Քվեարկությունը կանցկացվի ըստ առցանց քվեարկության կանոնների։  
            </p>

            <p className="evaluate">
            Ըստ ընտրող հանձնաժողովի գնահատականի և առցանց քվեարկության արդյունքների՝ կորոշվեն 4 լավագույն նախագծերը (1 թիմ յուրաքանչյուր անվանակարգից, ընդամենը 16 հոգի)։
            </p>
          </div>

          <div className="introducion-info">
            <h4>ՀԱՂԹՈՂՆԵՐԸ ԵՎ ՄՐՑԱՆԱԿԸ</h4>
            <p>
              <span>Պարգևատրման արարողությունը</span>
            </p>
            <p className="evaluate">
              Պարգևատրման արարողությանը կմասնակցեն այն թիմերը, որոնք կհասնեն
              քվեարկության փուլին. 5-ական թիմ 4 անվանակարգերից (ընդամենը՝ 20
              թիմ): Պարգևատրման արարողությունը կանցկացվի Երևանում՝ բացօթյա էքսպո
              ցուցահանդեսի ձևաչափով, որի ընթացքում երեխաները կներկայացնեն իրենց
              նախագծերը։
            </p>
            <p>
              <span>Հաղթողները և մրցանակը</span>
            </p>
            <p className="evaluate">
              Ըստ ընտրող հանձնաժողովի գնահատականի և առցանց քվեարկության
              արդյունքների՝ կորոշվեն 4 լավագույն նախագծերը (1 թիմ յուրաքանչյուր
              անվանակարգից, ընդամենը 16 հոգի):
            </p>
            <p>
              4 հաղթող թիմերի բոլոր անդամները կստանան առողջ ապրելակերպի 7-օրյա
              ճամբարի մրցանակային ուղեգրեր, իսկ իրենց դպրոցների համար՝ սպորտ
              դահլիճի  կամ ճաշարանի համար նախատեսված սարքավորումներ: 2-րդ և 3-րդ
              տեղերը զբաղեցրած մասնակիցները կպարգևատրվեն խրախուսական
              մրցանակներով և պատվոգրերով։
            </p>
          </div>
        </div>
        <div className="seeMoreInfo">
          <button onClick={onclickPdfFile}>Իմանալ ավելին</button>
          <button onClick={onlickPartispate} className="particip">
            Մասնակցել
          </button>
        </div>
        
      </div>
    </>
  );
};

export default ProgramAbout;
