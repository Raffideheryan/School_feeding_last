import React, { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../../UserContext";
import "./Vote.css";
import { Terms } from "./Terms";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

// Set the path to the worker script

export const Discovering = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [name3, setName3] = useState("");
  const [name4, setName4] = useState("");

  const [files, setFiles] = useState([]);
  const [filesPresentation, setFilesPresentation] = useState([]);
  const [filesPhotos, setFilesPhotos] = useState([]);
  const [filesPdf, setFilesPdf] = useState([]);
  const [filesVideo, setFilesVideo] = useState([]);
  const [showProgress, setShowProgress] = useState(false);

  const [isChecked, setisChecked] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // errors

  const [errorFiles, setErrorFiles] = useState(false);
  const [errorFilesPhotos, setErrorFilesPhotos] = useState(false);
  const [errorFilesPresentation, setErrorFilesPresentation] = useState(false);
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
  const fileInputRefPresentation = useRef();

  const { userState, userActions } = useContext(UserContext);

  // navigate
  const navigate = useNavigate();

  const onClickInfo = (e) => {
    e.preventDefault();

    if (validationNames()) {
      const formData = new FormData();
      const storedEmail = userState.formId

      formData.append("user", storedEmail);
      // Append text fields
      formData.append("name1", name1);
      formData.append("name2", name2);
      formData.append("name3", name3);
      formData.append("name4", name4);

      formData.append(`img1`, filesPhotos[0] ? filesPhotos[0] : "");
      formData.append(`img2`, filesPhotos[1] ? filesPhotos[1] : "");
      formData.append(`img3`, filesPhotos[2] ? filesPhotos[2] : "");
      formData.append(`img4`, filesPhotos[3] ? filesPhotos[3] : "");
      formData.append(`img5`, filesPhotos[4] ? filesPhotos[4] : "");

      formData.append("word", files);
      formData.append("pdf", filesPresentation);
      formData.append("pdf_only", filesPdf);
      formData.append("video", filesVideo);

      fetch("http://127.0.0.1:8000/info/projects3/", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Հաջողությամբ Դիմել եք ծրագրին ");

            if (userState.voteAgain.project_cat4) {
              navigate("/community");
            } else {
              navigate("/");
            }
          }

          if (res.status === 400) {
            toast.warning(
              "pdf,ppt կամ word  ֆայլերը  չեն համապատասխանում պահանջներին"
            );
          }

          if(res.status===500){
            toast.warning(
              "Խնդրում ենք մուտք գործել համակարգ ծրագրին դիմելու համար"
            );
            navigate('/login')
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
      toast.warning("Մասնակիցների անունները պարտադիր է ");
      errorValidate = false;
      setError1(true);
      setError2(true);
      setError3(true);
      setError4(true);
    } else if (!letterRegex1 || name1.trim() === "") {
      toast.warning(" Մասնակիցների անունները պետք է լինեն հայատառ");
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
      filesVideo.length === 0 &&
      filesPresentation.length === 0
    ) {
      toast.warning("Վերբեռնեք բոլոր ֆայլերը");
      setErrorFiles(true);
      setErrorFilesPdf(true);
      setErrorFilesPresentation(true);
      setErrorFilesPhotos(true);
      setErrorFilesVideo(true);
      errorValidate = false;
    } else if (files.length === 0) {
      setErrorFiles(true);
      errorValidate = false;
    } else if (filesPhotos.length === 0) {
      setErrorFilesPhotos(true);
      errorValidate = false;
    } else if (filesPresentation.length === 0) {
      setErrorFilesPresentation(true);
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
      setErrorFilesPresentation(false);
      setErrorFilesPhotos(false);
      setErrorFilesVideo(false);
    }

    return errorValidate;
  };

  const validationUploadMS = (file, buttonId) => {
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
    } else {
      setErrorFiles(false);
    }

    uploadFile(file, buttonId);
  };
  const validationPresentation = (file, buttonId) => {
    const allowedExtensions = ["pdf", "ppt", "pptx"];
    file = file[0];

    let fileExtension;
    if(file.name===undefined){
      toast.warning("Ներբեռնեք Փաստաթուղթը");
    }else{
      fileExtension =file.name.split(".").pop().toLowerCase()
    }
    if (fileExtension===undefined || !allowedExtensions.includes(fileExtension)) {
      toast.warning(
        "Ֆայլի անվավեր տեսակ: Խնդրում ենք վերբեռնել PDF կամ PPT ձևաչափերով  ֆայլեր"
      );
      setErrorFilesPresentation(true);
      return;
    } else {
      setErrorFilesPresentation(false);
    }
    uploadFile(file, buttonId);
  };

  const validationPdf = (file, buttonId) => {
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
    } else {
      setErrorFilesPdf(false);
    }

    uploadFile(file, buttonId);
  };

  const maxFiles = 5;

  const validationPhotos = (file, buttonId) => {
    if (file.length <= 5) {
      const allowedExtensions = ["jpg"];

      for (let i = 0; i < file.length; i++) {
        const fileExtension = file[i].name.split(".").pop().toLowerCase();
        if (fileExtension===undefined || !allowedExtensions.includes(fileExtension)) {
          toast.warning(
            "Ֆայլի անվավեր տեսակ: Խնդրում ենք վերբեռնել JPG  ձևաչափով  նկարներ"
          );
          setErrorFilesPhotos(true);
          return;
        } else {
          setErrorFilesPhotos(false);
        }
      }
    } else if (file.length >= maxFiles) {
      toast.warning(
        `Դուք կարող եք վերբեռնել առավելագույնը ${maxFiles} լուսանկար`
      );
      setErrorFilesPhotos(true);

      return;
    } else {
      setErrorFilesPhotos(false);
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
      case 5:
        validationPresentation(file, buttonId);
      default:
        break;
    }
  };

  const uploadFile = (file, buttonId) => {
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
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
      case 5:
        setFilesPresentation(file);
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
  const handleFileInputClickPresentation = () => {
    fileInputRefPresentation.current.click();
  };

  const changeisChecked = (e) => {
    setisChecked(e.target.checked);
  };

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [isChecked]);

  useEffect(() => {
    setisChecked(false);
    setResetKey((prevKey) => prevKey + 1);
    setFilesVideo([]);
    setFilesPhotos([]);
    setFiles([]);
    setFilesPresentation([]);
    setFilesPdf([]);
    setName1("");
    setName2("");
    setName3("");
    setName4("");
    window.scrollTo(0, document.body.scrollTo);
  }, []);

  return (
    <div className="lifestyle">
      <img
        src={require("../../assets/discovering.png")}
        alt=""
        className="children"
      />
      <h1>«Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր հետազոտությունը»</h1>
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
          <h2>Հետազոտության հայեցակարգը</h2>

          <span>
            հետազոտության գաղափարի և թեմայի մանրամասն նկարագրությունը, որը
            կապված է առողջ ապրելակերպի հետ (առողջ սնվել, ֆիզիկական ակտիվություն,
            առօրյա առողջ սովորություններ, մտավոր և հուզական առողջություն և
            այլն):*
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
              <p  className="fileName">{files.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք Microsoft Word ֆայլ, (երեք A4 էջից ոչ ավելի, Times
                  New Roman 12 տառատեսակով)*
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
            <li>
              թե ինչ մտահոգություններ են առաջացրել հետազոտության
              անհրաժեշտությունը,;
            </li>
            <li>գաղափարի կամ խնդրի արդիականությունը,</li>
            <li>գործնական նշանակությունը,</li>
            <li>hետազոտության հիմքում դրված հիմնական հարցերը,</li>
            <li>
              ինչ մեթոդներ և գործիքներ են օգտագործվել հետազոտությունն
              իրականացնելու համար. եզակի և ստեղծագործական մեթոդների
              նկարագրություն, Հետազոտության մեթոդաբանության բացատրություն՝
              ներառյալ տվյալների հավաքագրման մեթոդները, օգտագործված ժամանակակից
              գործիքները,e used;
            </li>
            <li>
              ի՞նչ եզրակացություններ են արվել հետազոտության արդյունքում.
              հետազոտությունից ստացված էական պատկերացումների նկարագրություն և
              բացատրություն, թե ինչպես կարելի է Հետազոտության արդյունքները
              գործնականում կիրառել առօրյա կյանքում՝ այն ավելի առողջ դարձնելու
              համար:
            </li>
          </ul>
          <span>
            Խնդրում ենք նշել այն ուսուցչին, ով ձեզ ուղղորդել է ձեր աշխատանքի
            ընթացքում:
          </span>
        </div>
      </div>

      <div className="game">
        <div className="concept">
          <h2>Հետազոտության գործընթացը նկարագրող շնորհանդես։*</h2>
        </div>

        <div
          className={errorFilesPresentation ? "errorfiles upload" : "upload"}
        >
          <div className="upload-concept">
            <div>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, 5)}
                name={"file"}
                hidden
                ref={fileInputRefPresentation}
                key={resetKey}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p  className="fileName">{filesPresentation.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք փաստաթուղթ  *.pdf կամ *.ppt ձևաչափերով
                  (առավելագույնը 15 էջ)
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button
              className="select"
              onClick={handleFileInputClickPresentation}
            >
              Ընտրեք ֆայլը
            </button>
          </div>
        </div>

        <div className="info">
          <span> Շնորհանդեսը պետք է ներառի հետևյալ բաժինները.</span>

          <ul>
            <li>տեղեկատվության վերլուծություն և գրականության ակնարկ,</li>
            <li>հարցազրույցներ,</li>
            <li>տվյալների վերլուծություն,</li>
            <li>եզրակացություններ և բացահայտումներ։</li>
          </ul>
        </div>
      </div>

      <div className="photos">
        <div className="concept">
          <h2> Lուսանկարներ</h2>
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
                  return <p  className="fileName" key={index}>{i[index] === undefined ? "" : i[index].name}</p>;
                })}
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք հետազոտության գործընթացի լուսանկարներ/սկանավորումներ
                  JPG ձևաչափով (5 հատից ոչ ավելի)*
                </p>
              </h4>
            </div>
          </div>

          <div>
            <button className="select" onClick={handleFileInputClickPhotos}>
              Ընտրեք ֆայլը
            </button>
          </div>
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
                key={resetKey}
              />
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                title="Upload"
              />
              <p  className="fileName">{filesPdf.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք ձևավորված՝ տպելու համար պատրաստ եռածալ բուկլետ* (PDF
                  ձևաչափը պարտադիր է)։
                  <small>
                    * PDF ձևաչափով եռածալ բուկլետն   A4 ֆորմատի 2 էջ ունի
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
          <span>Հետազոտությունը նկարագրող եռածալ բուկլետը պետք է ներառի.</span>

          <ul>
            <li>
              հետազոտության հստակ  նպատակները՝ ընդգծելով, թե ինչպես է այն
              խրախուսում առողջ ապրելակերպը,
            </li>
            <li>
              հետազոտության մեջ օգտագործված մեթոդաբանության համառոտ
              ակնարկը՝ներառյալ այն, թե ինչպես են տվյալները հավաքվել և
              վերլուծվել,
            </li>
            <li>
              հետազոտության նշանակալի արդյունքներն ու բացահայտումները պարզ և
              հակիրճ ձևով:
            </li>
          </ul>
        </div>
      </div>

      <div className="video">
        <div className="concept">
          <h2>Տեսահոլովակ*</h2>
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
              <p  className="fileName">{filesVideo.name}</p>
            </div>

            <div>
              <h4>
                Ընտրեք ֆայլը և ներբեռնեք
                <p>
                  Ներբեռնեք տեսանյութ, որը չի գերազանցում  3 րոպեն. Տեսանյութի
                  ձևաչափերը՝ MP4, MOV, WMV, AVI․ Ոչ ավելի, քան 1 ԳԲ
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
          <span>Տեսահոլովակը պետք է.</span>

          <ul>
            <li>նկարագրի hետազոտության նախապատմությունը,</li>
            <li>բացահայտի հետազոտության հիմնական հարցերը,</li>
            <li>ցույց տալ հետազոտության անցկացման գործընթացը.</li>
            <li>օգտագործված որոշ մեթոդները,</li>
            <li>արդյունքների դուրս բերման գործընթացը.</li>
            <li>հիմնական եզրակացությունը։</li>
          </ul>
        </div>
      </div>

      <div className="agree">
        <div className="agree-text">
          <input
            type="checkbox"
            onChange={changeisChecked}
            checked={isChecked}
            key={resetKey}
          />
          <span>Համաձայն եմ</span>
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
