import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../UserContext";
import "./Vote.css";
import { Terms } from "./Terms";
import { toast } from "react-toastify";
import { useNavigate,useLocation } from "react-router-dom";

export const Tasty = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");

  const [files, setFiles] = useState([]);
  const [filesPhotos, setFilesPhotos] = useState([]);
  const [filesPdf, setFilesPdf] = useState([]);
  const [filesVideo, setFilesVideo] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const [isChecked, setisChecked] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // errors

  const [errorFiles, setErrorFiles] = useState(false);
  const [errorFilesPhotos, setErrorFilesPhotos] = useState(false);
  const [errorFilesPdf, setErrorFilesPdf] = useState(false);
  const [errorFilesVideo, setErrorFilesVideo] = useState(false);

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);

  // button click
  const fileInputRefMS = useRef();
  const fileInputRefPhotos = useRef();
  const fileInputRefPdf = useRef();
  const fileInputRefVideo = useRef();

  const { userState, userActions } = useContext(UserContext);

  // navigate
  const navigate = useNavigate();

  const onClickInfo = (e) => {
    e.preventDefault();
    if (validationNames()) {
      const formData = new FormData();

      formData.append("name1", name1);
      formData.append("name2", name2);
      formData.append("name3", name3);
      formData.append("name4", name4);

      formData.append(`img1`, filesPhotos[0] ? filesPhotos[0] : "");
      formData.append(`img2`, filesPhotos[1] ? filesPhotos[1] : "");
      formData.append(`img3`, filesPhotos[2] ? filesPhotos[2] : "");
      formData.append(`img4`, filesPhotos[3] ? filesPhotos[3] : "");
      formData.append(`img5`, filesPhotos[4] ? filesPhotos[4] : "");
      formData.append(`img6`, filesPhotos[5] ? filesPhotos[5] : "");
      formData.append(`img7`, filesPhotos[6] ? filesPhotos[6] : "");
      formData.append(`img8`, filesPhotos[7] ? filesPhotos[7] : "");
      formData.append(`img9`, filesPhotos[8] ? filesPhotos[8] : "");
      formData.append(`img10`, filesPhotos[9] ? filesPhotos[9] : "");

      formData.append("word", files);
      formData.append("pdf", filesPdf);
      formData.append("video", filesVideo);

      fetch("http://127.0.0.1:8000/info/projects2/", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status===201) {
            toast.success("Հաջողությամբ Դիմել եք ծրագրին ");
            

            if (userState.voteAgain.project_cat3) {
              navigate("/discovering");
            } else if (userState.voteAgain.project_cat4) {
              navigate("/community");
            } else {
              navigate("/");
            }
          } 
          
          if (res.status === 400) {
            toast.warning(
              "pdf կամ word  ֆայլերը  չեն համապատասխանում պահանջներին"
            );
          }
        })
        .catch((err) => {
          toast.warning("Չհաջողվեց");
        });
    }
  };

  // validation

  const validationNames = () => {
    let errorValidate = true;
    const letterRegex1 = /^[\u0531-\u0556\u0561-\u0587\s]+$/u.test(name1);
    const letterRegex2 = /^[\u0531-\u0556\u0561-\u0587\s]+$/u.test(name2);
    const letterRegex3 = /^[\u0531-\u0556\u0561-\u0587\s]+$/u.test(name3);
    const letterRegex4 = /^[\u0531-\u0556\u0561-\u0587\s]+$/u.test(name4);
    if (name1 === "" || name2 === "" || name3 === "" || name4 === "") {
      toast.warning("Մասնակիցների անունները պարտադիր է");
      errorValidate = false;
      setError1(true);
      setError2(true);
      setError3(true);
      setError4(true);
    } else if (!letterRegex1 || name1.trim() === "") {
      toast.warning("Մասնակիցների անունները պետք է լինեն հայատառ");
      errorValidate = false;
      setError1(true);
    } else if (!letterRegex2 || name2.trim() === "") {
      toast.warning(" Մասնակիցների անունները պետք է լինեն հայատառ");
      errorValidate = false;
      setError2(true);
    } else if (!letterRegex3 || name3.trim() === "") {
      toast.warning(" Մասնակիցների անունները պետք է լինեն հայատառ");
      errorValidate = false;
      setError3(true);
    } else if (!letterRegex4 || name4.trim() === "") {
      toast.warning(" Մասնակիցների անունները պետք է լինեն հայատառ");
      errorValidate = false;
      setError4(true);
    } else {
      setError1(false);
      setError2(false);
      setError3(false);
      setError4(false);
    }

    if (
      files.length === 0 &&
      filesPhotos.length === 0 &&
      filesPdf.length === 0 &&
      filesVideo.length === 0
    ) {
      toast.warning("Վերբեռնեք բոլոր ֆայլերը");
      setErrorFiles(true);
      setErrorFilesPdf(true);
      setErrorFilesPhotos(true);
      setErrorFilesVideo(true);
      errorValidate = false;
    } else if (files.length === 0) {
      setErrorFiles(true);
      errorValidate = false;
    } else if (filesPhotos.length === 0) {
      setErrorFilesPhotos(true);
      errorValidate = false;
    } else if (filesPdf.length === 0) {
      setErrorFilesPdf(true);
      errorValidate = false;
    } else if (filesVideo.length === 0) {
      setErrorFilesVideo(true);
      errorValidate = false;
    } else {
      setErrorFiles(false);
      setErrorFilesPdf(false);
      setErrorFilesPhotos(false);
      setErrorFilesVideo(false);
    }

    return errorValidate;
  };

  const validationUploadMS =  (file, buttonId) => {
    const allowedExtensions = ["doc", "docx"];
    file = file[0];
    let fileExtension;
    if(file.name===undefined){
      toast.warning("Ներբեռնեք Փաստաթուղթը");
    }else{
      fileExtension =file.name.split(".").pop().toLowerCase()
    }
    if (fileExtension===undefined || !allowedExtensions.includes(fileExtension)) {
      toast.warning(
        "Ֆայլի անվավեր տեսակ: Խնդրում ենք վերբեռնել Word փաստաթուղթ (doc կամ docx):"
      );
      setErrorFiles(true);
      return;
    }else {
      setErrorFiles(false);
    }

     uploadFile(file, buttonId);
  };

  const maxFiles = 10;

  const validationPhotos =  (file, buttonId) => {
    if (file.length <= 10) {
      const allowedExtensions = ["jpg"];

      for (let i = 0; i < file.length; i++) {
        const fileExtension = file[i].name.split(".").pop().toLowerCase();
        if (fileExtension===undefined || !allowedExtensions.includes(fileExtension)) {
          toast.warning(
            "Ֆայլի անվավեր տեսակ: Խնդրում ենք վերբեռնել JPG  տեսակի նկարներ"
          );
          setErrorFilesPhotos(true);
          return;
        } else {
          setErrorFilesPhotos(false);
        }
      }

       uploadFile(file, buttonId);
    } else if (file.length >= maxFiles) {
      toast.warning(
        `Դուք կարող եք վերբեռնել առավելագույնը ${maxFiles} լուսանկար`
      );
      setErrorFilesPhotos(true);

      return;
    } else {
      setErrorFilesPhotos(false);
    }
  };

  const validationPdf =  (file, buttonId) => {
    const allowedExtensions = ["pdf"];
    file = file[0];

    let fileExtension;
    if(file.name===undefined){
      toast.warning("Ներբեռնեք Փաստաթուղթը");
    }else{
      fileExtension =file.name.split(".").pop().toLowerCase()
    }  
    if (fileExtension===undefined || !allowedExtensions.includes(fileExtension)) {
      toast.warning("Ֆայլի անվավեր տեսակ: Խնդրում ենք վերբեռնել PDF ֆայլ");
      setErrorFilesPdf(true);
      return;
    }else {
      setErrorFilesPdf(false);
    }

   uploadFile(file, buttonId);
  };
  const validationVideo = async (file, buttonId) => {
    file = file[0];

    const allowedFormats = [
      "video/mp4",
      "video/quicktime",
      "video/x-ms-wmv",
      "video/avi",
    ];
    const maxDurationInSeconds = 180; // 3 minutes
    const maxFileSizeInBytes = 1 * 1024 * 1024 * 1024; // 1 GB

    if (file.type===undefined || !allowedFormats.includes(file.type)) {
      toast.warning(
        "Տեսանյութի անվավեր ձևաչափ: Խնդրում ենք վերբեռնել տեսանյութ MP4, MOV, WMV կամ AVI ձևաչափով"
      );
      setErrorFilesVideo(true);
      return;
    } else {
      setErrorFilesVideo(false);
    }

    if (file.size > maxFileSizeInBytes) {
      toast.warning(
        "Ֆայլի չափը գերազանցում է սահմանաչափը (1 ԳԲ): Խնդրում ենք վերբեռնել ավելի փոքր ֆայլ"
      );
      setErrorFilesVideo(true);
      return;
    } else {
      setErrorFilesVideo(false);
    }

    const videoDuration = await getVideoDuration(file);
    if (videoDuration > maxDurationInSeconds) {
      toast.warning(
        "Տեսանյութի տևողությունը գերազանցում է սահմանաչափը (3 րոպե): Խնդրում ենք վերբեռնել ավելի կարճ տեսանյութ"
      );
      setErrorFilesVideo(true);
      return;
    } else {
      setErrorFilesVideo(false);
    }

    await uploadFile(file, buttonId);
  };

  // video duration
  const getVideoDuration = async (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        resolve(Math.round(video.duration));
      };
      video.onerror = reject;
      video.src = URL.createObjectURL(file);
    });
  };
  const handleFileChange = (event, buttonId) => {
    const file = event.target.files;

    if (!file) {
      return;
    }

    switch (buttonId) {
      case 1:
        validationUploadMS(file, buttonId);
        break;
      case 2:
        validationPhotos(file, buttonId);
        break;
      case 3:
        validationPdf(file, buttonId);
        break;
      case 4:
        validationVideo(file, buttonId);
        break;
      default:
        break;
    }
  };

  const uploadFile = (file, buttonId) => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      const fileName =
        file[i].name.length > 12
          ? `${file[i].name.substring(0, 13)}... .${file[i].name.split(".")[1]}`
          : file[i].name;
      formData.append("file", file[i]);
    }

    switch (buttonId) {
      case 1:
        setFiles(file);
        break;
      case 2:
        setFilesPhotos(file);
        break;
      case 3:
        setFilesPdf(file);
        break;
      case 4:
        setFilesVideo(file);
        break;
      default:
        break;
    }
    setShowProgress(true);
  };

  const handleFileInputClickMS = () => {
    fileInputRefMS.current.click();
  };
  const handleFileInputClickPhotos = () => {
    fileInputRefPhotos.current.click();
  };
  const handleFileInputClickPdf = () => {
    fileInputRefPdf.current.click();
  };
  const handleFileInputClickVideo = () => {
    fileInputRefVideo.current.click();
  };

  const changeisChecked = (e) => {
    setisChecked(e.target.checked);
  };

  useEffect(()=>{
    window.scrollTo(0, document.body.scrollHeight);
  },[isChecked])

  useEffect(() => {
    setisChecked(false);
    setResetKey((prevKey) => prevKey + 1);
    setFilesVideo([]);
    setFiles([]);
    setFilesPhotos([]);
    setFilesPdf([])
    setName1("")
    setName2("")
    setName3("")
    setName4("")
    window.scrollTo(0, document.body.scrollTo);


  }, []);

  return (
    <div className="lifestyle">
      <img
        src={require("../../assets/tasty.png")}
        alt=""
        className="children"
      />
      <h1>«Համեղ և առողջարար. իմ սիրելի առողջարար բաղադրատոմսը» անվանակարգի</h1>
      <div className="names">
        <h2>Լրացրե՛ք թիմի 4 անդամի (դպրոցականների) անուն-ազգանունը*</h2>
        <input
          type="text"
          placeholder="Ձեր պատասխանը"
          onChange={(e) => setName1(e.target.value)}
          className={error1 ? "error" : ""}
          value={name1}
        />
        <input
          type="text"
          placeholder="Ձեր պատասխանը"
          onChange={(e) => setName2(e.target.value)}
          className={error2 ? "error" : ""}
          value={name2}

        />
        <input
          type="text"
          placeholder="Ձեր պատասխանը"
          onChange={(e) => setName3(e.target.value)}
          className={error3 ? "error" : ""}
          value={name3}

        />
        <input
          type="text"
          placeholder="Ձեր պատասխանը"
          onChange={(e) => setName4(e.target.value)}
          className={error4 ? "error" : ""}
          value={name4}

        />
      </div>

      <div className="game">
        <div className="concept">
          <h2>
            «Համեղ և առողջարար. իմ սիրելի առողջարար բաղադրատոմսը» անվանակարգ
          </h2>

          <span>
            1. Առողջ բաղադրատոմսի հայեցակարգը. բաղադրատոմսի անվանումը և
            մանրամասն նկարագրությունը (բաղադրատոմսը կարող է նախատեսված լինել
            նախաճաշի, ճաշի, ընթրիքի համար, ներկայացնել խորտիկ, աղցան կամ
            աղանդեր: Բաղադրատոմսը կարող է  արդեն գոյություն ունենալ, բայց այդ
            դեպքում նշեք, թե ինչն է ձեր տարբերակը յուրահատուկ դարձնում):*{" "}
          </span>
          <span>
            2. նախատեսվա լինել նախաճաշի, ճաշի, ընթրիքի համար, ներկայացնել
            խորտիկ, աղցան կամ աղանդեր: Բաղադրատոմսը կարող է
          </span>
        </div>

        <div className={errorFiles ? "errorfiles upload" : "upload"}>
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 1)}
                name={"file"}
                hidden
                ref={fileInputRefMS}
                key={resetKey}

              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{files.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք տեքստային փաստաթուղթը (Microsoft Word ֆայլի երեք A4
                  էջից ոչ ավելի,  Times New Roman տառատեսակի 12 չափը)*
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickMS}>
              Ընտրեք ֆայլը
            </button>
          </div>
        </div>

        <div className="info">
          <span>Հայեցակարգը պետք է արտացոլի.</span>     
          <ul>
            <li>անհրաժեշտ բաղադրիչների ցանկը և քանակը,</li>
            <li>անհրաժեշտ պարագաները և սարքավորումները,</li>
            <li>պատրաստման ժամանակը,</li>
            <li>պատրաստման գործընթացի քայլ առ քայլ նկարագրությունը,</li>
            <li>խորհուրդներ ավելի լավ արդյունք ունենալու համար (եթե կան):</li>
          </ul>
          <span> Սննդային արժեքը.</span>
          <span>
            Մանրամասներ սննդային բովանդակության վերաբերյալ՝ ներառյալ
            նկարագրությունը, թե ինչ օգտակար բաղադրիչներ է պարունակում ուտեստը:
          </span>
          <span>  Արդիականություն և ավանդույթներ.</span>
          <ul>
            <li>
              ինչո՞ւ է ընտրվել հենց այս ուտեստը, դրա ծագումը, պատմական արմատները
              (եթե հայտնի են),
            </li>
            <li>
              օրվա ո՞ր ժամի, կամ ի՞նչ տոնի համար կարելի է խորհուրդ տալ այս
              ուտեստը:
            </li>
            <li>
              արդյոք բաղադրատոմսը պատրաստելու ժամանակ օգտագործվե՞լ են ավանդական
              բաղադրիչներ կամ խոհարարական գաղտնիքներ:
            </li>
          </ul>
        </div>
      </div>

      <div className="photos">
        <div className="concept">
          <h2> Լուսանկարներ, </h2>
          <span>
            որոնք պատկերում են բաղադրիչների ամբողջ ցանկը, երեխաներին՝ ճաշատեսակի
            պատրաստման  ընթացքում և արդեն պատրաստի ուտեստը։*
          </span>
        </div>

        <div className={errorFilesPhotos ? "errorfiles upload" : "upload"}>
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 2)}
                name={"file"}
                hidden
                ref={fileInputRefPhotos}
                multiple
                key={resetKey}

              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              {filesPhotos &&
                [filesPhotos].map((i, index) => {
                  return <p key={index}>{i[index] === undefined ? "" : i[index].name}</p>;
                })}
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>Ներբեռնեք JPG ձևաչափով լուսանկարները (10 հատից ոչ ավել):</p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickPhotos}>
              Ընտրեք ֆայլը
            </button>
          </div>
        </div>

        <div className="info">
          <span>
            Խնդրում ենք ներբեռնել լուսանկարներ, որոնք հետագայում կարող են
            օգտագործվել տպագրական նյութերում: Լուսանկարները պետք է լինեն որակյալ
            և արված լավ լուսավորության ներքո: Լուսանկարները պետք է արված լինեն
            վերևից՝ սպիտակ ֆոնի վրա։ Ճաշատեսակը պետք է նկարել առանց նախշերի
            սպիտակ ափսեի վրա։
          </span>
        </div>
      </div>

      <div className="leaflet">
        <div className="concept">
          <h2>Եռածալ բուկլետ*</h2>
        </div>

        <div className={errorFilesPdf ? "errorfiles upload" : "upload"}>
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 3)}
                name={"file"}
                hidden
                ref={fileInputRefPdf}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
                key={resetKey}

              />
              <p>{filesPdf.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք ձևավորված՝ տպելու համար պատրաստ եռածալ բուկլետ* (PDF
                  ձևաչափը պարտադիր է)։
                  <small>
                    * PDF ձևաչափով եռածալ բուկլետը   A4  ֆորմատի 2 էջ ունի
                    (բուկլետի առջևի և հետևի մասերը), որոնցից յուրաքանչյուրը
                    բաժանված է 3 ուղղանկյուն հատվածների (սյունակների)։
                  </small>
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickPdf}>
              Ընտրեք ֆայլը
            </button>
          </div>
        </div>

        <div className="info">
          <span>Նախագծված եռածալ բուկլետը պետք է ներառի.</span>

          <ul>
            <li>
              Բաղադրատոմսի հստակ նկարագրությունը՝ ընդգծելով, թե ինչու է առողջ։
            </li>
            <li>
              Ճաշատեսակի պատրաստման համար անհրաժեշտ բոլոր բաղադրիչների և
              խոհանոցային պարագաների ցանկը՝ հաշվի առնելով մթերքների
              հասանելիությունն  ու պարզությունը:
            </li>
            <li>
              Ճաշատեսակի պատրաստման հստակ, քայլ առ քայլ, հեշտ կատարվող
              հրահանգները՝ հասակակիցների համար հասանելի կերպով նկարագրված։
            </li>
          </ul>
        </div>
      </div>

      <div className="video">
        <div className="concept">
          <h2>Տեսահոլովակը*</h2>
        </div>

        <div className={errorFilesVideo ? "errorfiles upload" : "upload"}>
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 4)}
                name={"file"}
                hidden
                ref={fileInputRefVideo}
                key={resetKey}

              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p>{filesVideo.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք տեսանյութ, որը չի գերազանցում  3 րոպեն. Տեսանյութի
                  ձևաչափերը՝ MP4, MOV, WMV, AVI․ Ոչ ավելի, քան 1 ԳԲ.
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickVideo}>
              Ընտրեք ֆայլը
            </button>
          </div>
        </div>

        <div className="info">
          <span>Տեսահոլովակը պետք է ցույց տա․</span>

          <ul>
            <li>բաղադրիչները և պատրաստման հրահանգները,</li>
            <li>բաղադրատոմսի պատրաստման գործընթացը, of the Recipe;</li>
            <li>երեխաների ներգրավվածությունը պատրաստման գործընթացի մեջ,</li>

            <li>պատրաստի ուտեստի վերջնական տեսքը,</li>
            <li>
              պատրաստման նորարարական մեթոդները կամ յուրահատուկ խոհարարական
              մոտեցումը (եթե կան):
            </li>
          </ul>
        </div>
      </div>

      <div className="agree">
        <div className="agree-text">
          <input type={"checkbox"}   onChange={changeisChecked}
        checked={isChecked}
        key={resetKey}  />
          <span>Համաձայն եմ </span>
        </div>
        <div className="term">
          <a href="#" onClick={userActions.toggleModal}>
            Պայմաններ
          </a>
          <Terms />
        </div>
      </div>
      <div className="submit">
        {isChecked && <button onClick={onClickInfo}>Դիմել</button>}
      </div>
    </div>
  );
};
