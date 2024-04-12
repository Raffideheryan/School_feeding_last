import React, { useContext,useState } from "react";
import "./formStyle.css";
import imageMain from "../../assets/imageApplicationForm.png";
import { useNavigate } from "react-router-dom";
import { CountDown } from "./../countdown/CountDown";
import { toast } from "react-toastify";
import { UserContext } from "../../UserContext";

export default function Forms() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const { userState, userActions } = useContext(UserContext);

  const [infoForm, setInfoForm] = useState({
    region: "",
    town: "",
    school_name: "",
    contact_person: "",
    birth: "",
    email: "",
    phone: "",
    age_cat: "",
    project_cat1: "",
    project_cat2: "",
    user:""
  });

  // errors
  const [errorregion, setErrorregion] = useState(false);
  const [errortown, setErrortown] = useState(false);
  const [errorphone, setErrorphone] = useState(false);
  const [errorcontact_person, setErrorcontact_person] = useState(false);
  const [errorschool_name, setErrorschool_name] = useState(false);
  const [erroremail, setErroremail] = useState(false);
  const [errorBirthDay, setErrorBirthDay] = useState(false);
  const [selected, setSelected] = useState("");
  const current = new Date().toISOString().split("T")[0];

  // checkboxes
  const [programsDisable, setProgramsDisable] = useState({
    project_cat1Disable: true,
    project_cat2Disable: true,
  });

  const [programsDisableSecond, setProgramsDisableSecond] = useState({
    project_cat3Disable: true,
    project_cat4Disable: true,
  });

  const [programsChecked, setProgramsChecked] = useState({
    project_cat1: false,
    project_cat2: false,
    project_cat3: false,
    project_cat4: false,
  });


  const validete = (values) => {
    let errors = true;
    const regExpMail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const regExpText = /^[\u0531-\u0556\u0561-\u0587\s]+$/u;
    const regExpNameUsername = /^[\u0531-\u0556\u0561-\u0587\s]+$/u;
    const regExpPhone =
    /^(091|097|096|099|043|077|093|094|098|055|095|041|033|044)\d{6}$/;
    const regExpBirthDay = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    // Validation region
    if (!values.region) {
      toast.warning(" Մարզ դաշտը պարտադիր է");
      errors = false;
      setErrorregion(true);
    } else {
      setErrorregion(false);
    }
    //

    // Validation town or city vailidation
    if (!values.town) {
      toast.warning("Քաղաք/Գյուղ դաշտը պարտադիր է");
      errors = false;
      setErrortown(true);
    } else {
      setErrortown(false);
    }

    // Validation scool name
    if (!values.school_name) {
      toast.warning(" Դպրոց դաշտը պարտադիր է");
      errors = false;
      setErrorschool_name(true);
    } else {
      setErrorschool_name(false);
    }
    //

    // Validation Adult Contact Person person
    if (!values.contact_person) {
      toast.warning(" Մեծահասակի կոնտակտային տվյալներ դաշտը պարտադիր է");
      errors = false;
      setErrorcontact_person(true);
    } else if (
      !regExpNameUsername.test(values.contact_person.trim()) &&
      values.contact_person.trim() !== ""
    ) {
      toast.warning(
        " Մեծահասակի կոնտակտային տվյալներ դաշտը պետք է լինի հայատառ"
      );
      errors = false;
      setErrorcontact_person(true);
    } else if (values.contact_person.length < 3) {
      toast.warning(" Տվյալները պետք է լինի 3-տառ եվ ավելի");
      errors = false;
      setErrorcontact_person(true);
    } else {
      setErrorcontact_person(false);
    }

    //Validation birthdate
    if (!values.birth) {
      toast.warning("Կոնտակտային անձի ծննդյան ամսաթիվը պարտադիր է");
      errors = false;
      setErrorBirthDay(true);
    } else if (!regExpBirthDay.test(values.birth)) {
      toast.warning(
        "Ծննդյան ամսաթիվը պետք է լինի օրինակին համապատասխան օր/ամիս/տարի"
      );
      errors = false;
      setErrorBirthDay(true);
    } else {
      setErrorBirthDay(false);
    }

    // Validation email
    if (!values.email) {
      toast.warning(" Էլեկտրոնային Հասցե դաշտը պարտադիր է");
      errors = false;
      setErroremail(true);
    } else if (!regExpMail.test(values.email)) {
      toast.warning("Էլեկտրոնային հասցեն սխալ է");
      setErroremail(true);
      errors = false;
    } else {
      setErroremail(false);
    }

    // Validation Phone
    if (!values.phone) {
      toast.warning(" Հեռախոսահամար դաշտը պարտադիր է");
      errors = false;
      setErrorphone(true);
    } else if (!regExpPhone.test(infoForm.phone)) {
      toast.warning(
        " Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094555555"
      );
      errors = false;
      setErrorphone(true);
    } else {
      setErrorphone(false);
    }

    //Validetion sdool class
    if (!values.age_cat) {
      toast.warning("Դասարան նշելը պարտադիր է");
    }

    //Validetion sdool programs
    if (values.age_cat == "5-6 դասարան") {
      if (!values.project_cat1 && !values.project_cat2) {
        toast.warning("Ծրագիր նշելը պարտադիր է");
      }
    } else if (values.age_cat == "7-8 դասարան") {
      if (!values.project_cat3 && !values.project_cat4) {
        toast.warning("Ծրագիր նշելը պարտադիր է");
      }
    } else if (
      values.age_cat ==
        "Ունենք երկու տարիքային խմբերի 2 թիմ (5-6 և 7-8 դասարաններ):" &&
      !values.project_cat1 &&
      !values.project_cat2 &&
      !values.project_cat3 &&
      !values.project_cat4
    ) {
      toast.warning("Ծրագիր նշելը պարտադիր է");
    }
    return errors;
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleProgramChange = (e) => {
    const targetName = e.target.name;
    const isChecked = e.target.checked;
    if (
      selected === "Ունենք երկու տարիքային խմբերի 2 թիմ (5-6 և 7-8 դասարաններ):"
    ) {
      if (targetName === "project_cat1" && isChecked === true) {
        setProgramsDisable({
          project_cat1Disable: false,
          project_cat2Disable: true,
        });
        handleChange(e);
      } else if (targetName === "project_cat1" && isChecked === false) {
        setProgramsDisable({
          project_cat1Disable: false,
          project_cat2Disable: false,
        });
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      } else if (targetName === "project_cat2" && isChecked === true) {
        setProgramsDisable({
          project_cat1Disable: true,
          project_cat2Disable: false,
        });
        handleChange(e);
      } else if (targetName === "project_cat2" && isChecked === false) {
        setProgramsDisable({
          project_cat1Disable: false,
          project_cat2Disable: false,
        });
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      }
      // program 2

      if (targetName === "project_cat3" && isChecked === true) {
        setProgramsDisableSecond({
          project_cat3Disable: false,
          project_cat4Disable: true,
        });
        handleChange(e);
      } else if (targetName === "project_cat3" && isChecked === false) {
        setProgramsDisableSecond({
          project_cat3Disable: false,
          project_cat4Disable: false,
        });
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      } else if (targetName === "project_cat4" && isChecked === true) {
        setProgramsDisableSecond({
          project_cat3Disable: true,
          project_cat4Disable: false,
        });
        handleChange(e);
      } else if (targetName === "project_cat4" && isChecked === false) {
        setProgramsDisableSecond({
          project_cat3Disable: false,
          project_cat4Disable: false,
        });
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      }
    }

    if (selected === "5-6 դասարան") {
      if (targetName === "project_cat1" && isChecked === true) {
        handleChange(e);
      }
      if (targetName === "project_cat1" && isChecked === false) {
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      } else if (targetName === "project_cat2" && isChecked === true) {
        handleChange(e);
      } else if (targetName === "project_cat2" && isChecked === false) {
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      }
    }

    if (selected === "7-8 դասարան") {
      if (targetName === "project_cat3" && isChecked === true) {
        handleChange(e);
      }
      if (targetName === "project_cat3" && isChecked === false) {
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      } else if (targetName === "project_cat4" && isChecked === true) {
        handleChange(e);
      } else if (targetName === "project_cat4" && isChecked === false) {
        e.target.name = targetName;
        e.target.value = "";
        handleChange(e);
      }
    }

    // Update the programsChecked state based on the checkbox name
    setProgramsChecked((prevState) => ({
      ...prevState,
      [targetName]: isChecked,
    }));
  };

  const handleSubmitAl = (e) => {
    e.preventDefault();

    if (validete(infoForm)) {
    const storedEmail = localStorage.getItem("email");
      infoForm.user = storedEmail
      setErrorMessage(true);
      async function submitInfoForm() {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/info/applicationform/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(infoForm),
            }
          );

          if (response.ok) {
            if (infoForm.project_cat1) {
              navigate("/lifestyle");
            } else if (infoForm.project_cat2) {
              navigate("/tasty");
            } else if (infoForm.project_cat3) {
              navigate("/discovering");
            } else if (infoForm.project_cat4) {
              navigate("/community");
            }
            userActions.setVoteAgain(infoForm);
          } else if (response.status === 400) {
            toast.warning("Այս Էլ-հասցեն գոյություն ունի համակարգում");
            setErroremail(true);
          }
        } catch (error) {
          toast.warning("Չհաջողվեց");
        }
      }
      submitInfoForm();
    }
  };

  const clearErrors = (e) => {
    if (e) {
      e.preventDefault();
    }
    setErrorMessage({});
  };

  const handleClear = (e) => {
    e.preventDefault();
    // Reset all form fields to their initial state
    setProgramsChecked({
      project_cat1: false,
      project_cat2: false,
      project_cat3: false,
      project_cat4: false,
    });
    setProgramsDisable({
      project_cat1Disable: false,
      project_cat2Disable: false,
      project_cat3Disable: false,
      project_cat4Disable: false,
    });

    // Reset other form fields as needed
    handleChange({ target: { name: "region", value: "" } });
    handleChange({ target: { name: "town", value: "" } });
    handleChange({ target: { name: "school_name", value: "" } });
    handleChange({ target: { name: "contact_person", value: "" } });
    handleChange({ target: { name: "birth", value: "" } });
    handleChange({ target: { name: "email", value: "" } });
    handleChange({ target: { name: "phone", value: "" } });
    handleChange({ target: { name: "age_cat", value: "" } });
    handleChange({ target: { name: "project_cat1", value: "" } });
    handleChange({ target: { name: "project_cat2", value: "" } });
    handleChange({ target: { name: "project_cat3", value: "" } });
    handleChange({ target: { name: "project_cat4", value: "" } });

    // Clear error messages by calling clearErrors function
    clearErrors();
  };

  const handleClassChange = (e) => {
    // if((e.target.value)==="Ունենք երկու տարիքային խմբերի 2 թիմ (7-8 և 7-8 դասարաններ):"){

    // }
    const selectedClass = e.target.value;
    setSelected(selectedClass);
    let updatedDisableState = {};
    let updatedCheckedState = {
      project_cat1: false,
      project_cat2: false,
      project_cat3: false,
      project_cat4: false,
    };

    if (selectedClass === "5-6 դասարան") {
      setProgramsDisable({
        project_cat1Disable: false,
        project_cat2Disable: false,
      });
      setProgramsDisableSecond({
        project_cat3Disable: true,
        project_cat4Disable: true,
      });

      // infoForm.project_cat3 = "";
      // infoForm.project_cat4 = "";
    } else if (selectedClass === "7-8 դասարան") {
      setProgramsDisable({
        project_cat1Disable: true,
        project_cat2Disable: true,
      });
      setProgramsDisableSecond({
        project_cat3Disable: false,
        project_cat4Disable: false,
      });

      infoForm.project_cat1 = "";
      infoForm.project_cat2 = "";
    } else {
      updatedDisableState = {
        project_cat1Disable: false,
        project_cat2Disable: false,
        project_cat3Disable: false,
        project_cat4Disable: false,
      };
      setProgramsDisable({
        project_cat1Disable: false,
        project_cat2Disable: false,
      });
      setProgramsDisableSecond({
        project_cat3Disable: false,
        project_cat4Disable: false,
      });
      console.log(infoForm);

      infoForm.project_cat1 = "";
      infoForm.project_cat2 = "";
      infoForm.project_cat3 = "";
      infoForm.project_cat4 = "";
    }

    setProgramsChecked(updatedCheckedState);
    handleChange(e);
  };

  return (
    <div className="formContainer">
      <div className="formContainerImage">
        <img src={imageMain} alt="image" />
      </div>
      <CountDown />
      {/* <pre>{JSON.stringify(infoForm, undefined, 2)}</pre> */}
      <div className="time-block"></div>
      <div className="formBlock">
        <form action="" onSubmit={handleSubmitAl}>
          <h2 className="formTitle">Գրանցման Դաշտ</h2>
          <div className="formItem">
            <label htmlFor="region" className="formItemLabel1">
              Մարզ*
            </label>
            <div className="select-wrapper">
              <select
                name="region"
                onChange={handleChange}
                value={infoForm.region}
                className={errorregion ? "error" : ""}
              >
                <option value="">Ընտրել</option>
                <option value="Արագածոտն">Արագածոտն</option>
                <option value="Արմավիր">Արմավիր</option>
                <option value="Արարատ">Արարատ</option>
                <option value="Գեղարքունիք">Գեղարքունիք</option>
                <option value="Կոտայք">Կոտայք</option>
                <option value="Լոռի">Լոռի</option>
                <option value="Շիրակ">Շիրակ</option>
                <option value="Սյունիք">Սյունիք</option>
                <option value="Տավուշ">Տավուշ</option>
                <option value="Վայոց Ձոր"> Վայոց Ձոր</option>
                <option value="Երևան">Երևան </option>
              </select>
            </div>
          </div>
          <div className="formItem m-top">
            <label htmlFor="town" className="m-bottom formItemLabel1">
              Քաղաք/Գյուղ*
            </label>
            <input
              type="text"
              placeholder="Քաղաք/գյուղ"
              name="town"
              className={`formItemInput1 ${errortown ? "error" : ""}`}
              value={infoForm.town}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="school_name" className="m-bottom formItemLabel1">
              Դպրոցի Անուն*
            </label>
            <input
              type="text"
              placeholder="Դպրոց"
              name="school_name"
              className={`formItemInput1 ${errorschool_name ? "error" : ""}`}
              value={infoForm.school_name}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="contact_person" className="m-bottom formItemLabel1">
              Մեծահասակի կոնտակտային տվյալները
              <span>
                {" "}
                (ուսուցիչ, դպրոցի ծրագրի համակարգող) (անուն, ազգանուն)*
              </span>
            </label>
            <input
              type="text"
              placeholder="Անուն Ազգանուն"
              name="contact_person"
              className={`formItemInput1 ${errorcontact_person ? "error" : ""}`}
              value={infoForm.contact_person}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="birth" className="m-bottom formItemLabel1">
              Կոնտակտային անձի ծննդյան ամսաթիվը
            </label>
            <input
              type="date"
              name="birth"
              className={`formItemInput1 ${errorBirthDay ? "error" : ""}`}
              value={infoForm.birth}
              onChange={handleChange}
              max={current}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="email" className="m-bottom formItemLabel1">
              Էլեկտրոնային Հասցե*
            </label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր Էլեկտրոնային Հասցեն"
              name="email"
              className={`formItemInput1 ${erroremail ? "error" : ""}`}
              value={infoForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="formItem m-top">
            <label htmlFor="phone" className="m-bottom formItemLabel1">
              Հեռախոսահամար ձևաչափը:094555555*
            </label>
            <input
              type="text"
              placeholder="Մուտքագրեք Ձեր Հեռախոսահամարը"
              name="phone"
              className={`formItemInput1 ${errorphone ? "error" : ""}`}
              value={infoForm.phone}
              onChange={handleChange}
            />
          </div>

          <div className="formItem m-top">
            <label htmlFor="age_cat" className="formItemLabel1">
              Ո՞ր դասարաններն են ներկայացնելու ձեր թիմը (թիմերը):
            </label>

            <div className="formScoolBlock">
              <div>
                <input
                  type="checkbox"
                  value="5-6 դասարան"
                  name="age_cat"
                  onChange={handleClassChange}
                  checked={infoForm.age_cat === "5-6 դասարան"}
                />
                <label htmlFor="age_cat">5-6 Դասարանները</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="age_cat"
                  value="7-8 դասարան"
                  onChange={handleClassChange}
                  checked={infoForm.age_cat === "7-8 դասարան"}
                />
                <label htmlFor="age_cat">7-8 Դասարանները</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="age_cat"
                  value="Ունենք երկու տարիքային խմբերի 2 թիմ (5-6 և 7-8 դասարաններ):"
                  onChange={handleClassChange}
                  checked={
                    infoForm.age_cat ===
                    "Ունենք երկու տարիքային խմբերի 2 թիմ (5-6 և 7-8 դասարաններ):"
                  }
                />
                <label htmlFor="age_cat">
                  Ունենք երկու տարիքային խմբերի 2 թիմ (5-6 և 7-8 դասարաններ):
                </label>
              </div>
            </div>
            <p className="errorMessge">{errorMessage.age_cat}</p>
          </div>

          <div className="formItem m-top">
            <label htmlFor="age_cat" className="formItemLabel1">
              Ո՞ր Նախագծին եք նախատեսում մասնակցել:
            </label>
            <span className="programSpan"> Կարող եք ընտրել միայն 2 ծրագիր</span>
            <div className="formScoolBlock">
              <div>
                <input
                  type="checkbox"
                  name="project_cat1"
                  value="Խաղ «Առողջ ապրելակերպ խաղային ձևով» թեմայով"
                  disabled={programsDisable.project_cat1Disable}
                  onChange={(e) => handleProgramChange(e)}
                  checked={programsChecked.project_cat1}
                />
                <label htmlFor="project_cat1">
                  Խաղ «Առողջ ապրելակերպ խաղային ձևով» թեմայով
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="project_cat2"
                  value="Բաղադրատոմս «Համեղ և առողջարար. իմ սիրելի առողջարար բաղադրատոմսը» թեմայով"
                  disabled={programsDisable.project_cat2Disable}
                  onChange={(e) => handleProgramChange(e)}
                  checked={programsChecked.project_cat2}
                />
                <label htmlFor="project_cat2">
                  Բաղադրատոմս «Համեղ և առողջարար. իմ սիրելի առողջարար
                  բաղադրատոմսը» թեմայով
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="project_cat3"
                  value="Հետազոտություն «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր հետազոտությունները» թեմայով"
                  disabled={programsDisableSecond.project_cat3Disable}
                  onChange={(e) => handleProgramChange(e)}
                  checked={programsChecked.project_cat3}
                />
                <label htmlFor="project_cat3">
                  Հետազոտություն «Բացահայտելով առողջ ապրելակերպի աշխարհը. մեր
                  հետազոտությունները» թեմայով
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="project_cat4"
                  value="«Իմ առողջ համայնքը» սոցիալական նախագիծ"
                  disabled={programsDisableSecond.project_cat4Disable}
                  onChange={(e) => handleProgramChange(e)}
                  checked={programsChecked.project_cat4}
                />
                <label htmlFor="project_cat4">
                  «Իմ առողջ համայնքը» սոցիալական նախագիծ
                </label>
              </div>
            </div>
            <p className="errorMessge">{errorMessage.program}</p>
          </div>
          <div className="formBtnBlock">
            <button type="submit" className="btn-form">
              Ուղարկել
            </button>
            <input
              type="submit"
              onClick={handleClear}
              value="Մաքրել դաշտերը"
              className="bnt-clear-form"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
