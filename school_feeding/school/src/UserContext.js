import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");
  const [remember, setRememberMe] = useState(false);

  //   errors
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorComfirmPassword, setErrorComfirmPassword] = useState(false);

  const [nameUsers, setNameUsers] = useState(null);

  // modal
  const [modal, setModal] = useState(false);
  const [modalHome, setModalHome] = useState(false);

  // ulpoad files
  const [upload, setUpload] = useState([]);
  const [tastyUpload, setTastyUpload] = useState([]);
  const [communityUpload, setCommunityUpload] = useState([]);
  const [discovering, setDiscoveringUpload] = useState([]);

  //  LogeOut

  const [logeOut, setLogeOut] = useState(true);

  // voting

  const [votingSchool, setVotingSchool] = useState("");

  const navigate = useNavigate();

  const [voteAgain, setVoteAgain] = useState();

  // loginuserid
  const [userId, setUserId] = useState("");

  //  formsApplication ID

  const [formId, setFormId] = useState("");

  // add localstorage user info

  const isValidate = () => {
    let isproccesd = true;
    const passRegex = /^[a-zA-Z0-9]+$/.test(password);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email);

    const phoneRegex =
      /^(091|097|096|099|043|077|093|094|098|055|095|041|033|044)\d{6}$/.test(
        phone
      );

    const usernameRegexArmenianLetter =
      /^[\u0531-\u0556\u0561-\u0587\s]+$/u.test(username);

    //

    if (username === null || username === "" || username.trim() === "") {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պարտադիր է ");
      setErrorName(true);
    } else if (!usernameRegexArmenianLetter && username.trim() !== "") {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պետք է պարունակի միայն հայկական տառեր");
      setErrorName(true);
    } else if (username.trim().length <= 2) {
      isproccesd = false;
      toast.warning(" Անուն դաշտը պետք է լինի ամենաքիչը 3 տառ");
      setErrorName(true);
    } else {
      setErrorName(false);
    }

    if (password === null || password === "") {
      isproccesd = false;
      toast.warning(" Գաղտնաբառ դաշտը պարտադիր է․․․ ");
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (password.trim().length < 5) {
      toast.warning(" Գաղտնաբառը պետք է լինի ամենաքիչը 5 նիշ");
      isproccesd = false;
      setErrorPassword(true);
    } else if (password !== comfirmPassword) {
      isproccesd = false;
      toast.warning(" Գաղտնաբառերը չեն համընկնում");
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      toast.warning(
        " Գաղտնաբառը պետք է լինի Լատինատառ եվ  պարունակի առնվազն մեկ փոքրատառ, մեկ մեծատառ և մեկ թիվ։ Օրինակ` Secret123"
      );
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setErrorComfirmPassword(false);
    }

    if (email === null || email === "") {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն պարտադիր է․․․ ");
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն սխալ է․․․ ");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
    if (phone === null || phone === "") {
      isproccesd = false;
      toast.warning(" Հեռախոսահմար դաշտը պարտադիր է․․․ ");
      setErrorPhone(true);
    } else if (!phoneRegex) {
      isproccesd = false;
      toast.warning(
        " Հեռախոսահամարը պետք է լինի oրինակին համապատասխան: 094555657"
      );
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
    }

    return isproccesd;
  };
  const isValidateLogin = () => {
    const passRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{3,10}$/.test(password);
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
    let isproccesd = true;
    if (password === null || password === "") {
      isproccesd = false;
      toast.warning(" Գաղտնաբա դաշտը պարտադիր է․․․ ");
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      toast.warning(
        " Գաղտնաբառը պետք է լինի Լատինատառ եվ  պարունակի առնվազն մեկ փոքրատառ, մեկ մեծատառ և մեկ թիվ։ Օրինակ` Secret123"
      );
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }

    if (email === null || email === "") {
      isproccesd = false;
      toast.warning("Էլեկտրոնային հասցեն պարտադիր է․․․ ");
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն սխալ է․․․ ");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    return isproccesd;
  };

  const isValidateForgetPass = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    let isproccesd = true;

    if (email === null || email === "") {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն պարտադիր է․․․ ");
      setErrorEmail(true);
    } else if (!emailRegex) {
      isproccesd = false;
      toast.warning(" Էլեկտրոնային հասցեն սխալ է․․․ ");
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }

    return isproccesd;
  };

  const isValidatePasswords = () => {
    let isproccesd = true;
    const passRegex = /^(?=.*[A-Za-z0-9])[A-Za-z0-9]{3,10}$/.test(password);

    if (password === null || password === "") {
      isproccesd = false;
      toast.warning(" Գաղտնաբառ դաշտը պարտադիր է․․․ ");
      setErrorPassword(true);
      setErrorComfirmPassword(true);
    } else if (password !== comfirmPassword) {
      isproccesd = false;
      toast.warning(" Գաղտնաբառերը չեն համընկնում");
      setErrorComfirmPassword(true);
    } else if (!passRegex) {
      isproccesd = false;
      toast.warning(
        " Գաղտնաբառը պետք է լինի Լատինատառ եվ  պարունակի առնվազն մեկ փոքրատառ, մեկ մեծատառ և մեկ թիվ։ Օրինակ` Secret123"
      );
      setErrorPassword(true);
    } else if (password.trim().length < 5) {
      toast.warning(" Գաղտնաբառը պետք է լինի ամենաքիչը 5 նիշ");
      isproccesd = false;
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
      setErrorComfirmPassword(false);
    }

    return isproccesd;
  };

  const handleSubmit = async (e) => {
    debugger
    e.preventDefault();
    let obj = {
      username,
      password,
      comfirmPassword,
      email,
      phone,
    };

    if (isValidate()) {
      try {
        const response = await fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/users/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        });

        if (response.ok) {
          toast.success(
            "Մուտք գործեք էլեկտրոնային հասցեն եվ անցեք վերիֆիկացում"
          );
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.setItem("name", JSON.stringify(username));

          setEmail("");
          setPassword("");
          setComfirmPassword("");
          setName("");
          setPhone("");
          navigate("/");
        } else if (response.status === 400) {
          toast.warning(
            "Այս Էլեկտրոնային հասցեն գոյություն ունի համակարգում․․․"
          );
          setErrorEmail(true);
        }
      } catch (error) {
        toast.warning("Չհաջողվեց");
      }
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    let obj = {
      email,
      password,
    };
    if (isValidateLogin()) {
      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/info/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          const data = res.json();
          if (res.ok) {
            setLogeOut(false);
            toast.success("Հաջողվեց");
            navigate("/");
            setEmail("");
            setPassword("");
            if (e.target[2].checked) {
              localStorage.setItem("email", JSON.stringify(email));
              localStorage.setItem("password", JSON.stringify(password));
            } else {
              localStorage.setItem("email", JSON.stringify(email));
            }
            return data;
          } else if (res.status === 401) {
            toast.warning(
              "Խնդրում ենք անցեք Էլեկտրոնային հասցեի վերիֆիկացում Կամ ստուգեք մուտքագրված տվյալների ճշտությունը"
            );
            setEmail("");
            setPassword("");
          } else if (res.status === 404) {
            toast.warning(" Տվյալները սխալ են․․․ ");
            setErrorPassword(true);
            setErrorEmail(true);
            setEmail("");
            setPassword("");
          }
        })
        .then((data) => {
          setUserId(data.user_id);
          localStorage.setItem("userId", JSON.stringify(data.user_id));
        })
        .catch((err) => {
          // toast.warning("Չհաջողվեց");
        });
    }
  };

  useEffect(() => {
    const storedPassword = localStorage.getItem("password");
    const storedEmail = localStorage.getItem("email");

    if (storedEmail && storedPassword) {
      setEmail(JSON.parse(storedEmail));
      setPassword(JSON.parse(storedPassword));
      setRememberMe(true);
      setLogeOut(false);
    } else if (storedEmail) {
      setLogeOut(false);
    } else if (!storedEmail) {
      setLogeOut(true);
    }
  }, []);

  const handleSubmitForgetPass = (e) => {
    e.preventDefault();
    let obj = {
      email,
    };

    if (isValidateForgetPass()) {
      fetch("https://aroxj_aprelakerpi_despan.schoolfeeding.am/api/forget_password/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Ստուգեք Ձեր Էլեկտրոնային Հասցեն");
            localStorage.setItem("resetemail", JSON.stringify(email));

            setEmail("");
          } else if (res.status === 400) {
            toast.warning("Գրեք համակարգում արդեն գրանցված Էլեկտրոնային հասցե");
          } else if (res.status === 401) {
            toast.warning("Խնդրում ենք անցեք Էլեկտրոնային հասցեի վերիֆիկացում");
          }
        })
        .catch((err) => {
          toast.warning("Չհաջողվեց");
        });
    }
  };

  const handleSubmitPasswords = (e) => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    e.preventDefault();

    const url = new URL(window.location.href);

    const uid = url.searchParams.get("uidb64");
    const token = url.searchParams.get("token");

    let obj = {
      password,
    };

    if (isValidatePasswords()) {
      fetch(`https://aroxj_aprelakerpi_despan.schoolfeeding.am/api/new_password/${uid}/${token}/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Մուտք Գործեք Համակարգ օգտագործելով նոր Գաղտնաբառը");
            navigate("/login");
            setPassword("");
          }
        })
        .catch((err) => {
          toast.warning("Չհաջողվեց");
        });
    }
  };

  // Modal func

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const togleModalHome = () => {
    setModalHome(!modal);
  };

  return (
    <UserContext.Provider
      value={{
        userState: {
          username,
          email,
          phone,
          password,
          comfirmPassword,
          errorName,
          errorEmail,
          errorPassword,
          errorComfirmPassword,
          errorPhone,
          nameUsers,
          modal,
          upload,
          tastyUpload,
          discovering,
          modalHome,
          voteAgain,
          remember,
          communityUpload,
          logeOut,
          votingSchool,
          userId,
          formId,
        },
        userActions: {
          setName,
          setEmail,
          setPhone,
          setPassword,
          setComfirmPassword,
          handleSubmit,
          handleSubmitLogin,
          handleSubmitForgetPass,
          handleSubmitPasswords,
          setNameUsers,
          setModal,
          toggleModal,
          setUpload,
          setTastyUpload,
          setCommunityUpload,
          setDiscoveringUpload,
          togleModalHome,
          setVoteAgain,
          setRememberMe,
          setLogeOut,
          setVotingSchool,
          setUserId,
          setFormId,
          setErrorPassword,
          setErrorEmail,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
