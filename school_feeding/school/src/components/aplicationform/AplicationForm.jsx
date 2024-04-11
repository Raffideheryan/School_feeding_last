// import React, { useState } from "react";
// import ".././FormsApplication/formStyle.css";
// import imageMain from "../../assets/imageApplicationForm.png";
// import { useNavigate } from "react-router-dom";
// import { CountDown } from "./../countdown/CountDown";
// import { toast } from "react-toastify";

// export default function AplicationForm() {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState({});
//   const [infoForm, setInfoForm] = useState({
//     region: "",
//     town: "",
//     school_name: "",
//     contact_person: "",
//     email: "",
//     phone: "",
//   });

//   const [errorregion, setErrorregion] = useState(false);
//   const [errortown, setErrortown] = useState(false);
//   const [errorphone, setErrorphone] = useState(false);
//   const [errorcontact_person, setErrorcontact_person] = useState(false);
//   const [errorschool_name, setErrorschool_name] = useState(false);
//   const [erroremail, setErroremail] = useState(false);

//   const validete = (values) => {
//     let errors = true;
//     const regExpMail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
//     const regExpText = /^[\u0531-\u0556\u0561-\u0587\s]+$/u;
//     const regExpNameUsername =
//       /^(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-ֆ'-]+)(?:\s(?:[\u0531-\u0556\u0561-\u0586]+|[Ա-Ֆ][ա-զ'-]+))*$/u;
//     const regExpPhone =
//       /^(091|097|096|099|043|077|093|094|098|049|055|095|041|033|044)\d{6}$/;
//     const regExpschool_name = /^[a-zA-Z0-9\s\-'\u0531-\u058F]+$/u;

//     // Validation region
//     if (!values.region) {
//       toast.warning(" Մարզ դաշտը պարտադիր է․․․ ");
//       errors = false;
//       setErrorregion(true);
//     } else {
//       setErrorregion(false);
//     }
//     //

//     // Validation town or city vailidation
//     if (!values.town) {
//       toast.warning("Քաղաք/Գյուղ դաշտը պարտադիր է․․․ ");
//       errors = false;
//       setErrortown(true);
//     } else if (!regExpText.test(values.town)) {
//       toast.warning(" Քաղաք/Գյուղ Դաշտը պետք է լինի հայատառ․․․ ");
//       errors = false;
//       setErrortown(true);
//     } else {
//       setErrortown(false);
//     }

//     // Validation scool name
//     if (!values.school_name) {
//       toast.warning(" Դպրոց դաշտը պարտադիր է");
//       errors = false;
//       setErrorschool_name(true);
//     } else if (!regExpschool_name.test(values.school_name)) {
//       toast.warning(" Դպրոց դաշտը պետք է լինի հայատառ․․․ ");
//       errors = false;
//       setErrorschool_name(true);
//     } else {
//       setErrorschool_name(false);
//     }
//     //

//     // Validation Adult Contact Person person
//     if (!values.contact_person) {
//       toast.warning(" Մեծահասակի կոնտակտային տվյալներ դաշտը պարտադիր է․․․ ");
//       errors = false;
//       setErrorcontact_person(true);
//     } else if (!regExpNameUsername.test(values.contact_person)) {
//       toast.warning(
//         " Մեծահասակի կոնտակտային տվյալներ դաշտը պետք է լինի հայատառ․․․ "
//       );
//       errors = false;
//       setErrorcontact_person(true);
//     } else {
//       setErrorcontact_person(false);
//     }

//     // Validation email
//     if (!values.email) {
//       toast.warning(" Էլեկտրոնային Հասցե դաշտը պարտադիր է․․․");
//       errors = false;
//       setErroremail(true);
//     } else if (!regExpMail.test(values.email)) {
//       toast.warning("Էլեկտրոնային հասցեն սխալ է․․․ ");
//       setErroremail(true);
//       errors = false;
//     } else {
//       setErroremail(false);
//     }

//     // Validation Phone
//     if (!values.phone) {
//       toast.warning(" Հեռախոսահամար դաշտը պարտադիր է․․․ ");
//       errors = false;
//       setErrorphone(true);
//     } else if (!regExpPhone.test(infoForm.phone)) {
//       toast.warning(
//         " Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094555555"
//       );
//       errors = false;
//       setErrorphone(true);
//     } else {
//       setErrorphone(false);
//     }

//     return errors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setInfoForm((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmitAl = (e) => {
//     e.preventDefault();
//     if (validete(infoForm)) {
//       fetch("http://127.0.0.1:8000/info/registrations/", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(infoForm),
//       })
//         .then((res) => {
//           if (res.ok) {
//             toast.success("Հաջողվեց");
//             navigate("/");
//           } else if (res.status === 400) {
//             toast.warning("Այս Էլ-հասցեն գոյություն ունի համակարգում․․․");
//             setErroremail(true);
//           }
//         })
//         .catch((err) => {
//           toast.warning("Չհաջողվեց");
//         });
//     }
//   };

//   const clearErrors = (e) => {
//     if (e) {
//       e.preventDefault();
//     }
//     setErrorMessage({});
//   };

//   const handleClear = (e) => {
//     e.preventDefault();

//     // Reset other form fields as needed
//     handleChange({ target: { name: "region", value: "" } });
//     handleChange({ target: { name: "town", value: "" } });
//     handleChange({ target: { name: "school_name", value: "" } });
//     handleChange({ target: { name: "contact_person", value: "" } });
//     handleChange({ target: { name: "email", value: "" } });
//     handleChange({ target: { name: "phone", value: "" } });

//     // Clear error messages by calling clearErrors function
//     clearErrors();
//   };

//   return (
//     <div className="formContainer">
//       <div className="formContainerImage">
//         <img src={imageMain} alt="image" />
//       </div>
//       <div className="scedule">
//         <CountDown />
//       </div>
//       <div className="time-block"></div>
//       <div className="formBlock">
//         <form action="" onSubmit={handleSubmitAl}>
//           <h2 className="formTitle">Գրանցման Դաշտ</h2>
//           <div className="formItem">
//             <label htmlFor="region" className="formItemLabel1">
//               Մարզ*
//             </label>
//             <div className="select-wrapper">
//               <select
//                 name="region"
//                 onChange={handleChange}
//                 value={infoForm.region}
//                 className={errorregion ? "error" : ""}
//               >
//                 <option value="">Ընտրել</option>
//                 <option value="Արագածոտն">Արագածոտն</option>
//                 <option value="Արմավիր">Արմավիր</option>
//                 <option value="Արարատ">Արարատ</option>
//                 <option value="Գեղարքունիք">Գեղարքունիք</option>
//                 <option value="Կոտայք">Կոտայք</option>
//                 <option value="Լոռի">Լոռի</option>
//                 <option value="Շիրակ">Շիրակ</option>
//                 <option value="Սյունիք">Սյունիք</option>
//                 <option value="Տավուշ">Տավուշ</option>
//                 <option value="Վայոց Ձոր"> Վայոց Ձոր</option>
//                 <option value="Երևան">Երևան </option>
//               </select>
//             </div>
//           </div>
//           <div className="formItem m-top">
//             <label htmlFor="town" className="m-bottom formItemLabel1">
//               Քաղաք/Գյուղ*
//             </label>
//             <input
//               type="text"
//               placeholder="Մուտքագրեք Ձեր Քաղաքը/Գյուղը"
//               name="town"
//               className={`formItemInput1 ${errortown ? "error" : ""}`}
//               value={infoForm.town}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="formItem m-top">
//             <label htmlFor="school_name" className="m-bottom formItemLabel1">
//               Դպրոցի Անուն*
//             </label>
//             <input
//               type="text"
//               placeholder="Մուտքագրեք Ձեր Դպրոցի Անունը"
//               name="school_name"
//               className={`formItemInput1 ${errorschool_name ? "error" : ""}`}
//               value={infoForm.school_name}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="formItem m-top">
//             <label htmlFor="contact_person" className="m-bottom formItemLabel1">
//               <span>
//                 Մեծահասակի կոնտակտային տվյալները (ուսուցիչ, դպրոցի ծրագրի
//                 համակարգող) (անուն, ազգանուն)*
//               </span>
//             </label>
//             <input
//               type="text"
//               placeholder="Մուտքագրեք Ձեր Անուն Ազգանունը"
//               name="contact_person"
//               className={`formItemInput1 ${errorcontact_person ? "error" : ""}`}
//               value={infoForm.contact_person}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="formItem m-top">
//             <label htmlFor="email" className="m-bottom formItemLabel1">
//               Էլեկտրոնային Հասցե*
//             </label>
//             <input
//               type="text"
//               placeholder="Մուտքագրեք Ձեր Էլեկտրոնային Հասցեն"
//               name="email"
//               className={`formItemInput1 ${erroremail ? "error" : ""}`}
//               value={infoForm.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="formItem m-top">
//             <label htmlFor="phone" className="m-bottom formItemLabel1">
//               Հեռախոսահամար ձևաչափը:094555555*
//             </label>
//             <input
//               type="text"
//               placeholder="Մուտքագրեք Ձեր Հեռախոսահամարը"
//               name="phone"
//               className={`formItemInput1 ${errorphone ? "error" : ""}`}
//               value={infoForm.phone}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="formBtnBlock">
//             <button type="submit" className="btn-form">
//               Ուղարկել
//             </button>
//             <input
//               type="submit"
//               onClick={handleClear}
//               value="Մաքրել դաշտերը"
//               className="bnt-clear-form"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
